
var AppDispatcher = require('../dispatcher/AppDispatcher');
var SSConstants = require('../constants/SimulateStationConstants');

var SimulateStationActions = {
	sendIdentifyCode:function(callback){
		AppDispatcher.dispatch({
			actionType: SSConstants.SEND_IDENTIFY_CODE,
			callback:callback
		});
	},
	closeLock:function(lock_no){
		AppDispatcher.dispatch({
			actionType: SSConstants.CLOSE_LOCK,
			lock_no:lock_no
		});
	},
	setLockStatus:function(update){
		AppDispatcher.dispatch({
			actionType: SSConstants.SET_LOCK_STATUS,
			update:update
		})
	}
};
module.exports = SimulateStationActions