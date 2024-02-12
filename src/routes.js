const {
  addBooksHandler
  // getAllNotesHandler,
  // getNoteByIdHandler,
  // editNoteByHandler,
  // deleteNoteByIdHandler
} = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooksHandler
  }
  // {
  //   method: 'GET',
  //   path: '/books',
  //   handler: getAllNotesHandler
  // },
  // {
  //   method: 'GET',
  //   path: '/books/{id}',
  //   handler: getNoteByIdHandler
  // },
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
