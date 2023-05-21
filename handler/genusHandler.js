const connection = require('../service/databaseConnection');
const path = require('path');
const fs = require('fs');

const getGenusData = async (response, h) => {
  try {
    const query = 'SELECT * FROM tb_genus WHERE verifikasi = ?';
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
  const { nama_latin, nama_umum, ciri_ciri, keterangan, id_famili } = request.payload;
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
      message: 'Add Data Famili success',
    });
  } catch (error) {
    return h.response({
      error: true,
      message: 'Error : ' + error,
    });
  }
};

module.exports = [getGenusData, AddGenusData];
