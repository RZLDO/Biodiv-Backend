const Hapi = require('@hapi/hapi');
const AuthRoutes = require('./routes/routesAuth');
const classRoute = require('./routes/classRoute');
const familiRoutes = require('./routes/familiRoute');
const ordoRoute = require('./routes/ordoRoute');
const genusRoutes = require('./routes/genusRoutes');
const unverifiedRoutes = require('./routes/unverifiedRoute');
const spesiesRoutes = require('./routes/spesiesRoute');
const ScarcityRoute = require('./routes/scarcityRoute');
const ReportRoutes = require('./routes/reportRoute');
const lokasiRoutes = require('./routes/lokasiRoute');
const server = new Hapi.server({
  host: '10.140.138.79',
  port: 3000,
});
const init = async () => {
  await server.register(require('@hapi/inert'));
  server.route([...AuthRoutes, ...lokasiRoutes, ...classRoute, ...familiRoutes, ...ordoRoute, ...genusRoutes, ...unverifiedRoutes, ...spesiesRoutes, ...ScarcityRoute, ...ReportRoutes]);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
