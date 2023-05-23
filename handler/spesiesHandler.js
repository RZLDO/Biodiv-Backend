const connection = require('../service/databaseConnection');
const path = require('path');
const fs = require('fs');

const getSpesiesData = async (response, h) => {
  try {
    const query = 'SELECT * FROM tb_spesies WHERE verifikasi = ?';
    const queryParams = 'sukses';

    const [data] = await (await connection).execute(query, [queryParams]);
    return h.response({
      error: false,
      message: 'Fetching Data Genus Success',
      data,
    });
  } catch (error) {
    return h
      .response({
        error: true,
        message: 'error fetching data :' + error,
      })
      .code(500);
  }
};

const AddGenusData = async (request, h) => {
  const { nama_latin, nama_umum, ciri_ciri, keterangan, idGenus } = request.payload;
  console.log(nama_latin, nama_umum, ciri_ciri, keterangan, idGenus);
  if (!request.payload.image) {
    return h
      .response({
        error: true,
        message: 'Please Provide the image',
      })
      .code(400);
  }
  const file = request.payload.image;
  const fileName = file.hapi.filename;
  const filePath = path.join(__dirname, '../asset/', fileName);

  const fileStream = fs.createWriteStream(filePath);
  fileStream.on('error', (err) => {
    console.error(err);
    return h
      .response({
        error: true,
        message: 'error when uploading file',
      })
      .code(500);
  });

  file.pipe(fileStream);
  try {
    await (await connection).execute('INSERT INTO tb_genus (id_genus, nama_latin,nama_umum, ciri_ciri,keterangan, gambar, id_famili) VALUES(?,?,?,?,?,?,?)', [null, nama_latin, nama_umum, ciri_ciri, keterangan, fileName, id_famili]);
    return h.response({
      error: false,
      message: 'Add Data Genus success',
    });
  } catch (error) {
    return h.response({
      error: true,
      message: 'Error : ' + error,
    });
  }
};

const DetailgenusData = async (request, h) => {
  try {
    const { id_genus } = request.params;
    const query = 'SELECT * FROM tb_genus where id_genus = ?';
    const queryParams = [id_genus];
    const [data] = await (await connection).execute(query, queryParams);
    return h.response({
      error: false,
      message: 'fetch Detail Genus Data Success',
      data: data[0],
    });
  } catch (error) {
    return h.response({
      error: true,
      message: error,
    });
  }
};

const DeleteGenusData = async (request, h) => {
  try {
    const { id_genus } = request.params;
    const query = 'DELETE FROM tb_genus where id_genus = ? ';
    const queryParams = [id_genus];

    await (await connection).execute(query, queryParams);
    return h.response({
      error: false,
      message: 'Delete Data Genus Success',
    });
  } catch (error) {
    return h.response({
      error: false,
      message: 'error : ' + error,
    });
  }
};

const updateGenus = async (request, h) => {
  const { id_genus, nama_latin, nama_umum, ciri_ciri, keterangan, id_famili } = request.payload;
  if (!request.payload.image) {
    return h
      .response({
        error: true,
        message: 'Please Provide the image',
      })
      .code(400);
  }

  const file = request.payload.image;
  const fileName = file.hapi.filename;
  const filePath = path.join(__dirname, '../asset/', fileName);

  const fileStream = fs.createWriteStream(filePath);
  fileStream.on('error', (err) => {
    return h
      .response({
        error: true,
        message: 'error when uploading file',
      })
      .code(500);
  });

  file.pipe(fileStream);

  try {
    const [response] = await (
      await connection
    ).execute('UPDATE tb_genus SET nama_latin = ?,nama_umum = ?, ciri_ciri = ?, keterangan = ? , id_famili = ? WHERE id_genus =  ?', [nama_latin, nama_umum, ciri_ciri, keterangan, id_famili, id_genus]);
    console.log(response);
    return h.response({
      error: false,
      message: 'Update data Success',
    });
  } catch (error) {
    return h.response({
      error: true,
      message: 'Error : ' + error,
    });
  }
};
module.exports = [getSpesiesData, AddGenusData, DetailgenusData, DeleteGenusData, updateGenus];
