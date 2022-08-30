import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { Modal, Button, Overlay } from 'react-bootstrap'
import api from '../api-proxy'
import $ from "jquery"

var moment = require('moment');

document.title = 'ViewItems'

const ViewItems = (props) => (

	<div className="container-fluid mt-3">

		<div className="row">

			<div className="col-12 mx-auto">

				<div className="card">

					<div className="card-header">View Items</div>

					<div className="card-body">				

						<ViewItemsForm role = { localStorage.getItem('role') }/>

					</div>

				</div>

			</div>

		</div>

	</div>

)

// class EditModal extends Component {

// 	constructor(props)
// 	{
// 		super(props)

// 		this.state = {

// 			ModalId: this.props.id
// 		}
// 	}

// 	render()
// 	{
// 		return(

// 			<div>{ this.state.ModalId }</div>

// 		)
// 	}
// }

class ViewItemsForm extends Component {

	constructor(props) {
		super(props)

		this.state = {

			rooms: [],			
			roomId: '',
			roomNo: '',
			date: '',
			timeIn: '',
			timeOut: '',
			price: '',
			availability: '',
			createdAt: '',
			updatedAt: '',
			showAdd: false,
			showEdit: false,
			showBook: false,
			showDelete: false,
			show: false,
			userId: localStorage.getItem('_id'),
			stripeCustomerId: '',
			roomsEdit: [],
			editId: '',
			editRoomNo: '',
			editDate: '',
			editTimeIn: '',
			editTimeOut: '',
			editPrice: '',
			isRequested: '',
			dateRequested: '',
			dateApproved: '',
			isApproved: '',
			isBooked: '',			
			editAvailability: '',			
			returnToViewItems: false

		}


	}



