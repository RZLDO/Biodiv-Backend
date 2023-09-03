const connection = require('../service/databaseConnection');

const getDataAnalytics = async (request, h) => {
  try {
    const { id_spesies } = request.params;
    const query = 'SELECT * FROM tb_tingkat_kemunculan WHERE id_spesies = ?';
    const queryParams = [id_spesies];

    const [result] = await (await connection).execute(query, queryParams);

    return h.response({
      error: false,
      message: 'Fetch Data success',
      result,
    });
  } catch (error) {
    return h.response({
      error: true,
      message: 'Error :' + error,
    });
  }
};

module.exports = [getDataAnalytics];
