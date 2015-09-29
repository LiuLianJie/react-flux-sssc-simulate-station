var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var SSConstants = require('../constants/SimulateStationConstants');
var assign = require('object-assign');
var rn = require('random-number');
var $ = require('jquery');
var ls = require('local-storage');

var CHANGE_EVENT = 'change';
var DEVICEID = '';
var LOCK_STATUS_MODEL = 'lockstatus';

function getDeviceId(callback){
	if(DEVICEID!=''){
		callback(DEVICEID);
	}else{
		$.ajax({
			type:"GET",
			url:"/getdeviceid",
			dataType:"json",
			success:function(data){
				if(data.status){
					console.log(data.data);
					callback(data.data);
				}else{
					console.log('fail');
					callback(null);
				}
			}
		});			
	}
}	

function genRandomCode(){
	var RandomOption = {
		min:1000,
		max:9999,
		integer:true
	}
	return rn(RandomOption);
}

function sendRandomCode(callback){
	var randomcode = genRandomCode();
	
	getDeviceId(function(deviceid){
		$.ajax({
			type:"GET",
			url:"http://beta.iot-space.com/trunk/index.php/Iot/Outer/setstationcodebyjsonp",
			data:{station_no:deviceid, station_randomno:randomcode},
			dataType:"jsonp",
			jsonp:"callback",
			success:function(data){

				if(data.s){
					callback(randomcode);
				}else{
					randomcode(callback);
				}
			}
		});	
	});
}

function closelock(lock_no){
	$.ajax({
		type:"GET",
		url:"/closelock",
		data:{lock_no:lock_no},
		dataType:"json",
		success:function(data){
			console.log(data);
		}
	});	
}

var SimulateStore = assign({},EventEmitter.prototype,{
	getLockStatus: function(){
		return ls.get(LOCK_STATUS_MODEL);
	},
	setLockStatus: function(update){
		ls.set(LOCK_STATUS_MODEL,update);
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
			sendRandomCode(action.callback);
			break;
		case SSConstants.CLOSE_LOCK:
			closelock(action.lock_no);
			break;
		case SSConstants.SET_LOCK_STATUS:
			SimulateStore.setLockStatus(action.update);
			break;
		default:
			// no op
	}
});

module.exports = SimulateStore;