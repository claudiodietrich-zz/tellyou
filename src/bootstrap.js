const { Archetype } = require('./archetype/archetype.model')
const { archetypesSeed } = require('./archetype/archetype.seed')
const { Stage } = require('./stage/stage.model')
const stagesSeed = require('./stage/stage.seed')
const User = require('./user/user.model')
const usersSeed = require('./user/user.seed')

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

const createStages = async () => {
  try {
    const stages = await Stage.find({})

    if (stages.length === 0) {
      await Stage.insertMany(stagesSeed)
    }
  } catch (error) {
    throw new Error(error)
  }
}

const createUsers = async () => {
  try {
    const users = await User.find({})

    if (users.length === 0) {
      await User.insertMany(usersSeed)
    }
  } catch (error) {
    throw new Error(error)
  }
}

exports.bootstrap = async () => {
  await createArchetypes()
  await createStages()
  await createUsers()
}
