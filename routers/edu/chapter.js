/**
 * @description 路由器中间件 - 封装登录/注册路由
 */
const express = require("express");
const Chapters = require("../../db/models/edu/chapters");
const { SuccessModal, ErrorModal } = require("../../model");

const Router = express.Router;
const router = new Router();

const filter = {
	__v: 0,
};

/**
 * @api {post} /admin/edu/chapter/save 新增章节
 * @apiDescription 新增章节
 * @apiName save
 * @apiGroup chapter-admin-controller: 章节管理
 * @apiHeader {String} token 权限令牌
 * @apiParam {String} courceId 课程id
 * @apiParam {String} title 章节名称
 * @apiSuccess {Object} data 章节数据
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code": 20000,
 *      "success" : true,
 *      "data" : {
 *      },
 *      "message": ""
 *  }
 * @apiSampleRequest http://47.103.203.152/admin/edu/chapter/save
 * @apiVersion 1.0.0
 */
router.post("/save", async (req, res) => {
	const { courceId, title } = req.body;

	try {
		const result = await Chapters.create({ courceId, title });

		// 保存成功
		res.json(new SuccessModal({ data: result }));
	} catch (e) {
		// 保存失败
		res.json(new ErrorModal({ message: "网络出错～" }));
	}
});

/**
 * @api {put} /admin/edu/cource/publish 发布课程
 * @apiDescription 发布课程
 * @apiName publish
 * @apiGroup cource-admin-controller: 课程管理
 * @apiHeader {String} token 权限令牌
 * @apiParam {String} courceId 课程id
 * @apiSuccess {Object} data 课程数据
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code": 20000,
 *      "success" : true,
 *      "data" : {
 *      },
 *      "message": ""
 *  }
 * @apiSampleRequest http://47.103.203.152/admin/edu/cource/publish
 * @apiVersion 1.0.0
 */
router.put("/publish", async (req, res) => {
	const { courceId } = req.body;

	try {
		const result = await Cources.updateOne(
			{
				_id: courceId,
			},
			{ $set: { status: 1 } }
		);

		// 更新成功
		res.json(new SuccessModal({ data: result }));
	} catch (e) {
		// 更新失败
		res.json(new ErrorModal({ message: "网络错误～" }));
	}
});

/**
 * @api {put} /admin/edu/cource/update 更新课程
 * @apiDescription 更新课程
 * @apiName update
 * @apiGroup cource-admin-controller: 课程管理
 * @apiHeader {String} token 权限令牌
 * @apiParam {String} courceId 课程id
 * @apiParam {String} teacherId 可选，讲师id
 * @apiParam {String} subjectId 可选，课程分类id
 * @apiParam {String} subjectParentId 可选，父级课程分类id(0代表一级分类)
 * @apiParam {String} title 可选，课程名称
 * @apiParam {String} price 可选，课程价格（0代表免费）
 * @apiParam {String} lessonNum 可选，课程总课时
 * @apiParam {String} description 可选，课程简介
 * @apiParam {String} cover 可选，课程图片
 * @apiSuccess {Object} data 课程数据
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code": 20000,
 *      "success" : true,
 *      "data" : {
 *      },
 *      "message": ""
 *  }
 * @apiSampleRequest http://47.103.203.152/admin/edu/cource/update
 * @apiVersion 1.0.0
 */
router.put("/update", async (req, res) => {
	const { courceId, ...body } = req.body;

	try {
		const result = await Cources.updateOne(
			{
				_id: courceId,
			},
			{ $set: body }
		);

		// 更新成功
		res.json(new SuccessModal({ data: result }));
	} catch (e) {
		// 更新失败
		res.json(new ErrorModal({ message: "网络错误～" }));
	}
});

/**
 * @api {get} /admin/edu/cource/:page/:limit 获取课程分页列表
 * @apiDescription 获取课程分页列表
 * @apiName get
 * @apiGroup cource-admin-controller: 课程管理
 * @apiHeader {String} token 权限令牌
 * @apiParam {String} page 当前页码
 * @apiParam {String} limit 每页数量
 * @apiSuccess {Object} data 课程数据
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code": 20000,
 *      "success" : true,
 *      "data" : {
 *      },
 *      "message": ""
 *  }
 * @apiSampleRequest http://47.103.203.152/admin/edu/cource/:page/:limit
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

		const total = await Cources.countDocuments({});
		const items = await Cources.find({}, filter, limitOptions);

		res.json(
			new SuccessModal({
				data: {
					total,
					items,
				},
			})
		);
	} catch (e) {
		// 更新失败
		res.json(new ErrorModal({ message: "网络错误～" }));
	}
});

/**
 * @api {get} /admin/edu/cource 获取所有课程列表
 * @apiDescription 获取所有课程列表
 * @apiName getall
 * @apiGroup cource-admin-controller: 课程管理
 * @apiHeader {String} token 权限令牌
 * @apiSuccess {Object} data 课程数据
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code": 20000,
 *      "success" : true,
 *      "data" : {
 *      },
 *      "message": ""
 *  }
 * @apiSampleRequest http://47.103.203.152/admin/edu/cource
 * @apiVersion 1.0.0
 */
router.get("/", async (req, res) => {
	try {
		const items = await Cources.find({}, filter);

		res.json(
			new SuccessModal({
				data: items,
			})
		);
	} catch (e) {
		// 更新失败
		res.json(new ErrorModal({ message: "网络错误～" }));
	}
});

module.exports = router;
