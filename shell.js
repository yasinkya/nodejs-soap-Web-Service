/*
function exec(cmd, cb){
    var child_process = require('child_process');
    var parts = cmd.split(/\s+/g);
    var p = child_process.spawn(parts[0], parts.slice(1), {stdio: 'inherit'});
    p.on('exit', function(code){
        var err = null;
        if (code) {
            err = new Error('command "'+ cmd +'" exited with wrong status code "'+ code +'"');
            err.code = code;
            err.cmd = cmd;
        }
        if (cb) cb(err);
    });
}
exec('cd Desktop', function(err){
    console.log("Executed...")
    });
    */

var cmd =require('node-cmd');

cmd.run('cd "Desktop/soa proje"');
cmd.run('node service.js')
console.log("runing")
cmd.run('node add.js')
console.log("running")
