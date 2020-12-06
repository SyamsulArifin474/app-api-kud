var connection = require("../koneksi");
var mysql = require("mysql");
var response = require("../res");
var jwt = require("jsonwebtoken");
var config = require("../config/secret");
var ip = require("ip");
const {
  v4: uuidv4
} = require("uuid");
var uuid = uuidv4();
const bcrypt = require("bcrypt");
const {
  query
} = require("../koneksi");
const saltRounds = 10;

//controler untuk register
exports.registrasi = function (req, res) {
  var post = {
    nama_users: req.body.nama_users,
    username: req.body.username,
    password: req.body.password,
    jabatan: req.body.jabatan,
    status: req.body.status,
    log: req.body.log,
  };

  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      throw err;
    } else {
      bcrypt.hash(post.password, saltRounds, function (err, hash) {
        if (err) {
          throw err;
        } else {
          console.log("Hash dari Password ", post.password, hash);
          var query = "select nama_users from ?? where ??=?";
          var table = ["users", "nama_users", post.nama_users];
          query = mysql.format(query, table);
          connection.query(query, function (err, rows) {
            if (err) {
              console.log(err);
            } else {
              if (rows.length == 0) {
                connection.query(
                  "insert into users (uuid, nama_users, username, password, jabatan, status, log) values( ? , ? , ? , ? , ? , ?, ? )",
                  [
                    uuid,
                    post.nama_users,
                    post.username,
                    hash,
                    post.jabatan,
                    post.status,
                    post.log,
                  ],
                  function (error, rows) {
                    if (error) {
                      console.log(error);
                    } else {
                      response.ok("Berhasil Menambahkan data users ", res);
                    }
                  }
                );
              } else {
                response.ok("Users Sudah terdaftar", res);
              }
            }
          });
        }
      });
    }
  });
};

//membuat controler untuk login
exports.login = function (req, res) {
  var post = {
    username: req.body.username,
    password: req.body.password,
  };
  var query = "select * from ?? where ??=?";
  var table = ["users", "username", post.username];
  query = mysql.format(query, table);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 1) {
        var token = jwt.sign({
            rows,
          },
          config.secret, {
            expiresIn: 1440,
          }
        );
        uuid_users = rows[0].uuid;
        cekpassword = rows[0].password;
        jabatan = rows[0].jabatan;
        var data = {
          users: uuid_users,
          akses_token: token,
          ip_addres: ip.address(),
        };
        bcrypt.compare(post.password, cekpassword, function (err, isMatch) {
          if (err) {
            throw err;
          } else if (!isMatch) {
            res.json({
              error: true,
              Message: "Password salah!",
            });
            console.log("Password Tidak Cocok!");
            console.log("Password 1 = ", post.password);
            console.log("Password 2 = ", cekpassword);
          } else {
            console.log("Password Cocok!");
            var query = "insert into ?? set ?";
            var table = ["akses_token"];
            query = mysql.format(query, table);
            connection.query(query, data, function (error) {
              if (error) {
                console.log(error);
              } else {
                res.json({
                  success: true,
                  message: "Token JWT tergenerate",
                  token: token,
                  currusers: jabatan,
                });
              }
            });
          }
        });
      } else {
        res.json({
          error: true,
          Message: "Username salah!",
        });
        console.log("Username salah");
      }
    }
  });
};

exports.halamanSysAdmin = function (req, res) {
  response.ok("Halaman ini hanya bisa diakses oleh SysAdmin", res)
}