const db = require('./dbknex');
var con = db.connection.connect;

var data=[];

var qr = "select * from userc"
    con.query(qr, function(err,res){
    if(err)
        throw err;
    for(var i=0; i<res.length;i++){
        data.push(res[i])
    }
})
   console.log(data)