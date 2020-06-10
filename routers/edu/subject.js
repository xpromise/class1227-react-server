/**
 * @description 路由器中间件 - 封装登录/注册路由
 */
const express = require("express");
const Subjects = require("../../db/models/edu/subjects");
const { SuccessModal, ErrorModal } = require("../../model");

const Router = express.Router;
const router = new Router();

const filter = {
	__v: 0,
};

/**
 * @api {post} /admin/edu/subject/save 添加课程分类
 * @apiDescription 添加课程分类
 * @apiName save
 * @apiGroup subject-admin-controller: 课程分类管理
 * @apiHeader {String} token 权限令牌
 * @apiParam {String} title 课程分类名称
 * @apiParam {String} parentId 父级分类id(0代表一级分类)
 * @apiSuccess {Object} data 课程分类数据
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code": 20000,
 *      "success" : true,
 *      "data" : {
 *      },
 *      "message": ""
 *  }
 * @apiSampleRequest http://47.103.203.152/admin/edu/subject/save
 * @apiVersion 1.0.0
 */
router.post("/save", async (req, res) => {
	const body = req.body;

	try {
		const result = await Subjects.create(body);

		// 保存成功
		res.json(new SuccessModal({ data: result }));
	} catch (e) {
		// 保存失败
		res.json(new ErrorModal({ message: "课程分类名称已存在" }));
	}
});

/**
 * @api {put} /admin/edu/subject/update 更新课程分类
 * @apiDescription 更新课程分类
 * @apiName update
 * @apiGroup subject-admin-controller: 课程分类管理
 * @apiHeader {String} token 权限令牌
 * @apiParam {String} id 课程分类id
 * @apiParam {String} title 课程分类名称
 * @apiSuccess {Object} data 课程分类数据
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code": 20000,
 *      "success" : true,
 *      "data" : {
 *      },
 *      "message": ""
 *  }
 * @apiSampleRequest http://47.103.203.152/admin/edu/subject/update
 * @apiVersion 1.0.0
 */
router.put("/update", async (req, res) => {
	const { id, title } = req.body;

	try {
		const result = await Subjects.updateOne(
			{
				_id: id,
			},
			{ $set: { title } }
		);

		// 更新成功
		res.json(new SuccessModal({ data: result }));
	} catch (e) {
		// 更新失败
		res.json(new ErrorModal({ message: "课程分类不存在" }));
	}
});

/**
 * @api {get} /admin/edu/subject/get/:parentId 获取所有二级课程分类数据
 * @apiDescription 获取所有二级课程分类数据
 * @apiName get
 * @apiGroup subject-admin-controller: 课程分类管理
 * @apiHeader {String} token 权限令牌
 * @apiParam {String} parentId 父级分类Id
 * @apiSuccess {Number} total 总数
 * @apiSuccess {Object[]} items 二级课程分类数据
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code": 20000,
 *      "success" : true,
 *      "data" : {
 *        "total": 100,
 *        "items": [{}, {}]
 *      },
 *      "message": ""
 *  }
 * @apiSampleRequest http://47.103.203.152/admin/edu/subject/get/:parentId
 * @apiVersion 1.0.0
 */
router.get("/get/:parentId", async (req, res) => {
	const { parentId } = req.params;

	try {
		const items = await Subjects.find({ parentId }, filter);

		res.json(
			new SuccessModal({
				data: {
					total: items.length,
					items,
				},
			})
		);
	} catch (e) {
		console.log(e);

		res.json(new ErrorModal({ message: e }));
	}
});

/**
 * @api {get} /admin/edu/subject/:page/:limit 获取一级课程分类列表
 * @apiDescription 获取一级课程分类列表
 * @apiName /:page/:limit
 * @apiGroup subject-admin-controller: 课程分类管理
 * @apiHeader {String} token 权限令牌
 * @apiParam {Number} page 当前页码
 * @apiParam {Number} limit 每页数量
 * @apiSuccess {Number} total 总数
 * @apiSuccess {Object[]} items 课程分类分页数据
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code": 20000,
 *      "success" : true,
 *      "data" : {
 *        "total": 100,
 *        "items": [{}, {}]
 *      },
 *      "message": ""
 *  }
 * @apiSampleRequest http://47.103.203.152/admin/edu/subject/:page/:limit
 * @apiVersion 1.0.0
 */
router.get("/:page/:limit", async (req, res) => {
	const { page, limit } = req.params;

	try {
		let skip = 0;
		let limitOptions = {};
		limitOptions = { skip };

		if (limit !== 0) {
			skip = (page - 1) * limit;
			limitOptions.skip = skip;
			limitOptions.limit = +limit;
		}

		const total = await Subjects.countDocuments({ parentId: "0" });
		const items = await Subjects.find({ parentId: "0" }, filter, limitOptions);

		res.json(
			new SuccessModal({
				data: {
					total,
					items,
				},
			})
		);
	} catch (e) {
		console.log(e);

		res.json(new ErrorModal({ message: e }));
	}
});

/**
 * @api {delete} /admin/edu/subject/remove/:id 删除课程分类数据
 * @apiDescription 删除课程分类数据
 * @apiName delete
 * @apiGroup subject-admin-controller: 课程分类管理
 * @apiHeader {String} token 权限令牌
 * @apiParam {String} id 课程分类id
 * @apiSuccess {Object} data
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code": 20000,
 *      "success" : true,
 *      "data" : {
 *      },
 *      "message": ""
 *  }
 * @apiSampleRequest http://47.103.203.152/admin/edu/subject/remove/:id
 * @apiVersion 1.0.0
 */
router.delete("/remove/:id", async (req, res) => {
	const { id } = req.params;

	try {
		await Subjects.deleteOne({ _id: id });

		res.json(
			new SuccessModal({
				data: {},
			})
		);
	} catch (e) {
		res.json(new ErrorModal({ message: e }));
	}
});

module.exports = router;
