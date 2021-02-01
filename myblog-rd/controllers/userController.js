const model = require("../models/userModel")
const { createToken } = require('../auth');
const utils = require("../utils/dateTimeUtil")
module.exports = {
    async login(ctx) {
        let { username, password } = ctx.request.body;
        let results = await model.getUserByNameAndPwd(username, password);
        if (results.length > 0) {
            let payload = {
                userId: Math.random(),
                username,
            };
            var token = createToken(payload);
            ctx.body = {
                state: "success",
                token,
                user: results[0]
            }
        } else {
            ctx.body = 'fail';
        }
    },
    async regist(ctx) {
        let { username, password, nickname } = ctx.request.body;
        if (username.trim().length == 0 || password.trim().length == 0 || nickname.trim().length == 0) { //去掉空格
            ctx.body = {
                state: "fail",
            }
        }
        else {
            let results = await model.saveUser({ username, password, nickname });
            if (results.insertId) {
                ctx.body = {
                    state: "success",
                }
            } else {
                ctx.body = {
                    state: "fail",
                }
            }
        }

    },
    async checkUser(ctx) {
        let { username } = ctx.query;
        let results = await model.getUserByUsername(username);
        //console.log(results);
        if (results.length > 0) {
            ctx.body = {
                state: "fail",
            }
        } else {
            ctx.body = {
                state: "success",
            }
        }
    },
    async getUserList(ctx) {
        let results = await model.getUser();
        for (let i = 0; i < results.length; i++) {
            results[i].create_date = await utils.formatTime(results[i].create_date);
        }
        ctx.body = {
            state: "success",
            results
        };

    },
};