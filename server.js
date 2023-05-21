const Hapi = require('@hapi/hapi');
const AuthRoutes = require('./routes/routesAuth');
const classRoute = require('./routes/classRoute');
const familiRoutes = require('./routes/familiRoute');
const ordoRoute = require('./routes/ordoRoute');
const genusRoutes = require('./routes/genusRoutes');
const server = new Hapi.server({
  port: 5000,
  host: '192.168.1.9',
});
const init = async () => {
  await server.register(require('@hapi/inert'));
  server.route([...AuthRoutes, ...classRoute, ...familiRoutes, ...ordoRoute, ...genusRoutes]);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
