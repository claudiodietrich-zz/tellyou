const Story = require('./story.model')
const { validationHandler } = require('../utils/validation')

module.exports.create = async function (req, res, next) {
  try {
    validationHandler(req)

    const { title, objective, keywords, authors, archetypes, stages } = req.body

    const story = await Story.create({ title, objective, keywords, authors, archetypes, stages })

    res.status(200).json(story)
  } catch (error) {
    next(error)
  }
}

module.exports.findAll = async function (req, res, next) {
  try {
    const stories = await Story.find({})

    res.status(200).json(stories)
  } catch (error) {
    next(error)
  }
}

module.exports.findById = async function (req, res, next) {
  try {
    validationHandler(req)

    const id = req.params.storyId

    const story = await Story.findById(id).populate('stages.events.author').populate('stages.events.comments.author')

    res.status(200).json(story)
  } catch (error) {
    next(error)
  }
}

module.exports.findAllByUser = async function (req, res, next) {
  try {
    validationHandler(req)

    const userId = req.params.userId

    const stories = await Story.find({
      'authors.user': {
        $eq: userId
      }
    })

    res.status(200).json(stories)
  } catch (error) {
    next(error)
  }
}

exports.creteEvent = async function (req, res, next) {
  try {
    const storyId = req.params.storyId
    const stageId = req.params.stageId
    const event = req.body.event

    const story = await Story.findById(storyId)

    story.stages.forEach(stage => {
      if (stage.id === stageId) {
        const lastEvent = stage.events[stage.events.length - 1]
        const eventNumber = lastEvent !== undefined ? lastEvent.number + 1 : 1

        event.number = eventNumber

        stage.events.push(event)
      }
    })

    await story.save()

    await story.populate('stages.events.author').populate('stages.events.comments.author').execPopulate()

    res.status(200).json(story)
  } catch (error) {
    next(error)
  }
}

exports.updateEvents = async function (req, res, next) {
  try {
    const storyId = req.params.storyId
    const stageId = req.params.stageId
    const events = req.body.events

    const story = await Story.findById(storyId)

    story.stages.forEach(stage => {
      if (stage.id === stageId) {
        stage.events = events
        updateEventsNumbers(stage)
      }
    })

    await story.save()

    await story.populate('stages.events.author').populate('stages.events.comments.author').execPopulate()

    res.status(200).json(story)
  } catch (error) {
    next(error)
  }
}

exports.updateEvent = async function (req, res, next) {
  console.log('updateEvent')
  try {
    const { storyId, stageId } = req.params
    const event = req.body.event

    const story = await Story.findById(storyId)

    story.stages.forEach(stage => {
      if (stage.id === stageId) {
        const eventIndex = stage.events.map(event => { return event.id }).indexOf(event._id)
        stage.events.splice(eventIndex, 1)
        stage.events.splice(eventIndex, 0, event)
        updateEventsNumbers(stage)
      }
    })

    await story.save()

    await story.populate('stages.events.author').populate('stages.events.comments.author').execPopulate()

    res.status(200).json(story)
  } catch (error) {
    next(error)
  }
}

exports.deleteEvent = async function (req, res, next) {
  try {
    const { storyId, stageId, eventId } = req.params

    const story = await Story.findById(storyId)

    story.stages.forEach(stage => {
      if (stage.id === stageId) {
        stage.events = stage.events.filter(event => {
          return event.id !== eventId
        })
        updateEventsNumbers(stage)
      }
    })

    await story.save()

    await story.populate('stages.events.author').populate('stages.events.comments.author').execPopulate()

    res.status(200).json(story)
  } catch (error) {
    next(error)
  }
}

function updateEventsNumbers (stage) {
  stage.events.forEach((event, index) => {
    event.number = index + 1
  })
}

exports.creteComment = async function (req, res, next) {
  try {
    const { storyId, stageId, eventId } = req.params
    const comment = req.body.comment

    const story = await Story.findById(storyId)

    story.stages.forEach(stage => {
      if (stage.id === stageId) {
        stage.events.forEach(event => {
          if (event.id === eventId) {
            comment.dateCreated = new Date()

            event.comments.push(comment)
          }
        })
      }
    })

    await story.save()

    await story.populate('stages.events.author').populate('stages.events.comments.author').execPopulate()

    res.status(200).json(story)
  } catch (error) {
    next(error)
  }
}
