const [getGenusData, AddGenusData] = require('../handler/genusHandler');
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
];

module.exports = genusRoutes;
