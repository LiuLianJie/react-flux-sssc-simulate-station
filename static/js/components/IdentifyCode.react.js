'use strict';

var React = require('react');
var rn = require('random-number');
var randerTimer = null;

var IdentifyCode = React.createClass({
	getInitialState:function(){
		return {
			randomCode:'0000'
		}
	},
	componentDidMount:function(){
		this.genRandomCode();
		randerTimer = setInterval(this.genRandomCode,1000);
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
		this.setState({randomCode:rn(RandomOption)});
	},
	render: function(){
		
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