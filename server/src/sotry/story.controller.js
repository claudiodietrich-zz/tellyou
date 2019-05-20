const Story = require('./story.model')
const { validationHandler } = require('../utils/validation')

module.exports.create = async function (req, res, next) {
  try {
    validationHandler(req)

    const { title, objective, keywords, authors, archetypes } = req.body

    const story = await Story.create({ title, objective, keywords, authors, archetypes })

    res.status(200).json(story)
  } catch (error) {
    next(error)
  }
}
