const getAnalysisData = require('../handler/analysisData');

const analysisRoute = [
  {
    method: 'GET',
    path: '/api/analysis/{id_spesies}',
    handler: getAnalysisData,
  },
];

module.exports = analysisRoute;
