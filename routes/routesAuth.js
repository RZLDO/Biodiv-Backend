const [loginHandler, registerHandler, indexHandler] = require('../handler/authHandler');
const AuthRoutes = [
  {
    method: 'Post',
    path: '/api/register',
    handler: registerHandler,
  },
  {
    method: 'Post',
    path: '/api/login',
    handler: loginHandler,
  },
  {
    method: 'Get',
    path: '/',
    handler: indexHandler,
  },
];

module.exports = AuthRoutes;
