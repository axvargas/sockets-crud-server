const Band = require('./band')

class BandList {
  constructor() {
    this.bands = [
      new Band('The Beatles'),
      new Band('The Rolling Stones'),
      new Band('The Who'),
      new Band('The Doors'),
    ];
  }

  getBands() {
    return this.bands
  }

  addBand(band) {
    const newBand = new Band(band.name)
    this.bands.push(newBand)
  }

  removeBand(id) {
    this.bands = this.bands.filter(b => b.id !== id)
  }

  changeName(id, name) {
    this.bands = this.bands.map(b => b.id === id ? { ...b, name } : b)
  }

  vote(id, delta) {
    this.bands = this.bands.map(b => b.id === id ? { ...b, votes: b.votes+=delta } : b)
  }

}

module.exports = BandList;