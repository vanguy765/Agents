import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { analyze } from '../agent.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static('public'))

io.on('connection', (socket) => {
  console.log('Client connected')

  socket.on('analyze', async(name, company) => {
    const result = await analyze(name, company)
    socket.emit('showResult', result)
  })
})

const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
