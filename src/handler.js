const { nanoid } = require('nanoid')
const books = require('./books')

const addBooksHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading, finished } = request.payload

  const id = nanoid(16)
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, createdAt, updatedAt
  }

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  books.push(newBook)
  const isSuccess = books.filter((books) => books.id === id).length > 0

  if (isSuccess) {
    const response = h.response(
      {
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id
        }
      }
    )
    response.code(201)
    return response
  }
}
// const getAllNotesHandler = () => ({
//   status: 'success',
//   data: {
//     books
//   }
// })

// const getNoteByIdHandler = (request, h) => {
//   const { id } = request.params

//   const note = books.filter((n) => n.id === id)[0]

//   if (note !== undefined) {
//     return {
//       status: 'success',
//       data: {
//         note
//       }
//     }
//   }
//   const response = h.response({
//     status: 'fail',
//     message: 'Catatan tidak ditemukan'
//   })
//   response.code(404)
//   return response
// }

// const editNoteByHandler = (request, h) => {
//   const { id } = request.params

//   const { name, year, author } = request.payload

//   const updatedAt = new Date().toISOString()
//   const index = books.findIndex((note) => note.id === id)

//   if (index !== -1) {
//     books[index] = {
//       ...books[index],
//       name,
// year     author,
//       body,
//       updatedAt
//     }
//     const response = h.response({
//       status: 'success',
//       message: 'Catatan berhasil diperbarui'
//     })
//     response.code(200)
//     return response
//   }
//   const response = h.response({
//     status: 'fail',
//     message: 'Catatan gagal diperbarui'
//   })
//   response.code(404)
//   return response
// }

// const deleteNoteByIdHandler = (request, h) => {
//   const { id } = request.params

//   const index = books.findIndex((note) => note.id === id)

//   if (index !== -1) {
//     books.splice(index, 1)
//     const response = h.response({
//       status: 'success',
//       message: 'Catatan berhasil dihapus'
//     })
//     response.code(200)
//     return response
//   }

//   const response = h.response({
//     status: 'fail',
//     message: 'Catatan gagal dihapus. Id tidak ditemukan'
//   })
//   response.code(404)
//   return response
// }

module.exports = {
  addBooksHandler
  // getAllNotesHandler,
  // getNoteByIdHandler,
  // editNoteByHandler,
  // deleteNoteByIdHandler
}
