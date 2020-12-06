'use strict';

module.exports = function (app) {
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);

    app.route('/tambahperson')
        .post(jsonku.tambahperson);

    app.route('/tampil')
        .get(jsonku.tampilsemuadata);

    app.route('/tampil/:uuid')
        .get(jsonku.tampilberdasarkanid);

    app.route('/tambah')
        .post(jsonku.tambahdata);

    app.route('/ubah')
        .put(jsonku.ubahdata);

    app.route('/hapus')
        .delete(jsonku.hapusdata);
}