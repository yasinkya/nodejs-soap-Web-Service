const knex = require('knex')(require('./dbKnex'))

module.exports = {
  createUser ({ idCustomer,CustomerMail, CustomerPassword }) {
    console.log(`\nAdd user ${idCustomer}, with password ${CustomerPassword}`)
    return knex('customer').insert({
      idCustomer,
      CustomerMail,
      CustomerPassword
    })
  }
}
