const router = require('koa-router')()
const { verifyToken } = require("../auth");

//引入控制器
let controller = require("../controllers/userController");

router.prefix('/users')

router.post("/login", controller.login);

router.post("/regist", controller.regist);

router.get("/checkUser",controller.checkUser);

router.get("/list",controller.getUserList);

module.exports = router
