const getReportClass = require('../handler/report');

const ReportRoutes = [
  {
    method: 'GET',
    path: '/api/report/class',
    handler: getReportClass,
  },
];

module.exports = ReportRoutes;
