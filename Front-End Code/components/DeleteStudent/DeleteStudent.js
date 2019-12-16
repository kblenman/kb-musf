import React from 'react';
// eslint-disable-next-line
import M from 'materialize-css/dist/js/materialize.min.js';

class DeleteStudent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			studentID: '',
			studentDeleted: '',
		}
	}

	onStudentIDChange = (event) => {
		this.setState({studentID: event.target.value});
		this.setState({studentDeleted: event.target.value});
	}

	displayDiv = (divID) => {
		let divToDisplay = document.getElementById(divID);
		divToDisplay.classList.remove("dn");

		setTimeout(() => {
			divToDisplay.classList.add("dn");
		}, 3000);
	}

	/* 
		Delete Student function. Gets the student's ID and if such an ID is
		found in the database, the student is deleted.
	*/
	onDeleteStudent = () => {
		let isValid = true;

		/* Validate student ID. Student ID must not be blank.*/
		if (this.state.studentID === '') {
			isValid = false;
		}

		/* Validate that the user doesn't enter anything greater than 200 */
		
		
		if (isValid) {
			/* Dialog box to confirm deletion */
			let isConfirmed = window.confirm("Are you sure you want to delete student " + this.state.studentID);

			if (isConfirmed) {
				/* Delete student from the database */
				fetch('http://localhost:3001/delete/' + this.state.studentID, {
					method: 'delete',
					headers: {'Content-type': 'application/json'},
				})
				.then(response => response.json())
				.then(data => {
					if (data !== 'Nothing deleted') {
						/* Remove student's row from the table and show alert */
						this.props.deleteStudentFromTable(Number(this.state.studentID));

						this.displayDiv("successful-delete");
					}
					else {
						this.displayDiv("unsuccessful-delete");
					}

					/* Reset state values */
					document.getElementById("studentIDInput").value = '';
					this.setState(Object.assign(this.state, {studentID: ''}));
				})
			}
			else {
				/* Reset state values */
				document.getElementById("studentIDInput").value = '';
				this.setState(Object.assign(this.state, {studentID: ''}));
			}
		}
		else {
			/* Reset state values */
			document.getElementById("studentIDInput").value = '';
			this.setState(Object.assign(this.state, {studentID: ''}));
		}
	}

	render () {
		return (
			<div className="pa3 flex flex-column bg-light-gray mt3 items-center">
		  		<p className="f3 mt0 ttu tracked bb pb2 pl4 pr4 tc">Delete a student from the database</p>
		  		<div className="f4 flex justify-center items-center w-100">
		  			<p className="mr4">Student ID: </p>
		  			<div className="w-10 mr4">
			  			<input 
							onChange={this.onStudentIDChange}
							placeholder="Student ID" id="studentIDInput" type="number" min="1" max="200"
						/>
		  			</div>
		  			<button
			  		onClick={this.onDeleteStudent}
			  		className="red darken-2 white-text btn waves-effect waves-light" type="submit" name="action">
			  			Delete
			  		</button>
			  	</div>


			  	
		  		{/* Confirmation messages for student deletes. (no/unsuccessful delete 
			  	and successful delete)*/}
		  		<div className="f4 ttu tracked center pa2 ma2 red-text text-darken-2 underline dn" id="unsuccessful-delete">
		  			<p>No student deleted</p>
		  		</div>

		  		<div className="f4 ttu tracked center pa2 ma2 green-text text-darken-2 underline dn" id="successful-delete">
		  			<p>Student {this.state.studentDeleted} deleted</p>
		  		</div>
			</div>
		);
	}
}


export default DeleteStudent;