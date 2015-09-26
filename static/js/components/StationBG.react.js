'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;
var IdentifyCode = require('./IdentifyCode.react');

var boxImg = {
	closed:'./imgs/box-close.png',
	opened:'./imgs/box-open.png'
}
var StationBG = React.createClass({
	
	propTypes:{
		status:ReactPropTypes.bool.isRequired
	},
	render: function(){
		var style = {
			image:{
				position:'absolute',
				zIndex:1,
				width:1000,
				height:452
			},
			box:{
				width:265,
				height:98.5,
				position:'absolute',
				top:27.5,
				left:19,
				zIndex:3,
			},
			view:{
				width:0,
				height:0,
			}
		}
		var isOpened = this.props.status;
		return (
			<div style={style.view}>
				<image src={isOpened? boxImg.opened : boxImg.closed } style={style.box}/>
				<image src="./imgs/stationbg.png" style={style.image}/>
				<IdentifyCode />
			</div>
		)

	}
});

module.exports = StationBG;