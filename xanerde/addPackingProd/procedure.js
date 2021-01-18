const knex = require('knex')(require('./dbKnex'))

module.exports = {
  addPackingProd ({ PackingListID, PackingProductsID, PackingName, PackingPrice, PackingDetails }) {
    console.log(`\nAdd Packing ${PackingName}, with Id ${PackingProductsID}`)
    return knex.raw("call sp_Add('"+PackingListID+"','"+PackingProductsID+"','"+PackingName+"','"+PackingPrice+"','"+PackingDetails+"');")
    
  }
}

/*
knex.raw("call sp_Add('1','11','knex','5555','detay');").then((rows)=>{
  console.log(rows[0].affectedRows)
})*/