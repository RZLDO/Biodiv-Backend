const [getScarcity, getDataScarcity, getScarcityById] = require('../handler/scarcityHandler');

const ScarcityRoute = [
  {
    method: 'GET',
    path: '/api/scarcity',
    handler: getScarcity,
  },
  {
    method: 'GET',
    path: '/api/scarcity/total',
    handler: getDataScarcity,
  },
  {
    method: 'GET',
    path: '/api/scarcity/{id_scarcity}',
    handler: getScarcityById,
  },
];

module.exports = ScarcityRoute;
