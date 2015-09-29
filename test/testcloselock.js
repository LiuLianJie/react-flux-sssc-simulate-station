var lockFeedback = require('../server/lockFeedback');

var data = {
	station_no:'3d2eabda234f',
	lock_no:'1'
}
lockFeedback(data,function(response){
	console.log(response);
})