const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const track = new Schema({
  email: {
    type: String
  },
  playlist: [{
    title: {
      type: String
    },
    image: {
      type: String
    },
    link: {
      type: String
    }
  }]
});

module.exports = mongoose.model('Track', track);
