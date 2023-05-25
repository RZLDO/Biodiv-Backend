const [getAllClass, getDataClassById, addClassDataToTemp, verifikasiTbClass, getImageClass, deleteClass, updateClassData] = require('../handler/ClassHandler');
const Path = require('path');
const classRoute = [
  {
    method: 'DELETE',
    path: '/api/class/{id_class}',
    handler: deleteClass,
  },
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
  {
    method: 'PUT',
    path: '/api/class',
    handler: updateClassData,
    options: {
      payload: {
        parse: true,
        allow: 'multipart/form-data',
        multipart: { output: 'stream' },
      },
    },
  },
  {
    method: 'PUT',
    path: '/api/verif/class/{id_class}',
    handler: verifikasiTbClass,
  },
];

module.exports = classRoute;
