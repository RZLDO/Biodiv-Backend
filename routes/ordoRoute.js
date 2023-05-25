const [getAllOrdo, addOrdo, detailOrdo, deleteOrdo, verifikasiOrdo, EditDataOrdo] = require('../handler/ordoHandler');
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
  {
    method: 'PUT',
    path: '/api/ordo',
    handler: EditDataOrdo,
    options: {
      payload: {
        parse: true,
        allow: 'multipart/form-data',
        multipart: { output: 'stream' },
      },
    },
  },
  {
    method: 'PUT',
    path: '/api/verif/ordo/{id_ordo}',
    handler: verifikasiOrdo,
  },
];

module.exports = ordoRoute;
