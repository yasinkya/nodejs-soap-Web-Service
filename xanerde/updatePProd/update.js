'use strict'


var fs = require('fs');
var soap= require('soap');
var mysql= require('mysql');
var express=require('express');
const getdata =require('./procedure');
const bodyParser = require('body-parser');
var xml = fs.readFileSync('update.wsdl', 'utf8');
const app = express();
app.use(bodyParser.json());

// **************************************** GET LISTUSER ********************************************
/*
app.get('/listUser', function (req, res) {
    getdata
        .updateCol('server','server','9999',1)
            .then((rows)=>{
                console.log(rows[0].affectedRows);
            })
})
*/

// ****************************************************** UPDATE FUNC******************************************
// args - packingName,packingDesc,packingPrice,packingId
async function update_func(args){

    console.log("\nVeri Güncelleniyor..");

    let result;
    await getdata
            .updateCol(args.packingName,args.packingDesc,args.packingPrice,args.packingId)
                .then((rows)=>{
                    result=rows[0].affectedRows  
                    console.log( result)
                })
                .catch((err) => { 
                    console.log( err); throw err })
    
    //console.log(result=1? "Success":"error")
     return{
        result:result
    }
}


// ******************************* CALL SERVICE **********************************
var serviceObject = {
    UpdateService: {
        UpdateSoapPort: {
            Update: update_func
          },
          UpdateServiceSoap12Port: {
            Update: update_func
          }
      }
};


// ************************************ LISTEN **********************************************
var port = 8000;
app.listen(port, function () {
    console.log("\n***********************************************************************")
    console.log('Listening on port  ->>  ' + port);
    var wsdl_path = "/wsdl";
    soap.listen(app, wsdl_path, serviceObject, xml);
    console.log("Check WSDL to see if the service is working  ->>   http://localhost:" + port + wsdl_path +"?wsdl ");
    console.log('Server running on (GET,POST)  -> http://localhost:8000')
});
