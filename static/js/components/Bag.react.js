'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;

var Bag = React.createClass({
	propTypes:{
		onClickBn:ReactPropTypes.func.isRequired,
		position:ReactPropTypes.object.isRequired
	},
	render: function(){
		var style = {
			width:100,
			height:84,
			position:'absolute',
			top:this.props.position.y||500,
			left:this.props.position.x||800,
			zIndex:2
		}
		return (
			<image src="./imgs/bag.png" onClick={this._click} style={style}/>
		)
	},
	_click:function(){
		this.props.onClickBn();
	}
});

module.exports = Bag;