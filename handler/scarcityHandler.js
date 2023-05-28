const connection = require('../service/databaseConnection');

const getScarcity = async (request, h) => {
  try {
    const query = 'Select * FROM tb_kelangkaan';
    const [data] = await (await connection).query(query);

    return h.response({
      error: false,
      message: 'Fetch data kelangkaan sukses',
      data: data,
    });
  } catch (error) {
    return h.response({
      error: true,
      message: error,
    });
  }
};

const getDataScarcity = async (request, h) => {
  try {
    const query = 'SELECT id_kategori, COUNT(*) AS count FROM tb_spesies where verifikasi = ? GROUP BY id_kategori ';
    const queryParams = 'sukses';
    const [result] = await (await connection).execute(query, [queryParams]);
    return h.response({
      error: false,
      message: 'fetch data success',
      data: result,
    });
  } catch (error) {
    return h
      .response({
        error: error,
      })
      .code(500);
  }
};

module.exports = [getScarcity, getDataScarcity];
