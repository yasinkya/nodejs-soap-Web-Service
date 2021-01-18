'use strict'


var fs = require('fs');
var soap= require('soap');
var mysql= require('mysql');
var express=require('express');
const getdata =require('./procedure');
const bodyParser = require('body-parser');
var xml = fs.readFileSync('AddPPlist.wsdl', 'utf8');
const app = express();
app.use(bodyParser.json());

// **************************************** GET LISTUSER ********************************************
/*
app.get('/listUser', function (req, res) {
    getdata
        .AddPPlistCol('server','server','9999',1)
            .then((rows)=>{
                console.log(rows[0].affectedRows);
            })
})
*/

// ****************************************************** Add FUNC******************************************
// args - PackingListID, PackingProductsID, PackingName, PackingPrice, PackingDetails
async function addPPlist_func(args){

    console.log("\nVeri Ekleniyor..");

    let result;
    await getdata
            .addPackingProd(args.PackingListID,args.PackingProductsID,args.PackingName,args.PackingPrice,args.PackingDetails)
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
    AddPPlistService: {
        AddPPlistSoapPort: {
            AddPPlist: addPPlist_func
          },
          AddPPlistSoap12Port: {
            AddPPlist: addPPlist_func
          }
      }
};


// ************************************ LISTEN **********************************************
var port = 8004;
app.listen(port, function () {
    console.log("\n***********************************************************************")
    console.log('Listening on port  ->>  ' + port);
    var wsdl_path = "/wsdl";
    soap.listen(app, wsdl_path, serviceObject, xml);
    console.log("Check WSDL to see if the service is working  ->>   http://localhost:" + port + wsdl_path +"?wsdl ");
    console.log('Server running on (GET,POST)  -> http://localhost:8004')
});
