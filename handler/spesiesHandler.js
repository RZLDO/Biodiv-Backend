const connection = require('../service/databaseConnection');
const path = require('path');
const fs = require('fs');
const addSpesiesLocation = async (request, h) => {
  try {
    const { nama_lokasi, latitude, longitude, radius, idSpesies } = request.payload;
    const query = 'INSERT INTO tb_lokasi (id_lokasi,nama_lokasi, latitude, longitude, radius,id_spesies) VALUES(null,?,?,?,?,?)';
    const queryParams = [nama_lokasi, latitude, longitude, radius, idSpesies];

    await (await connection).execute(query, queryParams);

    const response = h.response({
      error: false,
      message: 'success add location data',
    });

    response.code(200);
    return response;
  } catch (e) {
    const response = h.response({
      error: true,
      message: e.message,
    });

    return response;
  }
};
const getSpesiesByGenus = async (request, h) => {
  try {
    const { id_genus, page } = request.query;
    if (page == null) {
      const queryParams = ['sukses', id_genus];
      const query = 'SELECT * FROM tb_spesies WHERE verifikasi = ? AND id_genus = ? ORDER BY nama_umum ASC';
      const [data] = await (await connection).execute(query, queryParams);

      const response = h.response({
        error: false,
        message: 'Fetching data successfully',
        data,
      });
      response.code(200);
      return response;
    } else {
      const queryParams = ['sukses', id_genus, page];
      const query = 'SELECT * FROM tb_spesies WHERE verifikasi = ? AND id_genus = ? ORDER BY RAND() LIMIT ?';
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
const getSpesiesData = async (response, h) => {
  try {
    const query = 'SELECT * FROM tb_spesies WHERE verifikasi = ?';
    const queryParams = 'sukses';

    const [data] = await (await connection).execute(query, [queryParams]);
    return h.response({
      error: false,
      message: 'Fetching Data Famili Success',
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

const AddSpesiesData = async (request, h) => {
  const { nama_latin, nama_umum, habitat, karakteristik, keterangan, status, id_genus, id_kategori } = request.payload;
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
    await (
      await connection
    ).execute('INSERT INTO tb_spesies (id_spesies,nama_latin, nama_umum, habitat,karakteristik, keterangan, status,gambar,id_genus,id_kategori) VALUES(?,?,?,?,?,?,?,?,?,?)', [
      null,
      nama_latin,
      nama_umum,
      habitat,
      karakteristik,
      keterangan,
      status,
      fileName,
      id_genus,
      id_kategori,
    ]);
    return h.response({
      error: false,
      message: 'Add Data spesies success',
    });
  } catch (error) {
    return h.response({
      error: true,
      message: 'Error : ' + error,
    });
  }
};
const getSpesiesByScarcity = async (request, h) => {
  try {
    const { id_kategori } = request.params;
    const query = 'SELECT * FROM tb_spesies where id_kategori = ?';
    const queryParams = [id_kategori];

    const [data] = await (await connection).execute(query, queryParams);

    return h.response({
      error: false,
      message: 'get data by kategori success',
      data,
    });
  } catch (error) {
    return h.response({
      error: true,
      message: error,
    });
  }
};
const DetailSpesiesData = async (request, h) => {
  try {
    const { id_spesies } = request.params;
    const query = 'SELECT * FROM tb_spesies where id_spesies = ?';
    const queryLokasi = 'SELECT * FROM tb_lokasi where id_spesies = ?';
    const queryParams = [id_spesies];
    const [data] = await (await connection).execute(query, queryParams);
    const [lokasi] = await (await connection).execute(queryLokasi, queryParams);
    return h.response({
      error: false,
      message: 'fetch Detail Spesies Data Success',
      data: data[0],
      lokasi,
    });
  } catch (error) {
    return h.response({
      error: true,
      message: error,
    });
  }
};

const DeleteSpesiesData = async (request, h) => {
  try {
    const { id_spesies } = request.params;
    const query = 'DELETE FROM tb_spesies where id_spesies = ? ';
    const queryParams = [id_spesies];

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

const updateSpesies = async (request, h) => {
  const { id_spesies, nama_latin, nama_umum, habitat, karakteristik, keterangan, status, id_genus, id_kategori } = request.payload;
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
    ).execute('UPDATE tb_spesies SET nama_latin = ?,nama_umum = ?,habitat = ?,karakteristik = ? , keterangan = ? , status = ?, gambar = ?, id_genus = ? , id_kategori = ? WHERE id_spesies =  ?', [
      nama_latin,
      nama_umum,
      habitat,
      karakteristik,
      keterangan,
      status,
      fileName,
      id_genus,
      id_kategori,
      id_spesies,
    ]);
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

const verifikasiSpesies = async (request, h) => {
  try {
    const { id_spesies } = request.params;
    const query = 'UPDATE tb_spesies SET verifikasi = ? where id_spesies = ?';
    const queryParams = 'sukses';

    await (await connection).execute(query, [queryParams, id_spesies]);

    return h
      .response({
        error: false,
        message: 'Verification Spesies sukses',
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        error: true,
        message: error,
      })
      .code(200);
  }
};

module.exports = [getSpesiesData, AddSpesiesData, DetailSpesiesData, DeleteSpesiesData, updateSpesies, verifikasiSpesies, getSpesiesByGenus, getSpesiesByScarcity, addSpesiesLocation];
