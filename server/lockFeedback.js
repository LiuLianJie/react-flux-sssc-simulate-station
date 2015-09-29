'use strict';

/**
 * obtain tcp connection
 * project for ssec
 * product by jliu
 * Copyright (c) 2012-2015, lyflash. (MIT Licensed)
 */
 
var http = require('http');
var querystring = require('querystring');

var feedback = function(data,callback){
	if(!data) return;

    data = querystring.stringify(data);  
    
    var opt = {  
        method: "POST",  
        host: "beta.iot-space.com",  
        port: 80,  
        path: "/trunk/index.php/Iot/Outer/senderclosebox",
        headers: {  
            "Content-Type": 'application/x-www-form-urlencoded',  
            "Content-Length": data.length  
        }  
    };  
	var req = http.request(opt,function(serversendback){
		if( serversendback.statusCode == 200){
			var body = "";
			serversendback.on('data',function(data){
				body += data;
			});
			serversendback.on('end',function(){
				var res = JSON.parse(body);
				callback();
			});
		}else{

		}
	});
	req.write(data +"\n");
	req.end();
}

module.exports = feedback;