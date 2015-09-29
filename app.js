var express = require('express');
var path = require('path');
var ejs = require('ejs');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var ioSocket;
var net = require('net-socket');
var lockFeedback = require('./server/lockFeedback');
var client;
var DEVICDID = '3d2eabda234f';

app.set('port',process.env.PORT || 5001);
app.set('views',__dirname+'/static');
app.engine('.html',require('ejs').__express);
app.set('view engine','html');
app.use(express.static(path.join(__dirname,'static')));

app.get('/',function(req,res){
	res.render('index');
});

app.get('/getdeviceid',function(req,res){
	var data = {
		status:'1',
		info:'success',
		data:DEVICDID
	}
	res.json(data);
});

app.get('/closelock',function(req,res){
	var lock_no = req.query.lock_no;
	var data = {
		station_no:DEVICDID,
		lock_no:lock_no
	};
	lockFeedback(data,function(response){
		console.log(response);
	});
});

server.listen(app.get('port'),function(){
	console.log('server listening on port ' + app.get('port'));
});	

io.on('connection',function(socket){
	ioSocket = socket;
	ioSocket.emit('news',{hello:'world'});
	ioSocket.on('my other event',function(data){
		//console.log(data);
	});
});

var openLock = function(lock_no){
	console.log('open '+lock_no);
	ioSocket.emit('open lock',{lock_no:lock_no});
}	

var handlelock = function(data){
	var res = JSON.parse(data.toString());
	console.log(res);
	if(DEVICDID === res.station_no){
		openLock(res.lock_no);
	}
};


client = net.connect(8086,'120.24.174.248');
client.on('connect',function(){
	console.log('connect to the server');
});
client.setEncoding('utf8');
client.on('data',handlelock);
client.on('end',function(){
	console.log('disconnected from server');
});	

