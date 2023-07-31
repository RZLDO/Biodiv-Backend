const [loginHandler, registerHandler, indexHandler, changePasswordHandler, changeUsernameHandler] = require('../handler/authHandler');
const [getTotalData, getUnverifiedData, searching, getUserData, getSpreadAnimal] = require('../handler/allData');
const authMiddleware = require('../middleware/authMiddleware');
const AuthRoutes = [
  {
    method: 'PUT',
    path: '/api/users/username/{id_user}',
    handler: changeUsernameHandler,
  },
  {
    method: 'PUT',
    path: '/api/users/password/{id_user}',
    handler: changePasswordHandler,
  },
  {
    method: 'GET',
    path: '/api/lokasi/{id_spesies}',
    handler: getSpreadAnimal,
  },
  {
    method: 'GET',
    path: '/api/profile/{id_user}',
    handler: getUserData,
  },
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
    method: 'GET',
    path: '/api/search/{searching}',
    handler: searching,
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
  {
    method: 'GET',
    path: '/api/unverified',
    handler: getUnverifiedData,
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
