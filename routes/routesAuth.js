const [loginHandler, registerHandler, indexHandler] = require('../handler/authHandler');
const getTotalData = require('../handler/allData');
const authMiddleware = require('../middleware/authMiddleware');
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
  {
    method: 'GET',
    path: '/api/totalData',
    handler: getTotalData,
    options: {
      pre: [
        {
          method: authMiddleware,
          assign: 'verifyToken',
        },
      ],
    },
  },
];

module.exports = AuthRoutes;
