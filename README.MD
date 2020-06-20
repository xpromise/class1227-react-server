# react-server

## 目录结构

```
├─ config         配置文件
├─ db             数据库
├─ logs           日志文件
├─ middlleware    中间件
├─ model          成功/失败数据模型
├─ public         API文档
├─ routers        路由器
├─ test           测试/重置数据
├─ utils          工具函数
├─ server.js      主文件
├─ .gitignore     git忽略文件
├─ apidoc.json    API文档配置文件
└─ package.json   包描述文件
```

## 环境介绍

- nodejs
- mongodb
- 全局安装包
  - nodemon 开发环境 自动重启
  - apidoc 自动生成 API 文档

## 运行项目指令

- `"start": "cross-env NODE_ENV=development nodemon server.js"`
  - 开发环境，用于启动服务器调试
  - npm start
- `"build": "cross-env NODE_ENV=production nodemon server.js"`
  - 生产环境，用于测试上线服务器
  - npm run build
- `"docs": "apidoc -i routers/ -o public/docs/"`
  - 用于生成 API 文档
- `"reset": "node test/index.js"`
  - 用于重置 mongodb 数据

## 使用步骤

1. 克隆 server 仓库
2. npm i 下载所有依赖包
3. 检查环境是否全部安装好

- nodejs
- mongodb
- 全局安装包
  - nodemon 开发环境 自动重启
  - apidoc 自动生成 API 文档
  - npm i nodemon apidoc -g

4. npm run reset 导入 mongodb 数据
5. npm start 启动服务器

- 默认访问地址: http://localhost:5000
