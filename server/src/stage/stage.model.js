const mongoose = require('mongoose')

const stageSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  context: [
    {
      type: String,
      required: true,
      trim: true,
      default: ''
    }
  ],
  keyPhrases: [
    {
      type: String,
      required: true,
      trim: true,
      default: ''
    }
  ],
  required: {
    type: Boolean,
    required: true,
    default: false
  }
})

const Stage = mongoose.model('Stage', stageSchema)

module.exports = {
  Stage,
  stageSchema
}
