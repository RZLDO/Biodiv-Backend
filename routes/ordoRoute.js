const [getAllOrdo, addOrdo] = require('../handler/ordoHandler');
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
];

module.exports = ordoRoute;
