const connection = require('../service/databaseConnection');

const getTotalData = async (request, h) => {
  try {
    const queries = [
      {
        query: 'SELECT COUNT(*) AS total_data FROM tb_class WHERE verifikasi = ?',
        queryParams: ['sukses'],
      },
      {
        query: 'SELECT COUNT(*) AS total_data FROM tb_famili WHERE verifikasi = ?',
        queryParams: ['sukses'],
      },
      {
        query: 'SELECT COUNT(*) AS total_data FROM tb_genus WHERE verifikasi = ?',
        queryParams: ['sukses'],
      },
      {
        query: 'SELECT COUNT(*) AS total_data FROM tb_ordo WHERE verifikasi = ?',
        queryParams: ['sukses'],
      },
      {
        query: 'SELECT COUNT(*) AS total_data FROM tb_spesies WHERE verifikasi = ?',
        queryParams: ['sukses'],
      },
    ];
    const resultsArray = [];
    let results = 0;
    for (const { query, queryParams } of queries) {
      const [rows] = await (await connection).execute(query, queryParams);
      const totalData = rows[0].total_data;
      resultsArray.push(totalData);
      results = results + totalData;
    }
    const response = h.response({
      error: false,
      message: 'get total data success',
      data: {
        class: resultsArray[0],
        famili: resultsArray[1],
        genus: resultsArray[2],
        ordo: resultsArray[3],
        spesies: resultsArray[4],
        totalData: results,
      },
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      error: true,
      message: `Error when get the data ` + error,
    });
    console.error('Gagal mendapatkan total data:', error);
    response.code(500);
    return response;
  }
};

const getUnverifiedData = async (request, h) => {
  try {
    const queries = [
      {
        query: 'SELECT COUNT(*) AS total_data FROM tb_class WHERE verifikasi = ?',
        queryParams: [''],
      },
      {
        query: 'SELECT COUNT(*) AS total_data FROM tb_famili WHERE verifikasi = ?',
        queryParams: [''],
      },
      {
        query: 'SELECT COUNT(*) AS total_data FROM tb_genus WHERE verifikasi = ?',
        queryParams: [''],
      },
      {
        query: 'SELECT COUNT(*) AS total_data FROM tb_ordo WHERE verifikasi = ?',
        queryParams: [''],
      },
      {
        query: 'SELECT COUNT(*) AS total_data FROM tb_spesies WHERE verifikasi = ?',
        queryParams: [''],
      },
    ];
    const resultsArray = [];
    let results = 0;
    for (const { query, queryParams } of queries) {
      const [rows] = await (await connection).execute(query, queryParams);
      const totalData = rows[0].total_data;
      resultsArray.push(totalData);
      results = results + totalData;
    }
    const response = h.response({
      error: false,
      message: 'get total data success',
      data: {
        class: resultsArray[0],
        famili: resultsArray[1],
        genus: resultsArray[2],
        ordo: resultsArray[3],
        spesies: resultsArray[4],
        totalData: results,
      },
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      error: true,
      message: `Error when get the data ` + error,
    });
    console.error('Gagal mendapatkan total data:', error);
    response.code(500);
    return response;
  }
};

const searching = async (request, h) => {
  try {
    const { searching } = request.params;
    const queries = [
      {
        query: `SELECT * FROM tb_class WHERE nama_umum LIKE CONCAT('%', ?, '%') OR nama_latin LIKE CONCAT('%', ?, '%')`,
        queryParams: [searching, searching],
      },
      {
        query: `SELECT * FROM tb_ordo WHERE nama_umum LIKE CONCAT('%', ?, '%') OR nama_latin LIKE CONCAT('%', ?, '%')`,
        queryParams: [searching, searching],
      },
      {
        query: `SELECT * FROM tb_famili WHERE nama_umum LIKE CONCAT('%', ?, '%') OR nama_latin LIKE CONCAT('%', ?, '%')`,
        queryParams: [searching, searching],
      },
      {
        query: `SELECT * FROM tb_genus WHERE nama_umum LIKE CONCAT('%', ?, '%') OR nama_latin LIKE CONCAT('%', ?, '%')`,
        queryParams: [searching, searching],
      },
      {
        query: `SELECT * FROM tb_spesies WHERE nama_umum LIKE CONCAT('%', ?, '%') OR nama_latin LIKE CONCAT('%', ?, '%')`,
        queryParams: [searching, searching],
      },
    ];
    const resultsArray = [];
    let results = 0;
    for (const { query, queryParams } of queries) {
      const [rows] = await (await connection).execute(query, queryParams);
      resultsArray.push(rows);
    }
    const response = h.response({
      error: false,
      message: 'get total data success',
      data: {
        class: resultsArray[0],
        ordo: resultsArray[1],
        famili: resultsArray[2],
        genus: resultsArray[3],

        spesies: resultsArray[4],
      },
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      error: true,
      message: `Error when get the data ` + error,
    });
    console.error('Gagal mendapatkan total data:', error);
    response.code(500);
    return response;
  }
};

module.exports = [getTotalData, getUnverifiedData, searching];
