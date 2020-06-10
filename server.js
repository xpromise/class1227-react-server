/**
 * @description 主模块
 */
const express = require("express");
const morgan = require("morgan");
const { createWriteStream } = require("fs");
const { resolve } = require("path");

const { SERVER_CONFIG } = require("./config");

// 引入数据库
require("./db/mongo");

// 引入中间件
const cors = require("./middlleware/cors");
const acl = require("./middlleware/acl");

// 引入路由
const loginRouter = require("./routers/acl/login");
const userRouter = require("./routers/acl/user");
const roleRouter = require("./routers/acl/role");
const permissionRouter = require("./routers/acl/permission");
const teacherRouter = require("./routers/edu/teacher");
const subjectRouter = require("./routers/edu/subject");
const resetRouter = require("./routers/reset");

const app = express();

app.use(express.static(resolve(__dirname, "./public")));

// 记录访问日志
const accessWriteStream = createWriteStream(
  resolve(__dirname, "./logs", "access.log"),
  { flags: "a" }
);
app.use(
  morgan("combined", {
    stream: accessWriteStream,
  })
);

// 记录错误日志
const errorWriteStream = createWriteStream(
  resolve(__dirname, "./logs", "error.log"),
  { flags: "a" }
);

app.use(
  morgan("tiny", {
    stream: errorWriteStream,
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

// 重置数据~
app.use(resetRouter);
// 使用中间件
// app.use(cors);
app.use(acl);

// 内置中间件：用来解析POST请求体参数
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 应用 路由器中间件
app.use("/admin/acl/index", loginRouter);
app.use("/admin/acl/user", userRouter);
app.use("/admin/acl/role", roleRouter);
app.use("/admin/acl/permission", permissionRouter);
app.use("/admin/edu/teacher", teacherRouter);
app.use("/admin/edu/subject", subjectRouter);

app.listen(SERVER_CONFIG.port, SERVER_CONFIG.host, (err) => {
  if (!err)
    console.log(
      `服务器启动成功: http://${SERVER_CONFIG.host}:${SERVER_CONFIG.port}`
    );
  else console.log(err);
});
