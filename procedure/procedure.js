const knex = require('knex')(require('./dbKnex'))

module.exports = {
  listTable(){
    console.log("Listing Table With Procedure");
    return knex.raw('call listS();')
  }
}
/*
knex.raw('call listS();').then((rows)=>{
  console.log(rows[0][0])
})*/
