const Story = require('./story.model')
const { validationHandler } = require('../utils/validation')

module.exports.create = async function (req, res, next) {
  try {
    validationHandler(req)

    const { title, objective, keywords, authors } = req.body

    const story = await Story.create({ title, objective, keywords, authors })

    res.status(200).json(story)
  } catch (error) {
    next(error)
  }
}
