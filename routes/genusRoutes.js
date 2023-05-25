const [getGenusData, AddGenusData, DetailgenusData, DeleteGenusData, updateGenus, verifGenus] = require('../handler/genusHandler');
const genusRoutes = [
  {
    method: 'GET',
    path: '/api/genus',
    handler: getGenusData,
  },
  {
    method: 'POST',
    path: '/api/genus',
    handler: AddGenusData,
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
    path: '/api/genus/{id_genus}',
    handler: DetailgenusData,
  },
  {
    method: 'DELETE',
    path: '/api/genus/{id_genus}',
    handler: DeleteGenusData,
  },
  {
    method: 'PUT',
    path: '/api/genus',
    handler: updateGenus,
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
    path: '/api/verif/genus/{id_genus}',
    handler: verifGenus,
  },
];

module.exports = genusRoutes;
