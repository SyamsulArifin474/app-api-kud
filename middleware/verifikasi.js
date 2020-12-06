const jwt = require("jsonwebtoken");
const config = require("../config/secret");

exports.cekjabatan = function () {
  return function (req, rest, next) {
    var jabatan = req.body.jabatan;
    //cek autorizzation header
    var tokenWithBearer = req.headers.authorization;
    if (tokenWithBearer) {
      var token = tokenWithBearer.split(" ")[1];
      //verifikasi
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          return rest.status(401).send({
            auth: false,
            message: "Token tidak terdaftar!",
          });
        } else {
          if (jabatan == 1) {
            req.auth = decoded;
            next();
          } else {
            return rest.status(401).send({
              auth: false,
              message: "Gagal mengAutorizzation jabatan anda!",
            });
          }
        }
      });
    } else {
      return rest.status(401).send({
        auth: false,
        message: "Token tidak tersedia!",
      });
    }
  };
}
/* function verifikasi() {
  return function (req, rest, next) {
  var jabatan = req.body.jabatan;
    //cek autorizzation header
    var tokenWithBearer = req.headers.authorization;
    if (tokenWithBearer) {
      var token = tokenWithBearer.split(" ")[1];
      //verifikasi
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          return rest.status(401).send({
            auth: false,
            message: "Token tidak terdaftar!",
          });
        } else {
          if (jabatan == 1) {
            req.auth = decoded;
            next();
          } else {
            return rest.status(401).send({
              auth: false,
              message: "Gagal mengAutorizzation jabatan anda!",
            });
          }
        }
      });
    } else {
      return rest.status(401).send({
        auth: false,
        message: "Token tidak tersedia!",
      });
    }
  };
} */