const knex = require('knex')(require('./dbKnex'))

module.exports = {
  updateCol(packingName,packingDesc,packingPrice,packingId){
    console.log("Listing Table With Procedure");
    return knex.raw("call sp_Update('"+packingName+"','"+packingDesc+"','"+packingPrice+"',"+packingId+");")
  }
}
/*
call sp_Update('deneme','deneme','3000',1);'
*/
/*
knex.raw("call sp_Update('node','','3000',1);").then((rows)=>{
  console.log(rows[0].affectedRows)
})*/