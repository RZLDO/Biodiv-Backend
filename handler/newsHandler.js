const connection = require('../service/databaseConnection');
const path = require('path');
const fs = require('fs');
const getNews = async (request, h) => {
  try {
    const query = 'SELECT * FROM tb_berita';
    const [result] = await (await connection).execute(query);

    return h
      .response({
        error: false,
        message: 'Get news data success',
        result,
      })
      .code(200);
  } catch (error) {
    return h.response({
      error: true,
      message: 'error:' + error,
    });
  }
};

const addNews = async (request, h) => {
  const { judul, deskripsi, url_web } = request.payload;
  if (!request.payload.image) {
    return h
      .response({
        error: true,
        message: 'Provide the image',
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
    await (await connection).execute('INSERT INTO tb_berita (id_berita, judul_berita,deskripsi_singkat,web_url, gambar) VALUES(?,?,?,?,?)', [null, judul, deskripsi, url_web, fileName]);
    return h.response({
      error: false,
      message: 'Add Data News success',
    });
  } catch (error) {
    return h.response({
      error: true,
      message: 'Error : ' + error,
    });
  }
};

const deleteNews = async (request, h) => {
  try {
    const { id_berita } = request.params;
    const query = 'DELETE FROM tb_berita WHERE id_berita=?';
    const queryParams = [id_berita];

    await (await connection).execute(query, queryParams);
    return h
      .response({
        error: false,
        message: 'Delete News Success',
      })
      .code(200);
  } catch (error) {
    return h.response({
      error: false,
      message: 'error' + error,
    });
  }
};

module.exports = [getNews, addNews, deleteNews];
