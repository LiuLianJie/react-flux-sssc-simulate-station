'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;

var TestButton = React.createClass({
	propTypes:{
		onClickBn:ReactPropTypes.func.isRequired
	},
	render: function(){
		var style = {
			position:'absolute',
			left: 10,
			bottom:10,
			backgroundColor:'black',
			color:'white',
			width:100,
			height:40
		}
		return (
			<div>
				<button onClick={this._boxToggle} style={style}>open box1</button>
			</div>
		)
	},
	_boxToggle:function(){
		this.props.onClickBn();
	}
});

module.exports = TestButton;