const [getAllClass, getDataClassById, addClassDataToTemp, verifikasiTbClass, getImageClass] = require('../handler/ClassHandler');
const Path = require('path');
const classRoute = [
  {
    method: 'GET',
    path: '/api/class',
    handler: getAllClass,
  },
  {
    method: 'GET',
    path: '/api/class/{id}',
    handler: getDataClassById,
  },

  {
    method: 'POST',
    path: '/api/class',
    handler: addClassDataToTemp,
    options: {
      payload: {
        parse: true,
        allow: 'multipart/form-data',
        multipart: { output: 'stream' },
      },
    },
  },
  {
    method: 'GET',
    path: '/api/image/{imageName}',
    handler: {
      directory: {
        path: Path.join(__dirname, '../asset/'), // Ganti dengan path sesuai dengan lokasi file-file Anda
        redirectToSlash: true,
        index: true,
      },
    },
  },
];

module.exports = classRoute;
