'use strict'


var fs = require('fs');
var soap= require('soap');
var mysql= require('mysql');
var express=require('express');
const getdata =require('./select');
const bodyParser = require('body-parser');
var xml = fs.readFileSync('list.wsdl', 'utf8');
const app = express();
app.use(bodyParser.json());

// **************************************** GET LISTUSER ********************************************
app.get('/listUser', function (req, res) {
    getdata
        .listTable()
            .then((rows)=>{
                res.end(JSON.stringify(rows))
            })
})


function vericek_func(){

    console.log("\nVeri Çekiliyor..");
    var userDatas=[];
    var result;

    await getdata
            .listTable()
                .then((rows)=>{
                    userDatas.push(rows)
                    result = JSON.stringify(userDatas);
                    //console.log(result)
                    
                    
                })
                .catch((err) => { 
                    console.log( err); throw err })
                .finally(() => {
                    console.log("in finalyy")
                    console.log(result)
                    return{
                        result:result
                    }
                    getdata.destroy();
                    console.log(userDatas)
                });
      
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


// ************************************ LISTEN **********************************************
var port = 8000;
app.listen(port, function () {
    console.log("\n***********************************************************************")
    console.log('Listening on port  ->>  ' + port);
    var wsdl_path = "/wsdl";
    soap.listen(app, wsdl_path, serviceObject, xml);
    console.log("Check WSDL to see if the service is working  ->>   http://localhost:" + port + wsdl_path +"?wsdl ");

});
