const connection = require('../service/databaseConnection');
const path = require('path');
const fs = require('fs');
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
    return h.response('No image uploaded.').code(400);
  }

  const file = request.payload.image;
  const fileName = file.hapi.filename;
  const filePath = path.join(__dirname, '../asset/', fileName);

  const fileStream = fs.createWriteStream(filePath);
  fileStream.on('error', (err) => {
    console.error(err);
    return h.response('Error uploading file.').code(500);
  });

  file.pipe(fileStream);
  try {
    await (await connection).execute('INSERT INTO tb_ordo (id_ordo, nama_latin, nama_umum, ciri_ciri, keterangan, gambar, id_class) VALUES (?,?,?,?,?,?,?)', [null, nama_latin, nama_umum, ciri_ciri, keterangan, fileName, id_class]);
    return h.response({ status: 'success' });
  } catch (error) {
    console.error(error);

    return h.response('Error inserting data into the database.').code(500);
  }
};

module.exports = [getAllOrdo, addOrdo];
