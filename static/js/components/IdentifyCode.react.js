'use strict';

var React = require('react');
var randerTimer = null;
var AppActions = require('../actions/AppActions');

var IdentifyCode = React.createClass({
	propTypes:function(){

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
		AppActions.sendIdentifyCode(function(randomCode){
			console.log('randomCode : ' + randomCode);
			this.setState({randomCode:randomCode});
		}.bind(this));
	},
	render:function(){
		var style = {
			position:'absolute',
			top:81,
			left:476,
			color:'white',
			zIndex:4
		}
		return (
			<h2 style={style}>{this.state.randomCode}</h2>
		)
	}
});

module.exports = IdentifyCode;