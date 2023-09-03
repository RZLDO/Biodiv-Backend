const connection = require('../service/databaseConnection');
const path = require('path');
const fs = require('fs');
const { request } = require('http');
const getOrdoByClass = async (request, h) => {
  try {
    const { id_class, page } = request.query;
    if (page == null) {
      const queryParams = ['sukses', id_class];
      const query = 'SELECT * FROM tb_ordo WHERE verifikasi = ? AND id_class = ? ORDER BY nama_umum ASC';
      const [data] = await (await connection).execute(query, queryParams);

      const response = h.response({
        error: false,
        message: 'Fetching data successfully',
        data,
      });
      response.code(200);
      return response;
    } else {
      const queryParams = ['sukses', id_class, page];
      const query = 'SELECT * FROM tb_ordo WHERE verifikasi = ? AND id_class = ? ORDER BY RAND() LIMIT ?';
      const [data] = await (await connection).execute(query, queryParams);

      const response = h.response({
        error: false,
        message: 'Fetching data successfully',
        data,
      });
      response.code(200);
      return response;
    }
  } catch (error) {
    const response = h.response({
      error: true,
      message: 'Failed to get data: ' + error,
    });
    response.code(500);
    return response;
  }
};

const getAllOrdo = async (request, h) => {
  try {
    const query = 'SELECT * FROM tb_ordo where verifikasi =? ORDER BY id_class';
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
      message: 'success add data to database',
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
    return h
      .response({
        error: false,
        message: 'Get Detail Data Success',
        data: data[0],
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

const deleteOrdo = async (request, h) => {
  try {
    const { id_ordo } = request.params;
    const query = 'Delete From tb_ordo where id_ordo = ?';
    const queryParams = [id_ordo];

    await (await connection).execute(query, queryParams);
    return h.response({
      error: false,
      message: 'Delete data Ordo Success',
    });
  } catch (error) {
    return h.response({
      error: true,
      message: error,
    });
  }
};
const EditDataOrdo = async (request, h) => {
  const { id_ordo, nama_latin, nama_umum, ciri_ciri, keterangan, id_class } = request.payload;

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
    await (
      await connection
    ).execute('UPDATE tb_ordo set nama_latin = ? , nama_umum = ?, ciri_ciri = ?, keterangan = ?, gambar = ?, id_class =? where id_ordo = ?', [nama_latin, nama_umum, ciri_ciri, keterangan, fileName, id_class, id_ordo]);
    return h.response({
      error: false,
      message: 'update data ordo success',
    });
  } catch (error) {
    console.error(error);
    return h
      .response({
        error: true,
        message: 'Error update data into the database.',
      })
      .code(500);
  }
};
const verifikasiOrdo = async (request, h) => {
  try {
    const { id_ordo } = request.params;
    const query = 'UPDATE tb_ordo SET verifikasi = ? where id_ordo = ? ';
    const queryParams = 'sukses';

    await (await connection).execute(query, [queryParams, id_ordo]);
    return h.response({
      error: false,
      message: 'verivication Ordo success',
    });
  } catch (error) {
    return h.response({
      error: true,
      message: 'verivication Ordo Failed',
    });
  }
};

module.exports = [getAllOrdo, addOrdo, detailOrdo, deleteOrdo, verifikasiOrdo, EditDataOrdo, getOrdoByClass];
