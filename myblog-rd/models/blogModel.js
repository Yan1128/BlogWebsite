const db=require("../models/db")
module.exports={
    getBlogs(){
        let sql = "select * from t_blog  where t_blog.is_delete=0 order by post_time desc";
        return db.query(sql);
    },
    getTheBlogsByTitle(title){
        return db.query("SELECT * FROM t_blog where title like '%" + title + "%' and is_delete=0 order by post_time desc"); 

    },
    getMyBlogsById(userId){
        return db.query(`select * from t_blog where user_id=?  order by post_time desc`,[userId]);
    },
    getBlogById(blogId){
        return db.query(`
        SELECT blog.*, comm.comm_id, comm.content as comm_content, comm.post_time as comm_post_time, usr.username
        FROM t_blog blog  LEFT JOIN t_comment comm 
        ON comm.blog_id=blog.blog_id 
        LEFT JOIN t_user usr ON comm.user_id=usr.user_id
        WHERE blog.blog_id=? order by comm.post_time desc`, [blogId]);
    },
    saveBlogs(blog){
        let sql = "insert into t_blog set ?";
        let values = blog;
        return db.query(sql, values);
    },
    saveBlogsComment(blog){
        let sql = "insert into t_comment set ?";
        let values = blog;
        return db.query(sql, values);
    },
    updataBlogListDel(blog_id){
        let sql = "UPDATE t_blog SET is_delete=1 WHERE blog_id=?";
        let values = blog_id;
        return db.query(sql,values);
    },
    getRegainBlogsList(){
        let sql = "select * from t_blog  where t_blog.is_delete=1 order by post_time desc";
        return db.query(sql);
    },
    updataReBlogList(blog_id){
        let sql = "UPDATE t_blog SET is_delete=0 WHERE blog_id=?";
        let values = blog_id;
        return db.query(sql,values);
    },
}