const { Stage } = require('./stage.model')

exports.findAll = async function (req, res, next) {
  try {
    const stages = await Stage.find({})

    res.status(200).json(stages)
  } catch (error) {
    next(error)
  }
}
