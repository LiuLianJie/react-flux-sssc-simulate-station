'use strict';

var React = require('react');
var StationBG = require('./StationBG.react');
var Bag = require('./Bag.react');
var TestButton = require('./TestButton.react');

var ALL_BAG_POSITIONS = [
	{x:800,y:500},
	{x:170,y:43}
];

var SimulateApp = React.createClass({
	getInitialState:function(){
		return{
			isOpened: false,
			isDroped: false,
			BagPosition: ALL_BAG_POSITIONS[0]
		}
	},
	render: function(){
		return (
			<div>
				<StationBG status={this.state.isOpened}/>
				<Bag onClickBn={this.dropBag} position={this.state.BagPosition}/>
				<TestButton onClickBn={this.openBox}/>
			</div>
		)
	},
	openBox:function(){
		this.setState({isOpened:true});
	},
	dropBag:function(){
		if(!this.state.isOpened){
			return;
		}
		this.setState({BagPosition:ALL_BAG_POSITIONS[1]});
		setTimeout(this.closeBox,800);
	},
	closeBox:function(){
		this.setState({isOpened:false});
	}
});

module.exports = SimulateApp;