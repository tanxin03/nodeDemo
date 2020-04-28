const mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'tanxin',
    password : 'tanxin',
    database : 'students_lists'
});
connection.connect((err)=>{
    if(err){
        console.log(`mysql连接失败: ${err}!`);
    }else{
        console.log("mysql连接成功!");
    }
})
connection.on('error', function(err) {
    console.log(err.message);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('db error 执行重连:'+err.message);
    } else {
        throw err;
    }
});
const db = {
    insert(sql, parm, callback){
        connection.query(sql, parm, function (error, results, fields) {
            callback(error,results)
        })
    },
    query(sql,callback){
        connection.query(sql, function (error, results) {
            callback(error,results)
        })
    }
}
module.exports = db