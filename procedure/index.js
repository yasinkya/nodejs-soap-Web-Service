'use strict'


var fs = require('fs');
var soap= require('soap');
var mysql= require('mysql');
var express=require('express');
const getdata =require('./procedure');
const bodyParser = require('body-parser');
//var xml = fs.readFileSync('list.wsdl', 'utf8');
const app = express();
app.use(bodyParser.json());

// **************************************** GET LISTUSER ********************************************
app.get('/listUser', function (req, res) {
    getdata
        .listTable()
            .then((rows)=>{
                console.log(rows[0][0])
                res.end(JSON.stringify(rows[0][0]))
            })
})
/*
async function vericek_func(){

    console.log("\nVeri Çekiliyor..");
    var userDatas;
    let result;

    await getdata
            .listTable()
                .then((rows)=>{
                    userDatas=JSON.stringify(rows)
                    result=userDatas  
                })
                .catch((err) => { 
                    console.log( err); throw err })

    console.log("out finalyy")
    
    console.log(result)
     return{
        result:result
    }
}


// ******************************* CALL SERVICE **********************************
var serviceObject = {
    VeriCekService: {
        VeriCekServiceSoapPort: {
            VeriCek: vericek_func
          },
          VeriCekServiceSoap12Port: {
            VeriCek: vericek_func
          }
      }
};

*/
// ************************************ LISTEN **********************************************
var port = 8000;
app.listen(port, function () {
    console.log("\n***********************************************************************")
    console.log('Listening on port  ->>  ' + port);
    //var wsdl_path = "/wsdl";
    //soap.listen(app, wsdl_path, serviceObject, xml);
    //console.log("Check WSDL to see if the service is working  ->>   http://localhost:" + port + wsdl_path +"?wsdl ");
    console.log('Server running on (GET,POST)  -> http://localhost:8000')
});
