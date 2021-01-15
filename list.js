'use strict'
var soap= require('soap');
var express=require('express');
var fs = require('fs');
var mysql= require('mysql');

var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'0000',
    database:'ptod'
});

var userDatas=[];
var qr = "select * from userc"
    con.query(qr, function(err,res){
    if(err)
        throw err;
    for(var i=0; i<res.length;i++){
        userDatas.push(res[i])
    }
})
    
async function dbAct(){
    try{
        var qr = "select * from userc"
            con.query(qr, function(err,res){
            for(var i=0; i<res.length;i++){
                userDatas.push(res[i])
            }
            console.log(userDatas);
        })
    }
    catch(err){
        throw err;
    }
}

dbAct();
console.log(userDatas);

function vericek_func(){

    console.log("vericek");
    var result;

    
    
    result = JSON.stringify(userDatas);
    //result=JSON.parse(result);
    return {
        result:result
    }
    
}

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

var xml = fs.readFileSync('list.wsdl', 'utf8');
var app = express();

app.get('/', function (req, res) {
    res.send('Node Soap Example!<br /><a href="https://github.com/macogala/node-soap-example#readme">Git README</a>');
})



app.get('/listUser', function (req, res) {
    var result=[];
    var qr = "select * from userc"
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
 })

var port = 8000;
app.listen(port, function () {
  console.log('Listening on port ' + port);
  var wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log("Check http://localhost:" + port + wsdl_path +"?wsdl to see if the service is working");
});
