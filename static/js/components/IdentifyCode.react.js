'use strict';

var React = require('react');
var rn = require('random-number');
var ReactPropTypes = React.PropTypes;
var randerTimer = null;
var AppActions = require('../actions/AppActions');

var IdentifyCode = React.createClass({
	propTypes:function(){
		deviceid:ReactPropTypes.string
	},
	getInitialState:function(){
		return {
			randomCode:'0000'
		}
	},
	componentDidMount:function(){
		this.genRandomCode();
		randerTimer = setInterval(this.genRandomCode,60000);
	},
	componentWillUnmount:function(){
		clearInterval(randerTimer);
		randerTimer = null;
	},
	genRandomCode:function(){
		var RandomOption = {
			min:1000,
			max:9999,
			integer:true
		}
		var randomCode = rn(RandomOption);
		var deviceid = this.props.deviceid;
		this.setState({randomCode:randomCode});
		AppActions.sendIdentifyCode(deviceid,randomCode);
	},
	render:function(){
		
		var style = {
			position:'absolute',
			top:95,
			left:488,
			color:'white',
			zIndex:4
		}
		return (
			<h2 style={style}>{this.state.randomCode}</h2>
		)
	}
});

module.exports = IdentifyCode;