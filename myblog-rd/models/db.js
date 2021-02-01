let mysql = require("mysql");
let {HOST,USER,PASSWORD,DATABASE}=require("../config/db.config");

var pool = mysql.createPool({
    connectionLimit: 10,
    host: HOST,
    user:USER,
    password: PASSWORD,
    database: DATABASE,
});
function query(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query(
                    sql, values, function (error, results) {
                        connection.release();//释放
                        if (error) {
                            reject(error)
                        } else {
                            resolve(results)
                        }
                    }
                );
            }

        });
    })
}

module.exports={
    query:query
}