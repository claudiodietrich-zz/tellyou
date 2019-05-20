const { Archetype } = require('./archetype.model')

exports.findAll = async function (req, res, next) {
  try {
    const archetypes = await Archetype.find({ })

    res.status(200).json(archetypes)
  } catch (error) {
    next(error)
  }
}
