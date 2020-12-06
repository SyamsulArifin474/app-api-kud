const express = require('express');
var auth = require('./auth');
var router = express.Router();
var cekjabatan = require('./verifikasi');
//mendaftarkan menu registri
router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);
//halaman yang perlu Autorizzation
router.get('/api/v1/sysadmin', cekjabatan.cekjabatan(), auth.halamanSysAdmin);


module.exports = router;