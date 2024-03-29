// luqman Aldi Prawiratama
// 19/02/2024

const Hapi = require('@hapi/hapi')
const routes = require('./routes')

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    // host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  server.route(routes)

  await server.start()
  console.log(`server berjalan pada ${server.info.uri}`)
}

init()
