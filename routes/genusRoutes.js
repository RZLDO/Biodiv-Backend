const [getGenusData, AddGenusData, DetailgenusData] = require('../handler/genusHandler');
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
];

module.exports = genusRoutes;
