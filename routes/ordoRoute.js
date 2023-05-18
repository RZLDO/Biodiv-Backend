const [getAllOrdo, addOrdo, detailOrdo, deleteOrdo] = require('../handler/ordoHandler');
const ordoRoute = [
  {
    method: 'POST',
    path: '/api/ordo',

    handler: addOrdo,
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
    path: '/api/ordo',
    handler: getAllOrdo,
  },
  {
    method: 'GET',
    path: '/api/ordo/{id_ordo}',
    handler: detailOrdo,
  },
  {
    method: 'DELETE',
    path: '/api/ordo/{id_ordo}',
    handler: deleteOrdo,
  },
];

module.exports = ordoRoute;
