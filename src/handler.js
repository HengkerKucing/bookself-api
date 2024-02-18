const { nanoid } = require('nanoid')
const books = require('./books')

const addBooksHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

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

const editBookByHandler = (request, h) => {
  const { id } = request.params
  const { name, pageCount, readPage } = request.payload

  const bookId = books.filter((n) => n.id === id)[0]

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  if (bookId) {
    const response = h.response(
      {
        status: 'success',
        message: 'Buku berhasil diperbarui',
        data: {
          books
        }
      }
    )
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

// const deleteBookByIdHandler = (request, h) => {
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
  getBookByIdHandler,
  editBookByHandler
  // deleteBookByIdHandler
}
