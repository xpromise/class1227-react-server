/*
  所有服务器和数据库的配置
 */
const isDev = process.env.NODE_ENV === "development";

// mongodb的配置
const MONGO_CONFIG = {
  port: 27017,
  host: "localhost",
  database: "react_admin",
};
// 服务器配置
let SERVER_CONFIG = {
  port: 80,
  host: "0.0.0.0",
};

if (isDev) {
  SERVER_CONFIG = {
    port: 5000,
    host: "localhost",
  };
}

const SECRET = "Zrrf2mvs^sD@xquG";

const SAFE_PATHS = ["/admin/acl/index/login"];

module.exports = {
  MONGO_CONFIG,
  SERVER_CONFIG,
  SECRET,
  SAFE_PATHS,
};
