const [getReportPenyebaran, getReportSpesies] = require('../handler/report');

const ReportRoutes = [
  {
    method: 'GET',
    path: '/api/report/penyebaran',
    handler: getReportPenyebaran,
  },
  {
    method: 'GET',
    path: '/api/report/spesies',
    handler: getReportSpesies,
  },
];

module.exports = ReportRoutes;
