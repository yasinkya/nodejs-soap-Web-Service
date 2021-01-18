'use strict'


var fs = require('fs');
var soap= require('soap');
var mysql= require('mysql');
var express=require('express');
const getdata =require('./procedure');
const bodyParser = require('body-parser');
var xml = fs.readFileSync('delete.wsdl', 'utf8');
const app = express();
app.use(bodyParser.json());

// **************************************** GET DELETE ********************************************
/*
app.get('/delete', function (req, res) {
    getdata
        .deleteCol(1)
            .then((rows)=>{
                console.log(rows[0].affectedRows);
            })
})
*/

// ****************************************************** DELETE FUNC******************************************
// args - PackingListID
async function delete_func(args){

    console.log("\nVeri Güncelleniyor..");

    let result;
    await getdata
            .deleteCol(args.PackingListID)
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
    DeleteService: {
        DeleteSoapPort: {
            Delete: delete_func
          },
          DeleteServiceSoap12Port: {
            Delete: delete_func
          }
      }
};


// ************************************ LISTEN **********************************************
var port = 8002;
app.listen(port, function () {
    console.log("\n***********************************************************************")
    console.log('Listening on port  ->>  ' + port);
    var wsdl_path = "/wsdl";
    soap.listen(app, wsdl_path, serviceObject, xml);
    console.log("Check WSDL to see if the service is working  ->>   http://localhost:" + port + wsdl_path +"?wsdl ");
    console.log('Server running on (GET,POST)  -> http://localhost:8002')
});
