const BandList = require('./band-list')

class Sockets {
  constructor(io) {
    this.io = io
    this.bandList = new BandList()
    this.socketEvents()
  }

  socketEvents() {
    // * On connection
    this.io.on('connection', (socket) => {
      console.log('User connected')

      // * Emit all bands when user connects
      socket.emit('current-bands', this.bandList.getBands())

      // * On add band
      socket.on('add-band', (name) => {
        this.bandList.addBand(name)
        this.io.emit('current-bands', this.bandList.getBands())
      })

      // * On vote to band
      socket.on('vote', (data) => {
        console.log('Vote received')
        this.bandList.vote(data.id, data.delta)
        this.io.emit('current-bands', this.bandList.getBands())
      })

      // * On delete band
      socket.on('delete-band', (data) => {
        console.log('Delete band received')
        this.bandList.removeBand(data.id)
        this.io.emit('current-bands', this.bandList.getBands())
      })

      // * On band name change
      socket.on('change-band-name', (data) => {
        console.log('Change band name received')
        this.bandList.changeName(data.id, data.name)
        this.io.emit('current-bands', this.bandList.getBands())
      })
      
      // * On Cliente disconnect
      socket.on('disconnect', () => {
        console.log('user disconnected')
      })   
    })
    
  
  }
}
module.exports = Sockets