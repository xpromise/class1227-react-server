/**
 * @description 路由器中间件 - 封装登录/注册路由
 */
const express = require("express");
const axios = require("axios");
const { SuccessModal, ErrorModal } = require("../model");
const { CLIENT_ID, CLIENT_SECRET } = require("../config");
const { sign, verify } = require("../utils/jwt");

const Users = require("../db/models/acl/users");

const Router = express.Router;
const router = new Router();

/*
 * @api {get} /oauth/redirect github oauth 登陆
 * @apiDescription github oauth 登陆
 * @apiName oauth
 * @apiGroup oauth: github oauth 登陆
 * @apiParam {String} code 授权码
 * @apiSuccess {Object} data
 * @apiSampleRequest http://47.103.203.152/oauth/redirect
 * @apiVersion 1.0.0
 */
router.get("/oauth/redirect", async (req, res) => {
	try {
		// 获取到了授权码 code
		const { code } = req.query;
		// 接着去请求令牌 token
		const tokenResponse = await axios({
			method: "post",
			url: `https://github.com/login/oauth/access_token`,
			data: {
				client_id: CLIENT_ID, // 固定不变
				client_secret: CLIENT_SECRET, // 固定不变，只在服务器保存，安全性更高
				code, // 上一步返回的code
			},
			headers: {
				accept: "application/json",
			},
		});
		// 得到用户token（类似于我们得到了用户登陆github的token了）
		const accessToken = tokenResponse.data.access_token;
		console.log(accessToken); // 1928a75941bbdae194d4935d2f1be893cf37a31c

		// 有了token，就有了访问用户信息权限的token
		// 根据token请求用户数据
		const { data } = await axios({
			method: "get",
			url: "https://api.github.com/user",
			headers: {
				accept: "application/json",
				Authorization: `token ${accessToken}`,
			},
		});

		const user = await Users.findOne({ username: data.login });

		let token;

		if (!user) {
			token = await sign({ id: data.id });

			await Users.create({
				username: data.login,
				avatar: data.avatar_url,
				nickName: data.name,
				password: data.node_id,
				token: token,
				roleId: "5e7c6d21b3071d0e44c8b231", // 假设都是管理员用户～
			});
		} else {
			console.log(user);

			try {
				token = user.token;
				await verify(user.token);
			} catch {
				token = await sign({ id: user.id });
				user.token = token;
				await user.save();
			}
		}

		// 将得到的用户数据返回到页面上~
		res.redirect(`http://localhost:3000/oauth?token=${token}`);
	} catch (e) {
		console.log(e);
	}
});

module.exports = router;
