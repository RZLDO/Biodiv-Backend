const [getGenusData, AddGenusData, DetailgenusData, DeleteGenusData] = require('../handler/genusHandler');
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
];

module.exports = genusRoutes;
