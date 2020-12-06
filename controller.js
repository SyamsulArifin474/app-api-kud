"use strict";

var response = require("./res");
var connection = require("./koneksi");
const {
  v4: uuidv4
} = require("uuid");
var uuid = uuidv4();
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.index = function (req, res) {
  response.ok("REST API Berjalan dengan baik", res);
};

//menambahkan data person
exports.tambahperson = function (req, res) {
  var kewarganegaraan = req.body.kewarganegaraan;
  var nomor_passport = req.body.nomor_passport;
  var nomor_kk = req.body.nomor_kk;
  var nomor_nik = req.body.nomor_nik;
  var nama_lengkap = req.body.nama_lengkap;
  var jenis_kelamin = req.body.jenis_kelamin;
  var tempat_lahir = req.body.tempat_lahir;
  var tanggal_lahir = req.body.tanggal_lahir;
  var setatus_perkawinan = req.body.setatus_perkawinan;
  var pendidikan_terakhir = req.body.pendidikan_terakhir;
  var nama_pnd_terakhir = req.body.nama_pnd_terakhir;
  var email = req.body.email;
  var no_hp1 = req.body.no_hp1;
  var no_hp2 = req.body.no_hp2;
  var negara = req.body.negara;
  var provinsi = req.body.provinsi;
  var kabupaten = req.body.kabupaten;
  var kecamatan = req.body.kecamatan;
  var jalan = req.body.jalan;
  var kode_pos = req.body.kode_pos;
  var wafat = req.body.wafat;
  var berkas = req.body.berkas;
  connection.query(
    "insert into person (uuid, kewarganegaraan, nomor_passport, nomor_kk, nik, nama_lengkap, jenis_kelamin, tempat_lahir, tanggal_lahir, status_perkawinan, pendidikan_terakhir, nama_pnd_terakhir, email, no_hp1, no_hp2, negara, provinsi, kabupaten, kecamatan, jalan, kode_pos, wafat, berkas) values( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )",
    [uuid, kewarganegaraan, nomor_passport, nomor_kk, nomor_nik, nama_lengkap, jenis_kelamin, tempat_lahir, tanggal_lahir, setatus_perkawinan, pendidikan_terakhir, nama_pnd_terakhir, email, no_hp1, no_hp2, negara, provinsi, kabupaten, kecamatan, jalan, kode_pos, wafat, berkas],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Menambah data person", res);
      }
    }
  );
};

//menampilkan semua data users
exports.tampilsemuadata = function (req, res) {
  connection.query("select * from users", function (error, rows, fileds) {
    if (error) {
      connection.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//menampilkan data users berdasarkan uuid
exports.tampilberdasarkanid = function (req, res) {
  let uuid = req.params.uuid;
  connection.query("select * from users where uuid = ?", [uuid], function (
    error,
    rows,
    fields
  ) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//menambahkan data users
exports.tambahdata = function (req, res) {
  var nama = req.body.nama_users;
  var username = req.body.username;
  var password = req.body.password;
  var jabatan = req.body.jabatan;
  var status = req.body.status;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    connection.query(
      "insert into users (uuid, nama_users, username, password, jabatan, status) values( ? , ? , ? , ? , ? , ? )",
      [uuid, nama, username, hash, jabatan, status],
      function (error, rows, fields) {
        if (error) {
          console.log(error);
        } else {
          response.ok("Berhasil Menambah data", res);
        }
      }
    );
  });
};

// mengubah data berdasarkan uuid
exports.ubahdata = function (req, res) {
  var uuid = req.body.uuid;
  var nama = req.body.nama_users;
  var username = req.body.username;
  var password = req.body.password;
  var jabatan = req.body.jabatan;
  var status = req.body.status;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    connection.query(
      "update users set nama_users=?, username=?, password=?, jabatan=?, status=? where uuid = ? ",
      [nama, username, hash, jabatan, status, uuid],
      function (error, rows, fields) {
        if (error) {
          console.log(error);
        } else {
          response.ok("Berhasil Ubah Data", res);
        }
      }
    );
  });
};

//menghapus data berdasarkan uuid
exports.hapusdata = function (req, res) {
  var uuid = req.body.uuid;

  connection.query("delete from users where uuid=?", [uuid], function (
    error,
    rows,
    fields
  ) {
    if (error) {
      console.log(error);
    } else {
      response.ok("Berhasil Menghapus Data", res);
    }
  });
};