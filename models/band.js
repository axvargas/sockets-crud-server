const {v4: uuidv4} = require('uuid');

class BandName{
  constructor(name){
    this.id = uuidv4();
    this.name = name;
    this.votes = 0;
  }
}

module.exports = BandName;