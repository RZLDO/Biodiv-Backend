const [getAllFamily, getFamilyById] = require('../handler/familiHandler');

const familiRoutes = [
  {
    method: 'GET',
    path: '/api/famili',
    handler: getAllFamily,
  },
  {
    method: 'GET',
    path: '/api/famili/{id_famili}',
    handler: getFamilyById,
  },
];

module.exports = familiRoutes;
