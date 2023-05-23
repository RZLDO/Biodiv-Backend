const [getUnverifiedClass, getUnverifiedGenus, getUnverifiedOrdo, getUnverifiedFamili] = require('../handler/unverifiedHandler');
const unverifiedRoutes = [
  {
    method: 'GET',
    path: '/api/unverified/class',
    handler: getUnverifiedClass,
  },
  {
    method: 'GET',
    path: '/api/unverified/genus',
    handler: getUnverifiedGenus,
  },
  {
    method: 'GET',
    path: '/api/unverified/ordo',
    handler: getUnverifiedOrdo,
  },
  {
    method: 'GET',
    path: '/api/unverified/famili',
    handler: getUnverifiedFamili,
  },
];

module.exports = unverifiedRoutes;
