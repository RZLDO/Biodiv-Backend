const connection = require('../service/databaseConnection');
const path = require('path');
const fs = require('fs');
const { request } = require('http');
const getAllOrdo = async (request, h) => {
  try {
    const query = 'SELECT * FROM tb_ordo where verifikasi =? ';
    const queryParams = 'sukses';
    const [data] = await (await connection).execute(query, [queryParams]);
    if (data && data.length > 0) {
      const response = h.response({
        error: false,
        message: 'Fetching data successfuly',
        data,
      });
      response.code(200);
      return response;
    } else {
      const response = h.response({
        error: true,
        message: 'Ordo data is null',
      });
      response.code(400);
      return response;
    }
  } catch (error) {
    const response = h.response({
      error: true,
      message: 'failed to get data' + error,
    });
    response.code(500);
    return response;
  }
};

const addOrdo = async (request, h) => {
  const { nama_latin, nama_umum, ciri_ciri, keterangan, id_class } = request.payload;

  if (!request.payload.image) {
    return h
      .response({
        error: true,
        message: 'No image uploaded.',
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
        message: 'Error uploading file',
      })
      .code(500);
  });

  file.pipe(fileStream);
  try {
    await (await connection).execute('INSERT INTO tb_ordo (id_ordo, nama_latin, nama_umum, ciri_ciri, keterangan, gambar, id_class) VALUES (?,?,?,?,?,?,?)', [null, nama_latin, nama_umum, ciri_ciri, keterangan, fileName, id_class]);
    return h.response({
      error: false,
      status: 'success',
    });
  } catch (error) {
    console.error(error);

    return h
      .response({
        error: true,
        message: 'Error inserting data into the database.',
      })
      .code(500);
  }
};

const detailOrdo = async (request, h) => {
  try {
    const { id_ordo } = request.params;
    const query = 'SELECT * FROM tb_ordo where id_ordo = ?';
    const queryParams = [id_ordo];

    const [data] = await (await connection).execute(query, queryParams);
    console.log('ini data ' + data);
    return h
      .response({
        error: false,
        message: 'Get Detail Data Success',
        data: data,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        error: false,
        message: error,
      })
      .code(500);
  }
};
const verifikasiOrdo = async (request, h) => {
  try {
    const { id_ordo } = request.params;
    const { verifikasi } = request.payload;
    const query = 'UPDATE tb_ordo set verifikasi =? where id_ordo = ?';
    const queryParams = [id_ordo, verifikasi];
    await (await connection).execute(query, queryParams);
    return h.response({
      error: false,
      message: 'Verifikasi data success',
    });
  } catch (error) {
    return h
      .response({
        error: true,
        message: error,
      })
      .code(500);
  }
};
module.exports = [getAllOrdo, addOrdo, detailOrdo];
