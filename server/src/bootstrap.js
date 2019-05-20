const { Archetype } = require('./archetype/archetype.model')
const { archetypesSeed } = require('./archetype/archetype.seed')

const createArchetypes = async () => {
  try {
    const archetypes = await Archetype.find({})

    if (archetypes.length === 0) {
      await Archetype.insertMany(archetypesSeed)
    }
  } catch (error) {
    throw new Error(error)
  }
}

exports.bootstrap = async () => {
  await createArchetypes()
}
