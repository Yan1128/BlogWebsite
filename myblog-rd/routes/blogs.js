const router = require('koa-router')()
const { verifyToken } = require("../auth");

//引入控制器
let controller = require("../controllers/blogController");
router.prefix('/blogs')

router.get("/list",controller.welcome);

router.get("/checkBlogList",controller.checkBlogList);

router.get("/myBlogList",verifyToken,controller.myBlogList);

router.get("/detail",controller.getBlogDetail);

router.post("/postBlog",controller.postBlog);

router.post("/postComment",controller.postComment);

router.get("/changelist",controller.changelist);

router.get("/regainList",controller.regainList);

router.get("/regain",controller.regain);

module.exports = router
