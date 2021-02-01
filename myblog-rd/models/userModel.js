const db=require("../models/db")
module.exports={
    getUserByNameAndPwd(username, password){
        let sql = "select * from t_user where username=? and password=?";
        let values = [username, password];
        return db.query(sql, values);
    },
    saveUser(user){
        let sql = "insert into t_user set ?";
        let values = user;
        return db.query(sql, values);
    },
    getUserByUsername(username){
        let sql = "select * from t_user where username=?";
        let values = username;
        return db.query(sql, values);
    },
    getUser(){
        let sql = "select * from t_user order by create_date desc";
        return db.query(sql);
    }
}