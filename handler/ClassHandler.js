const connection = require('../service/databaseConnection');
const path = require('path');
const fs = require('fs');
const getAllClass = async (response, h) => {
  try {
    const query = 'SELECT * FROM tb_class where verifikasi = ?';
    const queryParams = 'sukses';
    const [data] = await (await connection).execute(query, [queryParams]);

    if (data && data.length > 0) {
      const response = h.response({
        error: false,
        message: 'get data class success',
        data,
      });
      response.code(200);
      return response;
    } else {
      const response = h.response({
        error: true,
        message: 'get data class failed',
      });
      response.code(400);
      return response;
    }
  } catch (error) {
    const response = h.response({
      error: true,
      message: 'Failed to get data ' + error,
    });
    response.code(500);
    return response;
  }
};

const getDataClassById = async (request, h) => {
  try {
    const { id } = request.params;
    // console.log(id);
    const query = 'Select * from tb_class where id_class = ?';
    const queryParams = [id];
    const [data] = await (await connection).execute(query, queryParams);
    if (!data) {
      const response = h.response({
        error: true,
        message: 'class not found',
      });
      response.code(400);
      return response;
    } else {
      const response = h.response({
        error: false,
        message: 'get Data class success',
        data: data[0],
      });
      return response;
    }
  } catch (error) {
    const response = h.response({
      error: true,
      message: error.message,
    });

    response.code(500);
    return response;
  }
};

const addClassDataToTemp = async (request, h) => {
  const { nama_latin, nama_umum, ciri_ciri, keterangan } = request.payload;

  if (!request.payload.image) {
    return h
      .response({
        error: true,
        message: 'Image cannot be null',
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
    await (await connection).execute('INSERT INTO tb_class (id_class, nama_latin, nama_umum, ciri_ciri, keterangan, gambar) VALUES (?,?,?,?,?,?)', [null, nama_latin, nama_umum, ciri_ciri, keterangan, fileName]);
    return h.response({
      error: false,
      message: 'success adding data',
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

const updateClassData = async (request, h) => {
  const { id_class, nama_latin, nama_umum, ciri_ciri, keterangan } = request.payload;
  if (!request.payload.image) {
    return h
      .response({
        error: true,
        message: 'Image cannot be null',
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
        message: 'Error when uploading file',
      })
      .code(500);
  });

  file.pipe(fileStream);

  try {
    const [response] = await (await connection).execute('UPDATE tb_class SET nama_latin = ?, nama_umum = ?, ciri_ciri = ?, keterangan = ?, gambar = ? WHERE id_class = ?', [nama_latin, nama_umum, ciri_ciri, keterangan, fileName, id_class]);
    return h.response({
      error: false,
      message: 'Success updating data',
    });
  } catch (error) {
    console.error(error);
    return h
      .response({
        error: true,
        message: 'Error updating data in the database.',
      })
      .code(500);
  }
};

const verifikasiTbClass = async (request, h) => {
  const { verifikasi, id_class } = request.payload;

  await connection.query('UPDATE tb_class SET verifikasi=? WHERE id_class=?', [verifikasi, id_class], function (error, rows, field) {
    if (error) {
      console.error(error);
      return h.response('Error updating data.').code(500);
    } else {
      return h.response({ status: 'success' });
    }
  });
};
const deleteClass = async (request, h) => {
  try {
    const { id_class } = request.params;
    const query = 'DELETE FROM tb_class where id_class = ?';
    const queryParams = [id_class];
    await (await connection).execute(query, queryParams);
    const response = h.response({
      message: 'Data Deleted Successfuly',
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      message: error,
    });
    response.code(500);
    return response;
  }
};

const getImageClass = async (request, h) => {
  const { imageName } = request.params;
  const path = '../asset/' + imageName;

  return h.response(fs.createReadStream(path)).header('Content-Type', 'image/jpg');
};
module.exports = [getAllClass, getDataClassById, addClassDataToTemp, verifikasiTbClass, getImageClass, deleteClass, updateClassData];
