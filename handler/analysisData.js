const connection = require('../service/databaseConnection');

const getAnalysisData = async (request, h) => {
  try {
    const { id_spesies } = request.params;

    const query =
      'SELECT DATE_FORMAT(tb_kemunculan.waktu, "%M") AS bulan, CAST(SUM(tb_kemunculan.jumlah_perkemunculan) AS SIGNED) AS total_perkemunculan, tb_lokasi.nama_lokasi FROM tb_kemunculan INNER JOIN tb_lokasi ON tb_kemunculan.id_lokasi = tb_lokasi.id_lokasi WHERE tb_kemunculan.id_spesies = ? GROUP BY DATE_FORMAT(tb_kemunculan.waktu, "%M"), tb_lokasi.nama_lokasi ORDER BY MONTH(tb_kemunculan.waktu); ';

    const [result] = await (await connection).execute(query, [id_spesies]);
    console.log(result);
    return h
      .response({
        error: false,
        message: 'Fetching Data Analysis Success',
        result,
      })
      .code(200);
  } catch (error) {
    return h.response({
      error: true,
      message: error.message,
    });
  }
};

module.exports = getAnalysisData;
