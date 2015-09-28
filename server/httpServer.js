var express = require('express');
var path = require('path');
var ejs = require('ejs');
var lockFeedBack = require('./lockFeedBack');

var app = express();

function start(){
	app.set('port',process.env.PORT || 3000);
	app.set('views',__dirname+'/static');
	app.engine('.html',require('ejs').__express);
	app.set('view engine','html');
	app.use(express.static(path.join(__dirname,'static')));

	app.get('/',function(req,res){
		res.render('index');
	});

	app.get('/getdeviceid',function(req,res){
		res.json({});
	});

	app.get('/lockFeedBack',function(req,res){
		var identify_code = req.query.identify_code;
		if(!identify_code){
			console.log('identify code is null');
		}
		//lockFeedBack
	});

	app.listen(app.get('port'),function(){
		console.log('server listening on port ' + app.get('port'));
	});	
}

exports.start = start;


