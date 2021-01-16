'use strict'
var soap= require('soap');
var fs = require('fs');
const express = require('express')
const bodyParser = require('body-parser')
const store = require('./insert')
const database = require('./databaseCon')
const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())


app.post('/createUser', (req, res) => {
  store
    .createUser({
      username: req.body.username,
      pass: req.body.pass
    })
    .then(() => res.sendStatus(200))
})
// **************************************** GET *********************************************
app.get('/listUser', function (req, res) {
  var qr = "select * from userc"
  var result=[];
  database
    .query(qr,function(req, data){
      for(var i=0;i< data.length;i++){
        result.push(data[i]);
      }
      res.end(JSON.stringify(result))
    })
    
  
  /*   editing
  var result=[];
  var qr = "select * from userc"
  var con = require('knex') (require('./dbKnex'))
  
  console.log(req.url);
  con.query(qr, function(req,data){
      for(var i=0;i< data.length;i++){
          result.push(data[i]);
      }
      result = JSON.stringify(result);
      
      var users= JSON.parse( result);
      console.log( users);
      res.end( JSON.stringify(users));
  })
  */
})



// *********************************SERVİCE FUNC ****************************************** 
function veriekle_func(args){
  console.log(args.username+" "+args.pass +" adding..");

  var qr= "insert into `userc` (`username`,`pass`) values ('"+args.username+"','"+args.pass+"')";
  database.query(qr,function(err,res){
      if(err) throw err;
      console.log("Succesfuly");  
  })
  var result="New user added..";
  return{
      result:result
  }
}

// ************************ SERVİCE ********************************************************

var serviceObject = {
  VeriEkleService: {
      VeriEkleServiceSoapPort: {
          VeriEkle: veriekle_func
        },
        VeriEkleServiceSoap12Port: {
          VeriEkle: veriekle_func
        }
    }
};


// ***************************************** Express **********************************************
//var app = express();
var xml = fs.readFileSync('add.wsdl', 'utf8');



// ********************************** LISTEN ****************************************************
/*
app.listen(8081, () => {
  console.log('Server running on http://localhost:8081')
})
*/
var port = 8001;
app.listen(port,  () =>{
  console.log('Listening on port ' + port);
  var wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log("Check http://localhost:" + port + wsdl_path +"?wsdl to see if the service is working");
  console.log('Server running on http://localhost:8081')
});
