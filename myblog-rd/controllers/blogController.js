const model = require("../models/blogModel")
const utils = require("../utils/dateTimeUtil")
module.exports = {
  async welcome(ctx) {
    //查询数据库
    let results = await model.getBlogs();
    // console.log(results);
    for (let i = 0; i < results.length; i++) {
      results[i].post_time = await utils.formatTime(results[i].post_time);
    }
    ctx.body = {
      state: "success",
      results
    };
  },
 
  async checkBlogList(ctx) {
    let { title } = ctx.query;
    if (title != '') {
      let results = await model.getTheBlogsByTitle(title);
      if (results.length > 0 && results[0] != '') {
        for (let i = 0; i < results.length; i++) {
          results[i].post_time = await utils.formatTime(results[i].post_time);
        }
        ctx.body = {
          state: "success",
          results,
        };
      } else {
        ctx.body = {
          state: "fail",
        }
      }
    } else {
      ctx.body = {
        state: "fail",
      }
    }
  },
  async myBlogList(ctx) {
    let { userId } = ctx.query;
    let results = await model.getMyBlogsById(userId);
    let { post_time } = results[0];
    let postTime = await utils.formatTime(post_time);
    ctx.body = {
      state: "success",
      results,
      postTime
    };
  },
  async getBlogDetail(ctx) {
    let { blogId } = ctx.query;
    let results = await model.getBlogById(blogId);
    if (results.length > 0) {
      let { blog_id, title, content, post_time } = results[0];
      let blogInfo = {
        blog_id,
        title,
        content,
        post_time,
      };
      let postTime = await utils.formatTime(post_time);
      blogInfo.comments = [];
      for (let i = 0; i < results.length; i++) {
        let obj = results[i];
        if(obj.comm_id!=null){
          let time= await utils.formatTime(obj.comm_post_time);
          blogInfo.comments.push({
            comm_id: obj.comm_id,
            comm_content: obj.comm_content,
            // comm_post_time: obj.comm_post_time,
            comm_post_time: time,
            username: obj.username
          });
        }
      }
      ctx.body = {
        state: "success",
        blog: blogInfo,
        postTime,
      };
    }
  },
  async delComment(ctx) {
    let { blog_id, user_id,comm_id} = ctx.query;
    let results = await model.delCommentById({blog_id, user_id,comm_id});
    console.log(results);
    ctx.body = {
      state: "success",
      results
    };
  },
  async postBlog(ctx) {
    let { title, content, userId } = ctx.request.body;
    let user_id = userId;
    let results = await model.saveBlogs({ title, content, user_id });
    if (results.insertId) {
      ctx.body = {
        state: "success"
      };
    } else {
      ctx.body = {
        state: "fail"
      };
    }
  },
  async postComment(ctx) {
    let { blog_id, content, user_id } = ctx.request.body;
    let results = await model.saveBlogsComment({ blog_id, content, user_id });
    if (results.insertId) {
      ctx.body = {
        state: "success"
      };
    } else {
      ctx.body = {
        state: "fail"
      };
    }
  },
  async changelist(ctx) {
    let { blog_id } = ctx.query;
    let results = await model.updataBlogListDel(blog_id);
    ctx.body = {
      state: "success",
    };
  },
  async changeBlog(ctx) {
    // console.log( ctx.request.body);
    let {blog_id, title, content } = ctx.request.body;
    let results = await model.updataBlog({ blog_id, title, content });
    ctx.body = {
      state: "success",
      results
    };
  },
  async regainList(ctx) {
    let results = await model.getRegainBlogsList();
    for (let i = 0; i < results.length; i++) {
      results[i].post_time = await utils.formatTime(results[i].post_time);
    }
    ctx.body = {
      state: "success",
      results
    };
  },
  async regain(ctx) {
    let { blog_id } = ctx.query;
    let results = await model.updataReBlogList(blog_id);
    ctx.body = {
      state: "success",
    };
  },

}