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

const getAllBooksHandler = (request, h) => {
  // const nameQuery = new RegExp(request.query.name, 'i')
  // const { reading, finished } = request.query

  // if (reading) {
  //   const response = h.response({
  //     status: 'success',
  //     data: {
  //       books: books
  //         .filter((book) => book.reading === reading)
  //         .map((book) => ({
  //           id: book.id,
  //           name: book.name,
  //           publisher: book.publisher
  //         }))
  //     }
  //   })
  //   response.code(200)
  //   return response
  // }

  // if (finished) {
  //   const response = h.response({
  //     status: 'success',
  //     data: {
  //       books: books
  //         .filter((book) => book.finished === finished)
  //         .map((book) => ({
  //           id: book.id,
  //           name: book.name,
  //           publisher: book.publisher
  //         }))
  //     }
  //   })
  //   response.code(200)
  //   return response
  // }

  // if (nameQuery) {
  //   const response = h.response({
  //     status: 'success',
  //     data: {
  //       books: books
  //         .filter((book) => nameQuery.test(book.name))
  //         .map((book) => ({
  //           id: book.id,
  //           name: book.name,
  //           publisher: book.publisher
  //         }))
  //     }
  //   })

  //   response.code(200)
  //   return response
  // }
  const { id } = request.params
  const isSuccess = books.filter((books) => books.id === id).length = 2

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      data: {
        books: books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }))
      }
    })
    response.code(200)
    return response
  }
}

const getBookByIdHandler = (request, h) => {
  const { id } = request.params

  const note = books.filter((n) => n.id === id)[0]

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note
      }
    }
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan'
  })
  response.code(404)
  return response
}

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
  addBooksHandler,
  getAllBooksHandler,
  getBookByIdHandler
  // editNoteByHandler,
  // deleteNoteByIdHandler
}
