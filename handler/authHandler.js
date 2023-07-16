const sqlConnection = require('../service/databaseConnection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const saltRounds = 10;

const indexHandler = async (request, h) => {
  const response = h.response({
    error: 'false',
    message: 'succes to connect',
  });
  response.code(200);
  return response;
};
const loginHandler = async (request, h) => {
  try {
    const { username, password } = request.payload;

    if (!username || !password) {
      const response = h.response({
        error: true,
        message: 'username and password are required',
      });
      response.code(400);
      return response;
    }
    const checkUsername = 'SELECT * FROM tb_institusi WHERE username = ?';
    const [rows] = await (await sqlConnection).execute(checkUsername, [username]);
    if (rows.length === 0) {
      const response = h.response({
        error: true,
        message: 'invalid username or password',
      });
      response.code(400);
      return response;
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(password);
    if (!passwordMatch) {
      const response = h.response({
        error: true,
        message: 'invalid username or password',
      });
      response.code(400);
      return response;
    }
    const token = jwt.sign({ userId: user.userId, username: user.username, userLevel: user.id_level }, process.env.JWT_SECRET, { expiresIn: '24h' });
    const response = h.response({
      error: false,
      message: 'success',
      loginResult: {
        userId: user.id_institusi,
        username: user.username,
        userLevel: user.id_level,
        token: token,
      },
    });
    response.code(200);
    return response;
  } catch (e) {
    console.log(e);
    const response = h.response({ error: 'true', message: 'error login' });
    response.code(500);
    return response;
  }
};

const registerHandler = async (request, h) => {
  try {
    const { name, address, username, password, userLevel } = request.payload;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const duplicateQuery = 'SELECT COUNT(*) AS count FROM tb_institusi WHERE username = ?';
    const [duplicateRows] = await (await sqlConnection).execute(duplicateQuery, [username]);
    if (duplicateRows[0].count > 0) {
      const response = h.response({
        error: true,
        message: 'Username already exists',
      });
      response.code(400);
      return response;
    }
    const checkQuery = 'SELECT COUNT(*) AS count FROM tb_userlevel WHERE id_level = ?';
    const [rows] = await (await sqlConnection).execute(checkQuery, [userLevel]);
    if (rows[0].count === 0) {
      const response = h.response({
        error: true,
        message: 'Invalid user level',
      });
      response.code(400);
      return response;
    }
    (await sqlConnection).query('INSERT INTO tb_institusi (nama, alamat,username,password,id_level) VALUES(?,?,?,?,?)', [name, address, username, hashedPassword, userLevel]);
    const response = h.response({
      error: false,
      message: 'User registered successfully',
    });
    response.code(200);
    return response;
  } catch (e) {
    console.error('error:', e.message);
    const response = h.response({
      error: true,
      message: 'error registering users',
    });
    response.code(400);
    return response;
  }
};

module.exports = [loginHandler, registerHandler, indexHandler];
