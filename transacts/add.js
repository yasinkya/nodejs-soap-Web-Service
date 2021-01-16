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


function veriekle_func(args){
    console.log(args.username+" "+args.pass +" adding..");
    //INSERT INTO `userc`(`username`,`pass`)
//VALUES('müge','0000');
    var qr= "insert into `userc` (`username`,`pass`) values ('"+args.username+"','"+args.pass+"')";
    con.query(qr,function(err,res){
        if(err) throw err;
        console.log("Succesfuly");  
    })
    var result="New user added..";
    return{
        result:result
    }
    /* 
    var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  
    var result;
    result = "returned"

    return {
        result:result
    }  */
}

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

var app = express();
var xml = fs.readFileSync('add.wsdl', 'utf8');

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

var port = 8001;
app.listen(port, function () {
  console.log('Listening on port ' + port);
  var wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log("Check http://localhost:" + port + wsdl_path +"?wsdl to see if the service is working");
});
