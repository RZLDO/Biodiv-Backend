const [getScarcity, getDataScarcity] = require('../handler/scarcityHandler');

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
];

module.exports = ScarcityRoute;
