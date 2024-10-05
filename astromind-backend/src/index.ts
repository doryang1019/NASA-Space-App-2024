import 'reflect-metadata'
import * as helmet from 'helmet'
import * as express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
import * as http from 'http'
import { AppRoutes } from './routes'
import * as cors from 'cors'
import { initializeDatabase } from './db'

const PORT = process.env.APP_PORT

const app = express()

app.use(cors())
app.use(express.json())

AppRoutes.forEach((route) => {
  app[route.method](
    route.path,
    ...route.middlewares,
  )
})
const startServer = async () => {
  try {
    await initializeDatabase()
    http.createServer(app).listen(PORT, () => {
      console.info('Listening on port: ' + PORT + '.', { tag: 'astromind-backend' })
    })
  } catch (error) {
    console.error('Error starting server', error, { tag: 'astromind-backend' })
    process.exit(1)
  }
}

startServer()
