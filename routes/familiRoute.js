const [getAllFamily, getFamilyById, addFamily, updateFamily, deleteFamily, verifFamili] = require('../handler/familiHandler');

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

  {
    method: 'POST',
    path: '/api/famili',
    handler: addFamily,
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
    path: '/api/famili',
    handler: updateFamily,
    options: {
      payload: {
        parse: true,
        allow: 'multipart/form-data',
        multipart: { output: 'stream' },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/api/famili/{id_famili}',
    handler: deleteFamily,
  },
  {
    method: 'PUT',
    path: '/api/verif/famili/{id_famili}',
    handler: verifFamili,
  },
];

module.exports = familiRoutes;
