const { nanoid } = require('nanoid')
const books = require('./books')

const addBooksHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage } = request.payload

  const id = nanoid(16)
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

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
  const isReading = (readPage, pageCount) => {
    if (readPage > 0) {
      return true
    } else if (readPage === pageCount) {
      return false
    } else {
      return false
    }
  }
  const reading = isReading(readPage)

  const isFinished = (pageCount, readPage) => {
    if (pageCount === readPage) {
      return true
    } else {
      return false
    }
  }
  const finished = isFinished(pageCount, readPage)

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
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
  const { id } = request.params
  // const { reading } = request.query
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

  const book = books.filter((n) => n.id === id)[0]

  if (book) {
    const response = h.response(
      {
        status: 'success',
        data: {
          book
        }
      }
    )
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
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
