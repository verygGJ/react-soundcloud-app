const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const track = new Schema({
  email: {
    type: String
  },
  playlist: [
    {
      id: {
        type: Number
      },
      title: {
        type: String
      },
      artwork_url: {
        type: String
      },
      stream_url: {
        type: String
      }
    }
  ]
});

module.exports = mongoose.model('Track', track);
