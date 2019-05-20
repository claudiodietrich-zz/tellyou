const mongoose = require('mongoose')
const storyEnums = require('./story.enum')
const { archetypeSchema } = require('../archetype/archetype.model')
const { stageSchema } = require('../stage/stage.model')

const Schema = mongoose.Schema

const storySchema = new mongoose.Schema({
  status: {
    type: Number,
    require: true,
    default: storyEnums.STATUS.created,
    validate: {
      validator: function (status) {
        return storyEnums.ALL_STATUS.includes(status)
      }
    }
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  objective: {
    type: String,
    trim: true
  },
  keywords: [{
    type: String,
    trim: true
  }],
  authors: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true
    },
    role: {
      type: Number,
      require: true,
      validate: {
        validator: function (role) {
          return storyEnums.ALL_AUTORS_ROLES.includes(role)
        }
      }
    }
  }],
  archetypes: [
    archetypeSchema
  ],
  stages: [
    stageSchema
  ]
})

const Story = mongoose.model('Story', storySchema)

module.exports = Story
