const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')
const cors = require('cors')
const Sockets = require('./sockets')

class Server {
  constructor() {
    // * Express Server
    this.app = express()
    this.port = process.env.PORT || 8081

    // * HHTP server
    this.server = http.createServer(this.app)

    // * Socket.io config
    this.io = socketio(this.server, {cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }})
  }

  middelwares() {
    // * Deploy public directory
    this.app.use(express.static( path.resolve(__dirname, '../public')))
    this.app.use(cors())
  }

  configSockets() {
    // * Configure socket.io
    new Sockets(this.io)
  }
  execute() {
    // * Init middlewares
    this.middelwares()

    // * Init sockets
    this.configSockets()

    // * Init server
    this.server.listen(this.port, () => {
      console.log('Server listening on port ' + this.port)
    })
  }
}

module.exports = Server