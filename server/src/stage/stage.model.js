const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateCreated: {
    type: Date,
    required: true
  },
  body: {
    type: String,
    required: true,
    trim: true
  },
  readBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }]
})

const eventSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    type: String,
    required: true,
    trim: true
  },
  comments: [commentSchema]
})

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
  },
  events: [eventSchema]
})

const Stage = mongoose.model('Stage', stageSchema)

module.exports = {
  Stage,
  stageSchema
}
