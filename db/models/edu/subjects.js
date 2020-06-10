const mongoose = require("mongoose");

const subjects = new mongoose.Schema({
	// 名称
	title: {
		type: String,
		unique: true,
		required: true,
	},
	// 父级分类id
	parentId: {
		type: String,
		required: true,
	},
	// 创建时间
	gmtCreate: {
		type: Date,
		default: "",
	},
	// 修改时间
	gmtModified: {
		type: Date,
		default: "",
	},
});

// 一定是普通函数！
subjects.pre("save", function (next) {
	const date = new Date().toDateString();

	if (this.isNew) {
		this.gmtCreate = date;
	}

	this.gmtModified = date;

	next();
});

module.exports = mongoose.model("subjects", subjects);
