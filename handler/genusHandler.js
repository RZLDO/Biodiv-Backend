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

const getGenusByFamili = async (request, h) => {
  try {
    const { id_famili, page } = request.query;
    if (page == null) {
      const queryParams = ['sukses', id_famili];
      const query = 'SELECT * FROM tb_genus WHERE verifikasi = ? AND id_famili = ? ORDER BY nama_umum ASC';
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
      const queryParams = ['sukses', id_famili, page];
      const query = 'SELECT * FROM tb_genus WHERE verifikasi = ? AND id_famili = ? ORDER BY RAND() LIMIT ?';
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
const AddGenusData = async (request, h) => {
  const { nama_latin, nama_umum, ciri_ciri, keterangan, id_famili } = request.payload;
  console.log(nama_latin, nama_umum, ciri_ciri, keterangan, id_famili);
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

const verifGenus = async (request, h) => {
  try {
    const { id_genus } = request.params;
    console.log(id_genus);
    const query = 'UPDATE tb_genus SET verifikasi = ? where id_genus = ? ';
    const queryParams = 'sukses';

    await (await connection).execute(query, [queryParams, id_genus]);
    return h.response({
      error: false,
      message: 'verivication Genus success',
    });
  } catch (error) {
    return h.response({
      error: true,
      message: 'verivication Genus Failed',
    });
  }
};
module.exports = [getGenusData, AddGenusData, DetailgenusData, DeleteGenusData, updateGenus, verifGenus, getGenusByFamili];
