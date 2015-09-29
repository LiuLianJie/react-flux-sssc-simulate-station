'use strict';

var React = require('react');
var StationBG = require('./StationBG.react');
var Bag = require('./Bag.react');
var AppActions = require('../actions/AppActions');
var SimulateStore = require('../stores/SimulateStore');

var socket = io.connect('http://localhost:5001');

var ALL_BAG_POSITIONS = [
	{x:800,y:500},
	{x:162,y:37}
];

var lockstatus = SimulateStore.getLockStatus();
var bagindex = lockstatus!=null && lockstatus['bagPositionIndex']!=null ? lockstatus['bagPositionIndex'] : 0;

var SimulateApp = React.createClass({
	getInitialState:function(){
		return{
			isOpened: lockstatus!=null ? lockstatus['isOpened']:false,
			isDroped: lockstatus!=null ? lockstatus['isDroped']:false,
			BagPosition: ALL_BAG_POSITIONS[bagindex],
			bagZIndex: lockstatus!=null ? lockstatus['bagZIndex']:2,
		}
	},
	componentDidMount:function(){
		socket.on('open lock',function(data){
			this.openBox();
		}.bind(this));
	},
	render: function(){
		return (
			<div>
				<StationBG status={this.state.isOpened} />
				<Bag onClickBn={this.dropBag} position={this.state.BagPosition} ZIndex={this.state.bagZIndex}/>
				
			</div>
		)
	},
	openBox:function(){
		this.setState({isOpened:true,bagZIndex:4});
		var data;
		if(this.state.isDroped){
			data = {
				isOpened:true,
				isDroped:true,
				bagPositionIndex:1,
				bagZIndex:4,
			}	
		}else{
			data = {
				isOpened:true,
				isDroped:false,
				bagPositionIndex:0,
				bagZIndex:4,
			}	
		}
		
		AppActions.setLockStatus(data);
	},
	dropBag:function(){
	
		if(!this.state.isOpened){
			return;
		}
	
		if(this.state.isDroped){
			this.setState({BagPosition:ALL_BAG_POSITIONS[0]});
			setTimeout(this.userCloseBox,800);
		}else{
			this.setState({BagPosition:ALL_BAG_POSITIONS[1]});
			setTimeout(this.cabinetCloseBox,800);
		}

	},
	cabinetCloseBox:function(){
		this.setState({isOpened:false,bagZIndex:2,isDroped:true});	
		var lock_no = 1;
		AppActions.closeLock(lock_no);
		var data = {
			isOpened:false,
			isDroped:true,
			bagPositionIndex:1,
			bagZIndex:2,
		}	
		AppActions.setLockStatus(data);
	},
	userCloseBox:function(){
		this.setState({isOpened:false,bagZIndex:2,isDroped:false});
		var lock_no = 1;
		AppActions.closeLock(lock_no);	
		var data = {
			isOpened:false,
			isDroped:false,
			bagPositionIndex:0,
			bagZIndex:2,
		}	
		AppActions.setLockStatus(data);
	}
});

module.exports = SimulateApp;