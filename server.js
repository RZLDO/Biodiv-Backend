const Hapi = require('@hapi/hapi');
const AuthRoutes = require('./routes/routesAuth');
const server = new Hapi.server({
  port: 5000,
  host: '192.168.43.225',
});
const init = async () => {
  server.route(AuthRoutes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
