import React from 'react';
import ProjectDescriptions from '../ProjectDescriptions/ProjectDescriptions';
// import ReactDOM from 'react-dom';
// eslint-disable-next-line
import M from 'materialize-css/dist/js/materialize.min.js';


class StudentForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			availability: 'Morning',
			discipline1: 'None',
			discipline2: 'None',
			discipline3: 'None',
			choice1: 'Project 1',
			choice2: 'Project 1',
			choice3: 'Project 1'
		}
	}

	onFirstNameChange = (event) => {
		this.setState({firstName: event.target.value});
	}

	onLastNameChange = (event) => {
		this.setState({lastName: event.target.value});
	}

	onAvailabilityChange = (event) => {
		this.setState({availability: event.target.value});
	}

	onDiscipline1Change = (event) => {
		this.setState({discipline1: event.target.value});
	}

	onDiscipline2Change = (event) => {
		this.setState({discipline2: event.target.value});
	}

	onDiscipline3Change = (event) => {
		this.setState({discipline3: event.target.value});
	}

	onChoice1Change = (event) => {
		this.setState({choice1: event.target.value});
	}

	onChoice2Change = (event) => {
		this.setState({choice2: event.target.value});
	}

	onChoice3Change = (event) => {
		this.setState({choice3: event.target.value});
	}

	onSubmitForm = () => {
		/* Check for form validity before sending */
		let isValid = true;

		if (this.state.firstName === "") {
			isValid = false;
		}
		else if (this.state.lastName === "") {
			isValid = false;
		}
		else if (this.state.choice1 === this.state.choice2 || 
			this.state.choice1 === this.state.choice3 ||
			this.state.choice2 === this.state.choice3) {
			isValid = false;
		}

		/* Check if the first or last name contains numbers, spaces, or special chracters.
		Solution help found at: 
		https://stackoverflow.com/questions/5778020/check-whether-an-input-string-contains-a-number-in-javascript*/
		let firstNameHasSpecial = /\d|\s|[~!@#$%^&*()_=+[\]{}:;,.<>/?'"¡™️£¢∞§¶•ªº–≠œ∑´®️†¥¨ˆøπ“‘«åß©️˙∆˚¬…æΩ≈˜µ≤≥÷ç√]|--/.test(this.state.firstName);
		let lastNameHasSpecial = /\d|\s|[~!@#$%^&*()_=+[\]{}:;,.<>/?'"¡™️£¢∞§¶•ªº–≠œ∑´®️†¥¨ˆøπ“‘«åß©️˙∆˚¬…æΩ≈˜µ≤≥÷ç√]|--/.test(this.state.lastName);

		if (lastNameHasSpecial || firstNameHasSpecial) {
			isValid = false;
		}


		/* 	Check for unique disciplines when the selected choice
			isnt 'None' */
		if (this.state.discipline1 !== "None") {
			if (this.state.discipline1 === this.state.discipline2 || 
			this.state.discipline1 === this.state.discipline3) {
				isValid = false;
			}
		}
		if (this.state.discipline2 !== "None") {
			if (this.state.discipline2 === this.state.discipline3) {
				isValid = false
			}
		}


		/* If everything is valid, send the form. If not, display the error
		   message. */
		if (isValid) {
			/* Transform the first and last name for server processing. */
			let lowerFirstName = this.state.firstName.toLowerCase();
			let newFirstName = lowerFirstName[0].toUpperCase() + lowerFirstName.slice(1);

			let lowerLastName = this.state.lastName.toLowerCase();
			let newLastName = lowerLastName[0].toUpperCase() + lowerLastName.slice(1);

			fetch('http://localhost:3001/submitform', {
				method: 'post',
				headers: {'Content-type': 'application/json'},
				body: JSON.stringify({
					first_name: newFirstName,
					last_name: newLastName,
					availability: this.state.availability,
					discipline_1: this.state.discipline1,
					discipline_2: this.state.discipline2,
					discipline_3: this.state.discipline3,
					choice_1: this.state.choice1,
					choice_2: this.state.choice2,
					choice_3: this.state.choice3
				})
			})
			.then(response => response.json())
			.then(student => {
				if (student) {
					console.log(student);
					this.props.onRouteChange('successfulSubmit');
				}
			})	
		}
		else {
			let errorAlertDiv = document.getElementById("submission-error");
			errorAlertDiv.classList.remove("dn");
		}
	}


	render() {
		return (
			<div className="athelas bg-light-gray flex flex-column f3 mt4 mb4 mr4 ml4 mr7-l ml7-l pa4 shadow-4">

				<h2 className="usf-green f2 ttu tracked bb">Basic Information</h2>

				{/*<!-- First and last name fields -->*/}
				<div className="flex flex-wrap justify-between tracked input-field">
					<div className="w-100 w-40-ns">
						<p className="mb2">* First Name</p>
						<input 
						onChange={this.onFirstNameChange}
						placeholder="First Name" id="first_name" type="text" required maxLength="30" 
						className="validate"/>
						<span className="helper-text" data-error="Required Field"></span>
					</div>
					<div className="w-100 w-40-ns">
						<p className="mb2">* Last Name</p>
						<input 
						onChange={this.onLastNameChange}
						placeholder="Last Name" id="last_name" type="text" required maxLength="30" 
						className="validate"/>
						<span className="helper-text" data-error="Required Field"></span>
					</div>
				</div>

				{/*<!-- Availability selectors -->*/}
				<div className="input-field mt0 w-40-ns">
					<p className="mb2">* When are you typically available?</p>
					<select 
					onChange={this.onAvailabilityChange}
					name="availability" className="browser-default" required>
						<option value="Morning">Morning (9 am - 2 pm)</option>
						<option value="Evening">Evening (3 pm and later)</option>
						<option value="Mixed">Mixed</option>
				    </select>
				</div>

				<h2 className="usf-green f2 ttu tracked bb">Project Information</h2>

				{/*<!-- Descipline selectors -->*/}
				<div className="input-field mt0 flex flex-column tc">
					<p className="mb3">Are there any IT disciplines you are already comfortable with?</p>
					<div className="flex flex-wrap justify-between mt2">
						<div className="w-100 w-30-ns mb3">
							<select 
							onChange={this.onDiscipline1Change}
							name="discipline_1" className="browser-default">
								<option value="None" defaultValue>None</option>
								<option value="Programming">Programming</option>
								<option value="Databases">Databases</option>
								<option value="Computer Networks">Computer Networks</option>
								<option value="Cyber Security">Cyber Security</option>
								<option value="Web Development">Web Development</option>
								<option value="Human-Computer Interfaces">Human-Computer Interfaces</option>
						    </select>
						</div>
						<div className="w-100 w-30-ns mb3">
						    <select 
						    onChange={this.onDiscipline2Change}
						    name="discipline_2" className="browser-default">
								<option value="None" defaultValue>None</option>
								<option value="Programming">Programming</option>
								<option value="Databases">Databases</option>
								<option value="Computer Networks">Computer Networks</option>
								<option value="Cyber Security">Cyber Security</option>
								<option value="Web Development">Web Development</option>
								<option value="Human-Computer Interfaces">Human-Computer Interfaces</option>
						    </select>
						</div>
						<div className="w-100 w-30-ns mb3">
						    <select 
						    onChange={this.onDiscipline3Change}
						    name="discipline_3" className="browser-default">
								<option value="None" defaultValue>None</option>
								<option value="Programming">Programming</option>
								<option value="Databases">Databases</option>
								<option value="Computer Networks">Computer Networks</option>
								<option value="Cyber Security">Cyber Security</option>
								<option value="Web Development">Web Development</option>
								<option value="Human-Computer Interfaces">Human-Computer Interfaces</option>
						    </select>
						</div>
					</div>
				</div>

				<div className="flex flex-column">
					<h3 className="f2 tc">What Projects would you like to work on?</h3>
					<p className="bg-white f4 pa2 tc lh-copy ba w-100 w-70-ns center">Choose three (3) projects with choice 1 being the 
					most preferred and choice 3 being the least preferred. You can view the descriptions of each project below.</p>
				</div>

				{/*<!-- Project descriptions area -->*/}
				<ProjectDescriptions />

				{/*<!-- Project selectors -->*/}
				<div className="mt0">
					<div className="input-field flex flex-wrap justify-between mt3">
						<div className="flex flex-column w-100 w-30-ns mb2">
							<p className="tc bb pa2 mb3">* Choice 1</p>
							<select 
							onChange={this.onChoice1Change}
							name="choice_1" className="browser-default" required>
								<option value="Project 1">Project 1</option>
								<option value="Project 2">Project 2</option>
								<option value="Project 3">Project 3</option>
								<option value="Project 4">Project 4</option>
								<option value="Project 5">Project 5</option>
								<option value="Project 6">Project 6</option>
								<option value="Project 7">Project 7</option>
								<option value="Project 8">Project 8</option>
								<option value="Project 9">Project 9</option>
						    </select>
						</div>

						<div className="flex flex-column w-100 w-30-ns mb2">
							<p className="tc bb pa2 mb3">* Choice 2</p>
							<select 
							onChange={this.onChoice2Change}
							name="choice_2" className="browser-default" required>
								<option value="Project 1">Project 1</option>
								<option value="Project 2">Project 2</option>
								<option value="Project 3">Project 3</option>
								<option value="Project 4">Project 4</option>
								<option value="Project 5">Project 5</option>
								<option value="Project 6">Project 6</option>
								<option value="Project 7">Project 7</option>
								<option value="Project 8">Project 8</option>
								<option value="Project 9">Project 9</option>
						    </select>
						</div>

						<div className="flex flex-column w-100 w-30-ns mb2">
							<p className="tc bb pa2 mb3">* Choice 3</p>
							<select 
							onChange={this.onChoice3Change}
							name="choice_3" className="browser-default" required>
								<option value="Project 1">Project 1</option>
								<option value="Project 2">Project 2</option>
								<option value="Project 3">Project 3</option>
								<option value="Project 4">Project 4</option>
								<option value="Project 5">Project 5</option>
								<option value="Project 6">Project 6</option>
								<option value="Project 7">Project 7</option>
								<option value="Project 8">Project 8</option>
								<option value="Project 9">Project 9</option>
						    </select>
						</div>
					</div>
				</div>

				{/*<!-- Sumbit form button -->*/}
				<button 
				onClick={this.onSubmitForm}
				className="teal darken-2 btn waves-effect waves-light mt3 w-100 w-40-ns center" type="submit" name="action">
					Submit
			  	</button>

			  	{/*<!-- Submit form error message */}
		  		<div className="athelas center w-100 w-60-ns mt4 ba dn" id="submission-error">
					<p className="bg-red text-white pa2 mt0">Submission Error!</p>
					<p className="f4 lh-copy pl3 pr3">Please ensure that: (1) The first and 
					last name fields are completed and do not contain numbers (2) each 
					discipline choice is different and (3) each project choice is different
					then try submitting again.</p>
				</div>

			  	{/*<!-- End of the student form -->*/}
			</div>
		);
	}
}

export default StudentForm;