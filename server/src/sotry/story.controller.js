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

    const stories = await Story.findById(id)

    res.status(200).json(stories)
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
