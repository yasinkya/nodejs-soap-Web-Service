'use strict'

var mysql= require('mysql');
/*
var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'0000',
    database:'ptod'
});
let qr = "select * from userc"

let data;

let getdatas = function(callback){
    return con.execute(qr);
}

let pls = getdatas();
console.log(pls);

*/
/*
async function getdb() {

    let error = null;

    const sql = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '0000',
        database: 'ptod'
    });
    sql.on('error', function (err) {
        error = err;
        console.log('ERROR => ' + err);
    });
    await sql.connect();
    console.log("in flnc")
    try {
        const query = "SELECT * FROM userc";
        const rows = await sql.query(query);
        //console.log(rows)
        return rows;
    } catch (err) {
        console.log('ERROR => ' + err);
        return err;
    } finally {
        sql.end();
    }
}

getdb();
*/

const Mysql = require('mysql2/promise');

const sql = Mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'ptod',
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

// getting tx pending list from db
async function getTxPendingList() {
    const rows=[];
    try {
        const query = "SELECT * FROM userc";
         rows = await sql.query(query);
        //return rows[0];
    } catch (err) {
        console.log('ERROR => ' + err);
        return err;
    }
    return rows;
}


let ytr=async function(){
    getTxPendingList()
        .then(function(value){
            //console.log(value)
        })
}
ytr();

//let data = getTxPendingList().then(function(value){})
var data =  getTxPendingList();
console.log(data)
