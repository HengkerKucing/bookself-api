const {
  addBooksHandler,
  getAllBooksHandler,
  getBookByIdHandler
  // getNoteByIdHandler,
  // editNoteByHandler,
  // deleteNoteByIdHandler
} = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooksHandler
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler
  }
  // {
  //   method: 'PUT',
  //   path: '/books/{id}',
  //   handler: editNoteByHandler
  // },
  // {
  //   method: 'DELETE',
  //   path: '/books/{id}',
  //   handler: deleteNoteByIdHandler
  // }
]

module.exports = routes
