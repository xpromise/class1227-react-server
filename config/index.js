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

// 手机号oauth
const PHONE_URL = "http://139.196.108.241:8080/Api/HttpSendSMYzm.ashx";
const ACCOUNT = 17688317990;
const PSWD = "Xiongjian2020";

// github oauth
const CLIENT_ID = "ba6e49e04ddda1b425ed";
const CLIENT_SECRET = "a00d71816a3fdb62af99de658fb9a893426bc95d";

// 七牛云配置
const ACCESS_KEY = "VEXRGMpBfVe2MJGzdRYlxKX1jt3-CqY4fl_Y3SUS";
const SECRET_KEY = "_wD9LklsklhQTOgEmPjHe7-cT0Rr54S_2GeMX82X";
const BUCKET = "class1227";
const EXPIRES = 7200;

const SECRET = "Zrrf2mvs^sD@xquG";

const SAFE_PATHS = ["/admin/acl/index/login"];

module.exports = {
  MONGO_CONFIG,
  SERVER_CONFIG,
  SECRET,
  SAFE_PATHS,

  ACCESS_KEY,
  SECRET_KEY,
  BUCKET,
  EXPIRES,

  CLIENT_ID,
  CLIENT_SECRET,

  PHONE_URL,
  ACCOUNT,
  PSWD,
};
