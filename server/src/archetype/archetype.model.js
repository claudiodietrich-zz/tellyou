const mongoose = require('mongoose')

const archetypeSchema = new mongoose.Schema({
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
  character: {
    type: String,
    required: true,
    trim: true,
    default: ''
  },
  required: {
    type: Boolean,
    required: true,
    default: false
  }
})

const Archetype = mongoose.model('Archetype', archetypeSchema)

module.exports = {
  Archetype,
  archetypeSchema
}
