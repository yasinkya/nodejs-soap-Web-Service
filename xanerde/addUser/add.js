'use strict'

var soap= require('soap');
var fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const store = require('./insert');
const database = require('./databaseCon');
const app = express();
var xml = fs.readFileSync('add.wsdl', 'utf8');
app.use(express.static('public'));
app.use(bodyParser.json());


// ****************************************** Post *******************************************
app.post('/createUser', (req, res) => {
  store
    .createUser({
      idCustomer:req.body.idCustomer,
      CustomerMail:req.body.CustomerMail,
      CustomerPassword:req.body.CustomerPassword
    })
    .then(() => res.sendStatus(200));
});


// **************************************** GET listUser *********************************************
app.get('/listUser', function (req, res) {
  var qr = "select * from customer"
  var result=[];
  database
    .query(qr,function(req, data){
      for(var i=0;i< data.length;i++){
        result.push(data[i]);
      }
      res.end(JSON.stringify(result));
    });
});


// *********************************SERVİCE FUNC ****************************************** 
function veriekle_func(args){
  console.log(args.idCustomer+" "+args.CustomerMail+" "+args.CustomerPassword +" adding..");

  var qr= "insert into `customer` (`idCustomer`,`CustomerMail`,`CustomerPassword`) values ('"+args.idCustomer+"',"+"'"+args.CustomerMail+"','"+args.CustomerPassword+"')";
  database.query(qr,function(err,res){
      if(err) throw err;
      console.log("Succesfuly");  
  })
  var result="New user added..";
  return{
      result:result
  }
}

// ************************ CALL SERVİCE ********************************************************
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


// ********************************** LISTEN ****************************************************
var port = 8001;
app.listen(port,  () =>{
  console.log("\n*******************************************************************************")
  console.log('Listening on port ' + port);
  var wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log('Server running on (GET,POST)  -> http://localhost:8001')
  console.log("Check WSDL to see if the service is working  -> http://localhost:" + port + wsdl_path +"?wsdl");
});