	componentWillMount() 
	{

		$('#edit').click(function() {
		   $('.editModal').modal('hide');
		});

		let payload = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('token')
			}
		}
		
		fetch(api.url + '/view-room', payload) 
		.then((response) => response.json()) 
		.then((rooms) => 
		{ 
			if (rooms.error != null) 
			{
				if (rooms.error === 'token-expired') 
				{
					localStorage.clear()
								
					window.location.href = '/login?session_expired=true'
				} 
				else
				{
					localStorage.clear()
								
					window.location.href = '/login?auth_failed=true'
				}
			}
			else 
			{
			
				this.setState({ 
					rooms: rooms
				})

			}

		}) 
	}

	RoomNo(e)
	{
		this.setState({ roomNo: e.target.value })
	}

	Date(e)
	{
		this.setState({ date: e.target.value })
	}

	TimeIn(e)
	{
		this.setState({ timeIn: e.target.value })
	}
	TimeOut(e)
	{
		this.setState({ timeOut: e.target.value })
	}

	Price(e)
	{
		this.setState({ price: e.target.value })
	}

	Availability(e)
	{
		this.setState({ availability: e.target.value })
	}

	Add(e)
	{
		e.preventDefault()

		let payload = {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('token')
			},
			body: JSON.stringify({
				userId: localStorage.getItem('_id'),
				roomNo: this.state.roomNo,
				date: this.state.date,
				timeIn: this.state.timeIn,
				timeOut: this.state.timeOut,
				price: this.state.price,
				availability: "Available",
				isRequested: 0,
				isBooked: 0,
				isApproved: 0,
				isArchived: 0
			})
		}



		fetch(api.url + '/add-room', payload)
		.then((response) => response.json())
		.then((response) => {
			if (response.error != null) 
			{
				if (response.error === 'token-expired') 
				{
					localStorage.clear()
								
					window.location.href = '/login?session_expired=true'
				} 
				else
				{
					localStorage.clear()
								
					window.location.href = '/login?auth_failed=true'
				}
			}
			else 
			{
				let payload = {
			 				headers: {
			 					'Content-Type': 'application/json',
			 					'Authorization': localStorage.getItem('token')
			 				}
			 			}
				fetch(api.url + '/view-room', payload)
				.then((response) => response.json()) 
				.then((rooms) => 
				{ 
						this.setState({
							userId: '',
							roomNo: '',
							date: '',
							timeIn: '',
							timeOut: '',
							price: '',
							rooms: rooms,
							showAdd: false
						})
				}) 
					
			}
		})
	}


	ShowDelete(id) 
	{
		console.log(id)
	    let payload = {
	    	method: 'post',
	    	headers: {
	    		'Content-Type': 'application/json'
	    	},
	    	body: JSON.stringify({
	    		_id: id
	    	})
	    }

	    fetch(api.url + '/find-room', payload) 
	    .then((response) => response.json()) 
	    .then((roomEdit) => 
	    { 
	    	this.setState({
	    		showDelete: true,
	    		editId: id
	    	})

	    })
	}

	CloseDelete() 
	{
	    this.setState({ showDelete: false });
	}

	Delete(id)
	{
		console.log(id)
		

		let payload = {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('token')
			},
			body: JSON.stringify({
				_id: id
			})
		}

		fetch(api.url + '/delete-room', payload) 
		.then((response) => response.json()) 
		.then((response) => 
		{ 
			if (response.error != null) 
			{
				if (response.error === 'token-expired') 
				{
					localStorage.clear()
								
					window.location.href = '/login?session_expired=true'
				} 
				else
				{
					localStorage.clear()
								
					window.location.href = '/login?auth_failed=true'
				}
			}
			else 
			{
				let payload = {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': localStorage.getItem('token')
					}
				}
				fetch(api.url + '/view-room', payload) 
				.then((response) => response.json()) 
				.then((rooms) => 
				{ 
				
					this.setState({ 
						rooms: rooms,
						showDelete: false
					})
					
				})
			}
		})


	}

	FindEdit(id)
	{		

		let payload = {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('token')
			},
			body: JSON.stringify({
				_id: id
			})
		}

		fetch(api.url + '/find-room', payload) 
		.then((response) => response.json()) 
		.then((roomEdit) => 
		{ 
			this.setState({
	
				showEdit: true,
				showBook: true,
				showConfirm: true,
				editId: id,
				editRoomNo: roomEdit.roomNo,
				editDate: roomEdit.date,
				editTimeIn: roomEdit.timeIn,
				editTimeOut: roomEdit.timeOut,
				editPrice: roomEdit.price,
				editAvailability: roomEdit.availability,		
				isRequested: roomEdit.isRequested,	
				isApproved: roomEdit.isApproved			

			})

		})


	}



	EditRoomNo(e)
	{
		this.setState({ editRoomNo: e.target.value })
	}

	EditDate(e)
	{
		this.setState({ editDate: e.target.value })
	}

	EditTimeIn(e)
	{
		this.setState({ editTimeIn: e.target.value })
	}
	EditTimeOut(e)
	{
		this.setState({ editTimeOut: e.target.value })
	}

	EditPrice(e)
	{
		this.setState({ editPrice: e.target.value })
	}

	EditAvailability(e)
	{
		this.setState({ editAvailability: e.target.value })
	}

	Edit(e)
	{
		e.preventDefault()

		$(".editModal").modal('hide')

		let payload = {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('token')
			},
			body: JSON.stringify({
				_id: this.state.editId,
				roomNo: this.state.editRoomNo,
				date: this.state.editDate,
				timeIn: this.state.editTimeIn,
				timeOut: this.state.editTimeOut,
				price: this.state.editPrice,
				availability: this.state.editAvailability,
				isRequested: 0,
				dateRequested: null,
				isApproved: 0,
				dateApproved: 0
			})
		}

		fetch(api.url + '/edit-room', payload)
		.then((response) => response.json())
		.then((response) => {

				if (response.error != null) 
				{
					if (response.error === 'token-expired') 
					{
						localStorage.clear()
									
						window.location.href = '/login?session_expired=true'
					} 
					else
					{
						localStorage.clear()
									
						window.location.href = '/login?auth_failed=true'
					}
				}
				else 
				{

					let payload = {
			 				headers: {
			 					'Content-Type': 'application/json',
			 					'Authorization': localStorage.getItem('token')
			 				}
			 			}

					fetch(api.url + '/view-room', payload) 
					.then((response) => response.json()) 
					.then((rooms) => 
					{ 
				
						this.setState({ 
							rooms: rooms,
							showEdit: false
						})
						
					}) 
				}
			
		})

	}

	Book(e)
	{

		e.preventDefault()

		let payload = {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('token')
			},
			body: JSON.stringify({
				_id: this.state.editId,
				name: localStorage.getItem('name'),
				price: this.state.editPrice,			
				userId: localStorage.getItem('_id'),				
				isBooked: 1,
				isRequested: 1,
				isApproved: 0,
				dateRequested: new Date(),
				dateBooked: new Date(),
				roomNo: this.state.editRoomNo,
				date: this.state.editDate,
				timeIn: this.state.editTimeIn,
				timeOut: this.state.editTimeOut,
				createdAt: new Date(),
				updatedAt: new Date(),
				isArchived: 0
			})
		}

		fetch(api.url + '/book-room', payload)
		.then((response) => response.json())
		.then((response) => {
			if (response.error != null) 
			{
				if (response.error === 'token-expired') 
				{
					localStorage.clear()
								
					window.location.href = '/login?session_expired=true'
				} 
				else
				{
					localStorage.clear()
								
					window.location.href = '/login?auth_failed=true'
				}
			}
			else 
			{
				let payload = {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': localStorage.getItem('token')
					}
				}
				fetch(api.url + '/view-room', payload) 
				.then((response) => response.json()) 
				.then((rooms) => 
				{ 
				
					this.setState({ 
						rooms: rooms,
						showDelete: false
					})
					
				})
			}
		})

	}

	Cancel(e)
	{
		e.preventDefault()

		let payload = {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('token')
			},
			body: JSON.stringify({
				_id: this.state.editId,
				isRequested: 0,
				isBooked: 0,
				isApproved: 0,
				dateRequested: null,
				dateBooked: null,
				dateApproved: null,				

			})
		}

		fetch(api.url + '/cancel-room', payload)
		.then((response) => response.json())
		.then((response) => {
			if (response.error != null) 
			{
				if (response.error === 'token-expired') 
				{
					localStorage.clear()
								
					window.location.href = '/login?session_expired=true'
				} 
				else
				{
					localStorage.clear()
								
					window.location.href = '/login?auth_failed=true'
				}
			}
			else 
			{
				let payload = {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': localStorage.getItem('token')
					}
				}
				fetch(api.url + '/view-room', payload) 
				.then((response) => response.json()) 
				.then((rooms) => 
				{ 
				
					this.setState({ 
						rooms: rooms,
						showDelete: false
					})
					
				})
			}
		})

	}


	Approve(id)
	{

			let payload = {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': localStorage.getItem('token')

				},
				body: JSON.stringify({
					_id: id
				})
			}

			fetch(api.url + '/find-room', payload) 
			.then((response) => response.json()) 
			.then((roomEdit) => 
			{ 
				this.setState({

					editId: id,
					editRoomNo: roomEdit.roomNo,
					editDate: roomEdit.date,
					editTimeIn: roomEdit.timeIn,
					editTimeOut: roomEdit.timeOut,
					editPrice: roomEdit.price,
					editAvailability: roomEdit.availability,		
					isRequested: roomEdit.isRequested,	
					dateRequested: roomEdit.dateRequested,	
					isApproved: roomEdit.isApproved,
					dateApproved: roomEdit.dateApproved,
					createdAt: roomEdit.createdAt,
					updatedAt: roomEdit.updatedAt
				})

				let approve = {
			 	method: 'put',
			 	headers: {
			 		'Content-Type': 'application/json',
			 		'Authorization': localStorage.getItem('token')
			 	},
			 	body: JSON.stringify({
			 		_id: id,
			 		roomNo: this.state.editRoomNo,
			 		date: this.state.editDate,
			 		timeIn: this.state.editTimeIn,
			 		timeOut: this.state.editTimeOut,
			 		availability: "Booked",
			 		price: this.state.editPrice,
			 		isRequested: 0,
			 		dateRequested: new Date(),
			 		isBooked: 0,			 	
			 		dateBooked: null,
			 		isApproved: 1,
			 		dateApproved: new Date(),
			 		isArchived: 0,
			 		createdAt: this.state.createdAt,
			 		updatedAt: this.state.updatedAt
			 	})
			 }



		 	fetch(api.url + '/approve-room', approve)
			 .then((response) => response.json())
			 .then((response) => {
			 	if (response.error != null) 
				{
					if (response.error === 'token-expired') 
					{
						localStorage.clear()
									
						window.location.href = '/login?session_expired=true'
					} 
					else
					{
						localStorage.clear()
									
						window.location.href = '/login?auth_failed=true'
					}
				}
				else 
				{
					let payload = {
						headers: {
							'Content-Type': 'application/json',
							'Authorization': localStorage.getItem('token')
						}
					}
					fetch(api.url + '/view-room', payload) 
					.then((response) => response.json()) 
					.then((rooms) => 
					{ 
					
						this.setState({ 
							rooms: rooms,
							showDelete: false
						})
						
					})
				}
			 })

			})

								
	}

	CloseAdd() 
	{
	    this.setState({ showAdd: false });
	}

	ShowAdd()
	{
	    this.setState({ showAdd: true });
	}

	CloseEdit() 
	{
	    this.setState({ showEdit: false });
	}

	ShowEdit(id)
	{
	    
		let payload = {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('token')
			},
			body: JSON.stringify({
				_id: id
			})
		}

		fetch(api.url + '/find-room', payload) 
		.then((response) => response.json()) 
		.then((roomEdit) => 
		{ 
			this.setState({			
				showEdit: true,
				editId: id,
				editRoomNo: roomEdit.roomNo,
				editDate: roomEdit.date,
				editTimeIn: roomEdit.timeIn,
				editTimeOut: roomEdit.timeOut,
				editPrice: roomEdit.price,
				editAvailability: roomEdit.availability	,		
				isRequested: roomEdit.isRequested,	
				isApproved: roomEdit.isApproved		
			})

		})
	}

	CloseBook() 
	{
	    this.setState({ showBook: false });
	}

	ShowBook(id)
	{

		let payload = {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('token')
			},
			body: JSON.stringify({
				_id: id
			})
		}

		fetch(api.url + '/find-room', payload) 
		.then((response) => response.json()) 
		.then((roomEdit) => 
		{ 
			this.setState({			
				showBook: true,
				editId: id,
				editRoomNo: roomEdit.roomNo,
				editDate: roomEdit.date,
				editTimeIn: roomEdit.timeIn,
				editTimeOut: roomEdit.timeOut,
				editPrice: roomEdit.price,
				editAvailability: roomEdit.availability	,		
				isRequested: roomEdit.isRequested,	
				isApproved: roomEdit.isApproved		
			})

		})
	}

	CloseConfirm() 
	{
	    this.setState({ showConfirm: false });
	}

	ShowConfirm(id)
	{
	    let payload = {
	    	method: 'post',
	    	headers: {
	    		'Content-Type': 'application/json',
	    		'Authorization': localStorage.getItem('token')
	    	},
	    	body: JSON.stringify({
	    		_id: id
	    	})
	    }

	    fetch(api.url + '/find-room', payload) 
	    .then((response) => response.json()) 
	    .then((roomEdit) => 
	    { 
	    	this.setState({			
	    		showConfirm: true,
	    		editId: id
	    	})

	    })
	}


	handleClose() {
	  this.setState({ show: false });
	}

	handleShow() {
	  this.setState({ show: true });
	}


	render() 
	{

		let edit = [];
		let cnt = 1;
	

		if (this.state.returnToViewItems) {

			return <Redirect to='/view-items'/>
		}

		let editBtn = null;
		let req = null;
		let addBtn = null;

		if (localStorage.getItem('role') == "admin")
			{
				addBtn =

				<Fragment>

					<Button className = "btn btn-success btn-block" onClick={this.ShowAdd.bind(this)}>
				          Add Item
				    </Button>

				        <Modal show={ this.state.showAdd } onHide={this.CloseAdd.bind(this)}>

				          <Modal.Header>

				            <Modal.Title>Add New Room</Modal.Title>

				          </Modal.Header>

				          <Modal.Body>
				            
				            <form onSubmit = { this.Add.bind(this) } encType="multipart/form-data">

				            	<div className="form-group">

				            		<label htmlFor="txt-item-name"> Room No. </label>

				            		<input value={ this.state.roomNo } onChange={ this.RoomNo.bind(this) } type="number" className="form-control" required/>
				            	
				            	</div>

				            	<div className="form-group">

				            		<label htmlFor="txt-description"> Date </label>

				            		<input value= { this.state.date } onChange={ this.Date.bind(this) } type="date" className="form-control" min="2019-01-01" max="2020-01-01" required/>
				            	
				            	</div>

				            	<div className="form-group">

				            		<label htmlFor="txt-description"> Time In</label>

				            		<input value={ this.state.timeIn } onChange={ this.TimeIn.bind(this) } type="time" className="form-control" required/>
				            	
				            	</div>
				            	<div className="form-group">

				            		<label htmlFor="txt-description"> Time Out</label>

				            		<input value={ this.state.timeOut } onChange={ this.TimeOut.bind(this) } type = "time" className="form-control" required/>
				            	
				            	</div>

				            	<div className="form-group">

				            		<label htmlFor="txt-description">Price</label>

				            		<input value={ this.state.price } onChange={ this.Price.bind(this) } type="number" className="form-control" required/>
				            	
				            	</div>

				            	<button type="btn" className="btn btn-success btn-block">Add</button>

				            </form>

				          </Modal.Body>

				          <Modal.Footer>

				          	<Button variant="danger" className="btn btn-success btn-block" onClick = { this.CloseAdd.bind(this) }>Cancel</Button>

				          </Modal.Footer>

				        </Modal>

				</Fragment>

			}


		

		let rowActions = null

		let requested = null

		const rows = this.state.rooms.map((room) => {

			let av = null;

			if(this.state.editAvailability == "Available")
			{
				av = <option value="Booked">Booked</option>
			}
			else
			{
				av = <option value="Available">Available</option>
			}

			if (this.props.role == "admin" && room.isApproved == 0)
			{

			rowActions = <Fragment>
					
				{/*
				<Button className = "btn btn-primary btn-block" onClick={ (id) => this.ShowEdit(room._id) }>
			          Edit
			    </Button>

			        <Modal show={ this.state.showEdit } onHide={ this.CloseEdit.bind(this) } id = "show">

			          <Modal.Header>

			            <Modal.Title>Edit Room { this.state.editId }</Modal.Title>

			          </Modal.Header>

			          <Modal.Body>
			            
			            <form onSubmit = { this.Edit.bind(this) } encType="multipart/form-data">

			            	<div className="form-group">			            	

			            		<label htmlFor="txt-item-name"> Edit Room No. </label>			            		

			            		<input value={ this.state.editRoomNo } onChange={ this.EditRoomNo.bind(this) } type="number" className="form-control"/>
			            	
			            	</div>

			            	<div className="form-group">

			            		<label htmlFor="txt-description"> Edit Date </label>

			            		<input value={ moment(this.state.editDate).format("YYYY-MM-DD") } onChange={ this.EditDate.bind(this) } type="date" className="form-control"/>
			            	
			            	</div>

			            	<div className="form-group">

			            		<label htmlFor="txt-description"> Edit Time In</label>

			            		<input value={ this.state.editTimeIn } onChange={ this.EditTimeIn.bind(this) } type="time" className="form-control"/>
			            	
			            	</div>

			            	<div className="form-group">

			            		<label htmlFor="txt-description">Edit Time Out</label>

			            		<input value={ this.state.editTimeOut } onChange={ this.EditTimeOut.bind(this) } type="time" className="form-control"/>
			            	
			            	</div>

			            	<div className="form-group">

			            		<label htmlFor="txt-description">Edit Price</label>

			            		<input value={ this.state.editPrice } onChange={ this.EditPrice.bind(this) } type="number" className="form-control"/>
			            	
			            	</div>

			            	<div className="form-group">

			            		<label htmlFor="txt-description">Edit Availability</label>				            
			            		
			            		<select value={ this.state.editAvailability } onChange={ this.EditAvailability.bind(this) } className="form-control" >
			            
			            			<option value={ this.state.editAvailability }>{ this.state.editAvailability }</option>

			            			{ av }       			
			   
			            		</select>
			            	


			            	</div>

			            	<button type="submit" className="btn btn-success btn-block" id = "edit">Edit</button>

			            </form>

			          </Modal.Body>

			          <Modal.Footer>

			          	<Button variant="danger" className="btn btn-success btn-block" onClick = { this.CloseEdit.bind(this) }>Cancel</Button>

			          </Modal.Footer>

			        </Modal>

			    */}
			    <button type="button" class="btn btn-primary btn btn-block" data-toggle="modal" data-target= { "#edit" + room._id } onClick={ (id) => this.ShowEdit(room._id) }>
			      Edit
			    </button>
			    <div class="modal fade editModal" id={ "edit" + room._id } tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			      <div class="modal-dialog" role="document">
			        <div class="modal-content">
			          <div class="modal-header">
			            <h5 class="modal-title" id="exampleModalLabel">Edit Room # { room.roomNo }?</h5>
			            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			              <span aria-hidden="true">&times;</span>
			            </button>
			          </div>
			          <div class="modal-body">
			             <form onSubmit = { this.Edit.bind(this) } encType="multipart/form-data">

			            	<div className="form-group">			            	

			            		<label htmlFor="txt-item-name"> Edit Room No. </label>			            		

			            		<input value={ this.state.editRoomNo } onChange={ this.EditRoomNo.bind(this) } type="number" className="form-control"/>
			            	
			            	</div>

			            	<div className="form-group">

			            		<label htmlFor="txt-description"> Edit Date </label>

			            		<input value={ moment(this.state.editDate).format("YYYY-MM-DD") } onChange={ this.EditDate.bind(this) } type="date" className="form-control"/>
			            	
			            	</div>

			            	<div className="form-group">

			            		<label htmlFor="txt-description"> Edit Time In</label>

			            		<input value={ this.state.editTimeIn } onChange={ this.EditTimeIn.bind(this) } type="time" className="form-control"/>
			            	
			            	</div>

			            	<div className="form-group">

			            		<label htmlFor="txt-description">Edit Time Out</label>

			            		<input value={ this.state.editTimeOut } onChange={ this.EditTimeOut.bind(this) } type="time" className="form-control"/>
			            	
			            	</div>

			            	<div className="form-group">

			            		<label htmlFor="txt-description">Edit Price</label>

			            		<input value={ this.state.editPrice } onChange={ this.EditPrice.bind(this) } type="number" className="form-control"/>
			            	
			            	</div>

			            	<div className="form-group">

			            		<label htmlFor="txt-description">Edit Availability</label>				            
			            		
			            		<select value={ this.state.editAvailability } onChange={ this.EditAvailability.bind(this) } className="form-control" >
			            
			            			<option value={ this.state.editAvailability }>{ this.state.editAvailability }</option>

			            			{ av }       			
			   
			            		</select> 

			            	</div>

			            	<Button type="submit" className="btn btn-success btn-block" id = "edit">Edit</Button>
			            	 <button type="button" className="btn btn-secondary btn-block" data-dismiss="modal">Close</button>            	

			            </form>
			          </div>
			          <div class="modal-footer">
			           
			          </div>

			        </div>
			      </div>
			    </div>

			    	<Button className = "btn btn-danger btn-block" onClick={ (id) => this.ShowDelete(room._id) }>
			              Delete
			        </Button>

			            <Modal show={ this.state.showDelete } onHide={ this.CloseDelete.bind(this) }>

			              <Modal.Header>

			                <Modal.Title>Delete Room?</Modal.Title>

			              </Modal.Header>

			              

			              <Modal.Footer>

			              	<Button variant = "danger" onClick = { (id) => this.Delete(this.state.editId) }>Delete</Button>
			              	<Button variant = "success" onClick = { this.CloseDelete.bind(this) }>Cancel</Button>

			              </Modal.Footer>

				            </Modal>		

				</Fragment>

			}

			else
			{

				if (room.availability == "Available")
				{

					if(room.isRequested == 0)
					{
						rowActions = 

							<Fragment>

							<Button className = "btn btn-primary btn-block" onClick={ (id) => this.ShowBook(room._id) }>
						          Book this Room?
						    </Button>

						        <Modal show={ this.state.showBook } onHide={ this.CloseBook.bind(this) }>

						          <Modal.Header>

						            <Modal.Title>Book Room #{this.state.editRoomNo } ?</Modal.Title>

						          </Modal.Header>

						          <Modal.Body>
						            
						            <form onSubmit = { this.Book.bind(this) } encType="multipart/form-data">

						            	<div className="input-group mb-3">

						            		<div className="input-group-prepend">

						            		    <span className="input-group-text" id="basic-addon1">Room No: </span>

						            		  </div>

						            		<input value={ this.state.editRoomNo } type="number" className="form-control" readOnly/>
						            	
						            	</div>



						            	<div className="input-group mb-3">

						            		<div className="input-group-prepend">

						            		    <span className="input-group-text" id="basic-addon1">Date: </span>

						            		  </div>

						            		<input value= { moment(this.state.editDate).format("LL")} onChange={ this.EditDate.bind(this) } type="text" className="form-control" min="2019-01-01" max="2020-01-01" readOnly/>
						            	
						            	</div>

						            	<div className="input-group mb-3">

						            		<div className="input-group-prepend">

						            		    <span className="input-group-text" id="basic-addon1">Time In: </span>

						            		  </div>

						            		<input value={ this.state.editTimeIn } type="time" className="form-control" readOnly/>
						            	
						            	</div>

						            	<div className="input-group mb-3">

						            		<div className="input-group-prepend">

						            		    <span className="input-group-text" id="basic-addon1">Time Out:</span>

						            		  </div>

						            		<input value={ this.state.editTimeOut } type="time" className="form-control" readOnly/>
						            	
						            	</div>

						            	<div className="input-group mb-3">

						            		<div className="input-group-prepend">

						            			<span className="input-group-text" id="basic-addon1">Price</span>

						            		</div>

						            		<input value={ this.state.editPrice } type="number" className="form-control" readOnly/>
						            	
						            	</div>

						            	<button type="submit" className="btn btn-success btn-block">Book This Room (Pay using Stripe)</button>

						            </form>

						          </Modal.Body>

						          <Modal.Footer>

						          	<Button variant="danger" className="btn btn-success btn-block" onClick = { this.CloseBook.bind(this) }>Cancel</Button>
						
						          </Modal.Footer>

						        </Modal>	

							</Fragment>
					}
					else
					{
						rowActions =
						<Fragment>
							<Button className = "btn btn-danger btn-block"  onClick={ (id) => this.ShowConfirm(room._id) }>
							Cancel Booking?

							</Button>

							<Modal show={ this.state.showConfirm } onHide={ this.CloseConfirm.bind(this) }>

							<Modal.Header>

							<Modal.Title>Book Room # {this.state.editId}?</Modal.Title>

							</Modal.Header>

							<Modal.Body>

							Are you sure you want to cancel this Booking?

							</Modal.Body>

							<Modal.Footer>

							<Button variant = "danger"  onClick = { this.Cancel.bind(this) }>Yes</Button>

							<Button variant = "success" onClick = { this.CloseConfirm.bind(this) }>Nope.</Button>				

							</Modal.Footer>

							</Modal>	
							</Fragment>
					}							

				}
				else
				{

					rowActions = null
				}
				


					

			}

				let approved = null;
				let l = null;

				if (room.isRequested == 0)
				{
					
					if(room.isApproved == 0)
					{
						requested =
						<Fragment>
							  <td>{ room.availability }</td>
							  <td></td>
							  <td></td>
							  <td></td>
							  <td></td>
						</Fragment>
					}
					else
					{
						requested =
							<Fragment>
								  <td>{ room.availability }</td>
								  <td>Not Requested</td>
								  <td></td>
								  <td className = "text-success">Approved</td>
								  <td>{ moment(room.dateApproved).format('LLL') }</td>
							</Fragment>

							
					}
					
				}

				else
				{
					if(localStorage.getItem("role") == "admin")
					{


						if(room.availability == "Available")
						{

							l = <button className = "btn btn-success" onClick = { (id) => this.Approve(room._id) }>Approve</button>
						}
						requested =
						<Fragment>
							  <td>{ room.availability }</td>
							  <td className = "text-danger">Requested</td>
							  <td>{ moment(room.dateRequested).format('LLL') }</td>
							  <td className = "text-danger">{ l }</td>
							  <td ></td>
						</Fragment>
					}
					else
					{
						if(room.isApproved == 0)
						{
							requested =
							<Fragment>
								  <td>{ room.availability }</td>
								  <td className = "text-danger">Requested</td>
								  <td>{ moment(room.dateRequested).format('LLL') }</td>
								  <td className = "text-danger">Pending</td>
								  <td></td>
							</Fragment>
						}
						else
						{
							requested =
							<Fragment>
								  <td>{ room.availability }</td>
								  <td className = "text-danger">Requested</td>
								  <td>{ moment(room.dateRequested).format('LLL') }</td>
								  <td className = "text-danger">{ room.isApproved }</td>
								  <td>{ moment(room.dateApproved).format('LLL') }</td>
							</Fragment>
						}
					}
				}


			
				return (

				<Fragment>					 		  
					  <tr>
					    <td>{ cnt++ }</td>
					    <td>{ room.roomNo }</td>
					    <td>{ moment(room.date).format('LL') }</td>
					    <td>{ room.timeIn }</td>
					    <td>{ room.timeOut }</td>
					    <td>&#8369;{ room.price }</td>
					  		{ requested }
					    				  	
					  	<td>

					  	<Button variant="info" onClick={this.handleShow.bind(this)}>
					  	       Image
					  	     </Button>

					  	     <Modal size = "lg" show={this.state.show} onHide={this.handleClose.bind(this)}>

					  	       <Modal.Header closeButton>

					  	       	{ room.roomNo }

						  	   </Modal.Header>

					  	     <Modal.Body>
																		<img src = "https://content2.jdmagicbox.com/comp/visakhapatnam/z2/0891px891.x891.180414114311.j3z2/catalogue/parinaya-function-hall-kancharapalem-visakhapatnam-banquet-halls-yfjjy.jpg?interpolation=lanczos-none&output-format=jpg&resize=1024:370&crop=1024:370px;*,*" width = "100%" className = "text-center"></img>
					  	     </Modal.Body>
					  	     
					  	     </Modal>

					  	</td>
					  	<td>{ rowActions }</td>
					  </tr>
				</Fragment>

				)
			})



		return (

			<table className = "table thead-dark table-bordered table-striped">
				<tr>
					<th colSpan = "10"></th>
					<th colSpan = "3">{addBtn}</th>
				</tr>
				  <tr>
				    <th>#</th>
				    <th>Room No.</th>
				    <th>Schedule</th>
				    <th>Time In</th>
				    <th>Time Out</th>
				    <th>Price</th>
				    <th>Availability</th>
				    <th>Requested</th>
				    <th>Date Requested</th>
				    <th>Approved</th>
				    <th>Date Approved</th>
				    <th>Image</th>
				    <th>Action</th>
				    
				  </tr>
				  {rows}	

			</table>



		)
			
	}
}

export default ViewItems