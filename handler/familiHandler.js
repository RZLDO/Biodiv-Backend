const connection = require('../service/databaseConnection');
const path = require('path');
const fs = require('fs');
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
    const { id } = request.query;
    const query = 'Select * from tb_famili where id_class = ?';
    const queryParams = [id];
    const [data] = (await connection).execute(query, queryParams);
    if (data === 0) {
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
        data,
      });
      return response;
    }
  } catch (error) {
    const response = h.response({
      error: true,
      message: error,
    });

    response.code(500);
    return response;
  }
};

module.exports = [getAllFamily, getFamilyById];
