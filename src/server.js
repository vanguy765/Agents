import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { research } from './agent.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static('public'))

app.use(express.json()) // For parsing JSON request body

app.post('/api/research', async (req, res) => {
  const { name } = req.query

  if (!name) {
      return res.status(400).send('name is a required query parameter')
  }

  try {
      const result = await research(name)
      res.json(result)
  } catch (error) {
      res.status(500).send('Internal Server Error')
  }
})

io.on('connection', (socket) => {
  console.log('Client connected')

  socket.on('research', async(name, company) => {
    const nameAndCompany = `${name} from ${company}`
    const result = await research(name)
    socket.emit('showResult', result)
  })
})

const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})