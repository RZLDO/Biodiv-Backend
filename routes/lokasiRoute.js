const [getDataAnalytics] = require('../handler/lokasiHandler');

const lokasiRoutes = [
  {
    method: 'GET',
    path: '/api/lokasi/analys/{id_spesies}',
    handler: getDataAnalytics,
  },
];

module.exports = lokasiRoutes;
