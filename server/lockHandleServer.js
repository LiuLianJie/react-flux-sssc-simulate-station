
var net = require('net-socket');
var client;
var DEVICDID = '17234132';

function start(){
	var openLock = function(lock_no){
		console.log('open '+lock_no);
	}	

	var handlelock = function(data){
		var res = JSON.parse(data.toString());
		console.log(res);
		if(DEVICDID === res.station_no){
			openLock(res.lock_no);
		}
	};

	client = net.connect(8086,'127.0.0.1');
	client.on('connect',function(){
		console.log('connect to the server');
	});
	client.setEncoding('utf8');
	client.on('data',handlelock);
	client.on('end',function(){
		console.log('disconnected from server');
	});	
}
exports.start = start;
