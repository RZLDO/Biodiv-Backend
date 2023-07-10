const connection = require('../service/databaseConnection');
const path = require('path');
const fs = require('fs');

const getFamilyByOrdo = async (request, h) => {
  try {
    const { id_ordo, page } = request.query;
    if (page == null) {
      const queryParams = ['sukses', id_ordo];
      const query = 'SELECT * FROM tb_famili WHERE verifikasi = ? AND id_ordo = ? ORDER BY nama_umum ASC';
      const [data] = await (await connection).execute(query, queryParams);
      if (data && data.length > 0) {
        const response = h.response({
          error: false,
          message: 'Fetching data successfully',
          data,
        });
        response.code(200);
        return response;
      }
    } else {
      const queryParams = ['sukses', id_ordo, page];
      const query = 'SELECT * FROM tb_famili WHERE verifikasi = ? AND id_ordo = ? ORDER BY RAND() LIMIT ?';
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
const addFamily = async (request, h) => {
  const { nama_latin, nama_umum, ciri_ciri, keterangan, id_ordo } = request.payload;
  if (!request.payload.image) {
    return h
      .response({
        error: true,
        message: 'Please provide the image',
      })
      .code(400);
  }

  const file = request.payload.image;
  const fileName = file.hapi.filename;
  const filePath = path.join(__dirname, '../asset/', fileName);

  const fileStream = fs.createWriteStream(filePath);

  fileStream.on('error', (err) => {
    console.log(err);
    return h
      .response({
        error: true,
        message: 'error when uploading file',
      })
      .code(500);
  });

  file.pipe(fileStream);

  try {
    await (await connection).execute('INSERT INTO tb_famili (id_famili, nama_latin, nama_umum, ciri_ciri,keterangan, gambar, id_ordo)VAlUES (?,?,?,?,?,?,?)', [null, nama_latin, nama_umum, ciri_ciri, keterangan, fileName, id_ordo]);
    return h.response({
      error: false,
      message: 'Add data Famili success',
    });
  } catch (error) {
    console.log(error);
    return h.response({
      error: true,
      message: 'error when insert data to the database',
    });
  }
};
const getAllFamily = async (request, h) => {
  try {
    const query = 'SELECT * FROM tb_famili where verifikasi = ?';
    const queryParams = 'sukses';
    const [data] = await (await connection).execute(query, [queryParams]);
    if (data && data.length > 0) {
      const response = h.response({
        error: false,
        message: 'get data famili success',
        data,
      });
      response.code(200);
      return response;
    } else {
      const response = h.response({
        error: true,
        message: 'get data famili failed',
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

const getFamilyById = async (request, h) => {
  try {
    const { id_famili } = request.params;
    const query = 'Select * from tb_famili where id_famili = ?';
    const queryParams = [id_famili];
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
    console.log(error);
    const response = h.response({
      error: true,
      message: error,
    });

    response.code(500);
    return response;
  }
};
const updateFamily = async (request, h) => {
  const { id_famili, nama_latin, nama_umum, ciri_ciri, keterangan, id_ordo } = request.payload;

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
    await (await connection).execute('UPDATE tb_famili SET nama_latin = ?,nama_umum = ?, ciri_ciri = ?, keterangan = ? , id_ordo = ? WHERE id_famili =  ?', [nama_latin, nama_umum, ciri_ciri, keterangan, id_ordo, id_famili]);

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

const deleteFamily = async (request, h) => {
  try {
    const { id_famili } = request.params;

    const query = 'DELETE from tb_famili where id_famili  = ?';
    const queryParams = [id_famili];

    await (await connection).execute(query, queryParams);
    return h.response({
      error: false,
      message: 'Delete Data success',
    });
  } catch (error) {
    return h.response({
      error: true,
      message: 'error when delete data : ' + error,
    });
  }
};

const verifFamili = async (request, h) => {
  try {
    const { id_famili } = request.params;
    const query = 'UPDATE tb_famili SET verifikasi = ? where id_famili = ? ';
    const queryParams = 'sukses';

    await (await connection).execute(query, [queryParams, id_famili]);
    return h.response({
      error: false,
      message: 'verivication famili success',
    });
  } catch (error) {
    return h.response({
      error: true,
      message: 'verivication famili Failed',
    });
  }
};
module.exports = [getAllFamily, getFamilyById, addFamily, updateFamily, deleteFamily, verifFamili, getFamilyByOrdo];
