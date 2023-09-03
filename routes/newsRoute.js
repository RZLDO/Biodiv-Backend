const [getNews, addNews, deleteNews] = require('../handler/newsHandler');

const NewsRoute = [
  {
    method: 'GET',
    path: '/api/news',
    handler: getNews,
  },
  {
    method: 'POST',
    path: '/api/news',
    handler: addNews,
    options: {
      payload: {
        parse: true,
        allow: 'multipart/form-data',
        multipart: { output: 'stream' },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/api/news/{id_berita}',
    handler: deleteNews,
  },
];

module.exports = NewsRoute;
