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
const getScarcityById = async (request, h) => {
  try {
    const { id_scarcity } = request.params;

    const query = 'SELECT * FROM tb_kelangkaan WHERE id_kategori = ?';
    const queryParams = [id_scarcity];
    const [result] = await (await connection).execute(query, queryParams);
    return h.response({
      error: false,
      message: 'fetch data success',
      data: result[0],
    });
  } catch (error) {
    return h
      .response({
        error: error,
      })
      .code(500);
  }
};
module.exports = [getScarcity, getDataScarcity, getScarcityById];
