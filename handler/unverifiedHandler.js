const connection = require('../service/databaseConnection');
const getUnverifiedClass = async (request, h) => {
  try {
    const query = 'SELECT * FROM tb_class where verifikasi = ?';
    const queryParams = '';
    const [data] = await (await connection).execute(query, [queryParams]);

    return h.response({
      error: false,
      message: 'Get unverified data class success',
      data: data,
    });
  } catch (error) {
    return h.response({
      error: true,
      message: error,
    });
  }
};
const getUnverifiedGenus = async (request, h) => {
  try {
    const query = 'SELECT * FROM tb_genus where verifikasi = ?';
    const queryParams = '';
    const [data] = await (await connection).execute(query, [queryParams]);

    return h.response({
      error: false,
      message: 'Get unverified data genus success',
      data: data,
    });
  } catch (error) {
    return h.response({
      error: true,
      message: error,
    });
  }
};

const getUnverifiedFamili = async (request, h) => {
  try {
    const query = 'SELECT * FROM tb_famili where verifikasi = ?';
    const queryParams = '';
    const [data] = await (await connection).execute(query, [queryParams]);

    return h.response({
      error: false,
      message: 'Get unverified data famili success',
      data: data,
    });
  } catch (error) {
    return h.response({
      error: true,
      message: error,
    });
  }
};

const getUnverifiedOrdo = async (request, h) => {
  try {
    const query = 'SELECT * FROM tb_ordo where verifikasi = ?';
    const queryParams = '';
    const [data] = await (await connection).execute(query, [queryParams]);

    return h.response({
      error: false,
      message: 'Get unverified data ordo success',
      data: data,
    });
  } catch (error) {
    return h.response({
      error: true,
      message: error,
    });
  }
};
const getUnverifiedSpesies = async (request, h) => {
  try {
    const query = 'SELECT * FROM tb_spesies where verifikasi = ?';
    const queryParams = '';
    const [data] = await (await connection).execute(query, [queryParams]);

    return h.response({
      error: false,
      message: 'Get unverified data spesies success',
      data: data,
    });
  } catch (error) {
    return h.response({
      error: true,
      message: error,
    });
  }
};

module.exports = [getUnverifiedClass, getUnverifiedGenus, getUnverifiedFamili, getUnverifiedOrdo, getUnverifiedSpesies];
