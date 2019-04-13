const STATUS = {
  created: 0,
  inReview: 1,
  revised: 2,
  finished: 3
}
Object.freeze(STATUS)

const ALL_STATUS = Object.values(STATUS)
Object.freeze(ALL_STATUS)

const AUTORS_ROLES = {
  leader: 0,
  reviewer: 1,
  storyteller: 2
}
Object.freeze(AUTORS_ROLES)

const ALL_AUTORS_ROLES = Object.values(AUTORS_ROLES)
Object.freeze(ALL_AUTORS_ROLES)

module.exports = {
  STATUS,
  ALL_STATUS,
  AUTORS_ROLES,
  ALL_AUTORS_ROLES
}
