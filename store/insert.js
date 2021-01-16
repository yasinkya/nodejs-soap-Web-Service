const knex = require('knex')(require('./dbKnex'))

module.exports = {
  createUser ({ username, pass }) {
    console.log(`Add user ${username} with password ${pass}`)
    return knex('userc').insert({
      username,
      pass
    })
  }
}
