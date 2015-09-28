var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var SSConstants = require('../constants/SimulateStationConstants');
var assign = require('object-assign');
var $ = require('jquery');

var CHANGE_EVENT = 'change';

function sendRandomCode(deviceid,code){
	$.ajax({
		type:"GET",
		url:"http://beta.iot-space.com/trunk/index.php/Iot/Outer/setstationcodebyjsonp",
		data:{station_no:deviceid, station_randomno:code},
		dataType:"jsonp",
		jsonp:"callback",
		success:function(data){
			console.log(data);

			if(data.s){
				//randomcodeObj.text(strRandomcode);
				//timeindex=0
				//timestart=true;
			}else{
				console.log('fail');
				//sendrandom(DEVICEID);
			}
		}
	});	
}

var SimulateStore = assign({},EventEmitter.prototype,{
	getDeviceId:function(){
		$.ajax({
			type:"GET",
			url:"/getdeviceid",
			dataType:"json",
			success:function(data){
				if(data.status){
					console.log(data.data);
					return data.data;
				}else{
					console.log('fail');
					return '';
				}
			}
		});		
	},
	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},
	addChangeListener:function(callback){
		this.on(CHANGE_EVENT,callback);
	},
	removeChangeListener:function(callback){
		this.on(CHANGE_EVENT,callback);
	}
});

AppDispatcher.register(function(action){
	switch(action.actionType){
		case SSConstants.SEND_IDENTIFY_CODE:
			sendRandomCode(action.deviceid,action.code);
			break;
		default:
			// no op
	}
});

module.exports = SimulateStore;