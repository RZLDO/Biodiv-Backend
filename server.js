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
const server = new Hapi.server({
  host: '192.168.100.84',
  port: 5000,
});
const init = async () => {
  await server.register(require('@hapi/inert'));
  server.route([...AuthRoutes, ...classRoute, ...familiRoutes, ...ordoRoute, ...genusRoutes, ...unverifiedRoutes, ...spesiesRoutes, ...ScarcityRoute, ...ReportRoutes]);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
