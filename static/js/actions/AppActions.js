
var AppDispatcher = require('../dispatcher/AppDispatcher');
var SSConstants = require('../constants/SimulateStationConstants');

var SimulateStationActions = {
	sendIdentifyCode:function(deviceid,code){
		AppDispatcher.dispatch({
			actionType: SSConstants.SEND_IDENTIFY_CODE,
			deviceid:deviceid,
			code:code
		});
	}
};
module.exports = SimulateStationActions