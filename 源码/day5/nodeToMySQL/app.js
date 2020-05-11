var mysql      = require('mysql');

// 创建连接
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'student'
});
// 链接数据库
connection.connect();
// 数据库进行操作

// mysql 查询
connection.query('SELECT * from users', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
});

// mysql 插入
// connection.query('insert into users values(null,"lidppp2","123123123")', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results);
//     console.log('==================================')
//     console.log("This is fields " + fields)
// });

// mysql 删除
// connection.query('delete from users where id=2', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results);
//     console.log('==================================')
//     console.log("This is fields " + fields)
// });

// mysql 更新
connection.query('update users set username="李大炮",password="23333" where id=3', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    console.log('==================================')
    console.log("This is fields " + fields)
});



// 断开链接
connection.end();