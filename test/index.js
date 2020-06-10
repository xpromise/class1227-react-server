const { execSync } = require("child_process");
const path = require("path");
// 删库
execSync('mongo react_admin --eval "db.dropDatabase()"');

function resolve(relative) {
  return path.resolve(__dirname, "dbs", "react_admin." + relative);
}
// 导入基本数据
execSync(
  `mongoimport --db react_admin --collection permissions --type json --file ${resolve(
    "permissions.json"
  )}`
);
execSync(
  `mongoimport --db react_admin --collection roles --type json --file ${resolve(
    "roles.json"
  )}`
);
execSync(
  `mongoimport --db react_admin --collection users --type json --file ${resolve(
    "users.json"
  )}`
);
