var mysql = require('mysql');

//membuat koneksi database
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'react_kud'
});

conn.connect((err) => {
    if (err) throw err;
    console.log('MySql Terkoneksi');
});

module.exports = conn;