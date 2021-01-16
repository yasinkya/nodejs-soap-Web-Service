const knex = require('knex')(require('./dbKnex'))

module.exports = {
  listTable(){
    console.log("Listing Table With Knex");
    return knex.from('userc').select("*");
  }
}
