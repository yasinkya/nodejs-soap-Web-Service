const knex = require('knex')(require('./dbKnex'))

module.exports = {
  deleteCol(PackingListID){
    console.log("Deleting Column With Procedure");
    return knex.raw("call sp_Del("+PackingListID+");")
  }
}
/*
call sp_delete('deneme','deneme','3000',1);'
*/
/*
knex.raw("call sp_delete('node','','3000',1);").then((rows)=>{
  console.log(rows[0].affectedRows)
})*/