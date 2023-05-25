const [getSpesiesData, AddSpesiesData, DetailSpesiesData, DeleteSpesiesData, updateSpesies, verifikasiSpesies] = require('../handler/familiHandler');

const spesiesRoutes = [
  {
    method: 'GET',
    path: '/api/spesies',
    handler: getSpesiesData,
  },
  {
    method: 'POST',
    path: '/api/spesies',
    handler: AddSpesiesData,
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
    path: '/api/spesies/{id_spesies}',
    handler: DetailSpesiesData,
  },
  {
    method: 'DELETE',
    path: '/api/spesies/{id_spesies}',
    handler: DeleteSpesiesData,
  },
  {
    method: 'UPDATE',
    path: '/api/spesies/{id_spesies}',
    handler: updateSpesies,
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
    path: '/api/verif/spesies/{id_spesies}',
    handler: verifikasiSpesies,
  },
];

module.exports = spesiesRoutes;
