import React from 'react';
// eslint-disable-next-line
import M from 'materialize-css/dist/js/materialize.min.js';
import TableRow from './TableRow';
import GroupCard from '../GroupCard/GroupCard';
import CreateGroupsAlgorithm from './CreateGroupsAlgorithm'
import DeleteStudent from '../DeleteStudent/DeleteStudent';

class AdminPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			copyForms: this.props.submittedForms,
			groupsArray: [],
			testFormsArray: [
				{   
					id: 1,
					first_name: "Joey",
					last_name: "Garrets",
					availability: "Mixed",
					discipline_1: "Cyber Security",
					discipline_2: "None",
					discipline_3: "None",
					choice_1: "Project 7",
					choice_2: "Project 5",
					choice_3: "Project 2"
				},
				{   
					id: 2,
					first_name: "Michael",
					last_name: "Deleon",
					availability: "Evening",
					discipline_1: "Databases",
					discipline_2: "Programming",
					discipline_3: "None",
					choice_1: "Project 2",
					choice_2: "Project 5",
					choice_3: "Project 8"
				},
				{   
					id: 3,
					first_name: "Kira",
					last_name: "Blenman",
					availability: "Morning",
					discipline_1: "Web Development",
					discipline_2: "Programming",
					discipline_3: "Human-Computer Interfaces",
					choice_1: "Project 2",
					choice_2: "Project 5",
					choice_3: "Project 7"
				},
				{   
					id: 4,
					first_name: "Angelo",
					last_name: "Rittacco",
					availability: "Mixed",
					discipline_1: "Programming",
					discipline_2: "None",
					discipline_3: "None",
					choice_1: "Project 2",
					choice_2: "Project 5",
					choice_3: "Project 9"
				},
				{   
					id: 5,
					first_name: "Alan",
					last_name: "Winthrope",
					availability: "Evening",
					discipline_1: "Computer Networks",
					discipline_2: "Cyber Security",
					discipline_3: "None",
					choice_1: "Project 4",
					choice_2: "Project 7",
					choice_3: "Project 3"
				},
				{   
					id: 6,
					first_name: "Jonah",
					last_name: "Ryder",
					availability: "Evening",
					discipline_1: "Databases",
					discipline_2: "Cyber Security",
					discipline_3: "None",
					choice_1: "Project 2",
					choice_2: "Project 3",
					choice_3: "Project 8"
				},
				{   
					id: 7,
					first_name: "Jermaine",
					last_name: "Fells",
					availability: "Mixed",
					discipline_1: "Databases",
					discipline_2: "Cyber Security",
					discipline_3: "None",
					choice_1: "Project 8",
					choice_2: "Project 5",
					choice_3: "Project 7"
				},
				{   
					id: 8,
					first_name: "Adrian",
					last_name: "Delgado",
					availability: "Evening",
					discipline_1: "Programming",
					discipline_2: "None",
					discipline_3: "None",
					choice_1: "Project 6",
					choice_2: "Project 9",
					choice_3: "Project 2"
				},
				{   
					id: 9,
					first_name: "Lisa",
					last_name: "Presley",
					availability: "Evening",
					discipline_1: "Databases",
					discipline_2: "Computer Networks",
					discipline_3: "Cyber Security",
					choice_1: "Project 7",
					choice_2: "Project 1",
					choice_3: "Project 4"
				},
				{   
					id: 10,
					first_name: "Gladys",
					last_name: "Mesa",
					availability: "Mixed",
					discipline_1: "Programming",
					discipline_2: "Cyber Security",
					discipline_3: " Computer Networks",
					choice_1: "Project 3",
					choice_2: "Project 4",
					choice_3: "Project 9"
				},
				{   
					id: 11,
					first_name: "Luke",
					last_name: "Bishop",
					availability: "Evening",
					discipline_1: "None",
					discipline_2: "None",
					discipline_3: "None",
					choice_1: "Project 8",
					choice_2: "Project 6",
					choice_3: "Project 9"
				},
				{   
					id: 12,
					first_name: "Aimee",
					last_name: "Pollock",
					availability: "Morning",
					discipline_1: "Web Development",
					discipline_2: "Databases",
					discipline_3: "None",
					choice_1: "Project 5",
					choice_2: "Project 8",
					choice_3: "Project 1"
				},
				{   
					id: 13,
					first_name: "Ana",
					last_name: "Kent",
					availability: "Mixed",
					discipline_1: "Human-Computer Interfaces",
					discipline_2: "Web Development",
					discipline_3: "Databases",
					choice_1: "Project 2",
					choice_2: "Project 8",
					choice_3: "Project 1"
				},
				{   
					id: 14,
					first_name: "Lawrence",
					last_name: "Fisher",
					availability: "Morning",
					discipline_1: "Programming",
					discipline_2: "Web Development",
					discipline_3: "Databases",
					choice_1: "Project 1",
					choice_2: "Project 2",
					choice_3: "Project 5"
				},
				{   
					id: 15,
					first_name: "David",
					last_name: "Davilla",
					availability: "Mixed",
					discipline_1: "Programming",
					discipline_2: "Web Development",
					discipline_3: "Databases",
					choice_1: "Project 5",
					choice_2: "Project 2",
					choice_3: "Project 6"
				},
				{   
					id: 16,
					first_name: "Jaime",
					last_name: "Headly",
					availability: "Afternoon",
					discipline_1: "Computer Networks",
					discipline_2: "Programming",
					discipline_3: "None",
					choice_1: "Project 4",
					choice_2: "Project 5",
					choice_3: "Project 3"
				},
				{   
					id: 17,
					first_name: "Laurie",
					last_name: "Bell",
					availability: "Afternoon",
					discipline_1: "Human-Computer Interfaces",
					discipline_2: "Programming",
					discipline_3: "None",
					choice_1: "Project 9",
					choice_2: "Project 1",
					choice_3: "Project 5"
				},
				{   
					id: 18,
					first_name: "Pablo",
					last_name: "Picasso",
					availability: "Evening",
					discipline_1: "Programming",
					discipline_2: "Web Development",
					discipline_3: "None",
					choice_1: "Project 9",
					choice_2: "Project 2",
					choice_3: "Project 5"
				},
				{   
					id: 19,
					first_name: "Nicki",
					last_name: "Sholls",
					availability: "Mixed",
					discipline_1: "Programming",
					discipline_2: "None",
					discipline_3: "None",
					choice_1: "Project 4",
					choice_2: "Project 7",
					choice_3: "Project 5"
				},
				{   
					id: 20,
					first_name: "John",
					last_name: "Smith",
					availability: "Mixed",
					discipline_1: "Databases",
					discipline_2: "None",
					discipline_3: "None",
					choice_1: "Project 7",
					choice_2: "Project 6",
					choice_3: "Project 4"
				},	
				{   
					id: 21,
					first_name: "Maria",
					last_name: "Sanchez",
					availability: "Mixed",
					discipline_1: "Programming",
					discipline_2: "Databases",
					discipline_3: "None",
					choice_1: "Project 1",
					choice_2: "Project 8",
					choice_3: "Project 5"
				},		
			],
			testGroupsArray: [
				{	group_number: 1,
					group_members: ["Kira Blenman", "Michael Deleon", "Jonah Ryder", "Angelo Rittacco"] 
				},
				{	group_number: 2,
					group_members: ["Joe Black", "Anna Smith", "Jonny Bravo", "Yancy Rodgers"]
				},
				{	group_number: 3,
					group_members: ["Tobi Turner", "Jeff Beacon", "Tony Blair", "Joey Donald"]
				}
			],
		}
	}

	/* Runs the CreateGroupsAlgorithm, the algorithm returns an array which
	is then saved into the variable 'groupsCreated'. */
	onCreateGroups = () => {
		// Pass in the 'copyForms' state into the algoritm for processing.
		let groupsCreated = CreateGroupsAlgorithm(this.state.copyForms);

		/* Update the Admin page's 'groupsArray' state with the list of 
		created groups */
		this.updateGroupsArray(groupsCreated);
	}

	updateGroupsArray = (groupsCreated) => {
		this.setState(Object.assign(this.state, {groupsArray: groupsCreated}));
	}

	deleteStudentFromTable = (studentID) => {
		/* Find the index of the student to delete */
		let studentIndex = this.state.copyForms.findIndex(student => student.id === studentID);

		// Update forms array. Updating the array automatically updates the table. 
		let arrayCopy = this.state.copyForms;
		arrayCopy.splice(studentIndex, 1);
	
		this.setState(Object.assign(this.state, {copyForms: arrayCopy}));
	}

	render () {
		return (
			<div className="athelas flex flex-column mb4">
				<h1 className="f2 ttu tracked center pl4 pr4 pb2 lh-copy bb">Administrator Portal</h1>

				{/*Start of Forms Table*/}
				<div className="formsTable bt bb bw1 pl2 pr2">
					<table className="mt2 center ba mb3" id="formsTable">
						<thead className="bg-sea-glass">
							<tr>
								<th className="center ba w-10">ID</th>
								<th className="center ba w-10">First Name</th>
								<th className="center ba w-10">Last Name</th>
								<th className="center ba w-10">Availability</th>
								<th className="center ba w-10">Discipline 1</th>
								<th className="center ba w-10">Discipline 2</th>
								<th className="center ba w-10">Discipline 3</th>
								<th className="center ba w-10">Choice 1</th>
								<th className="center ba w-10">Choice 2</th>
								<th className="center ba w-10">Choice 3</th>
							</tr>
						</thead>

						<tbody id="tableBody">
							{/* Populate the table body with table rows (<tr>). Each row contains
							    the data from one form */ }
							{
								this.state.copyForms.map((form, i) => {
									return(
										<TableRow
											key={i}
											table_id={this.state.copyForms[i].id}
											first_name={this.state.copyForms[i].first_name}
											last_name={this.state.copyForms[i].last_name}
											availability={this.state.copyForms[i].availability}
											discipline_1={this.state.copyForms[i].discipline_1}
											discipline_2={this.state.copyForms[i].discipline_2}
											discipline_3={this.state.copyForms[i].discipline_3}
											choice_1={this.state.copyForms[i].choice_1}
											choice_2={this.state.copyForms[i].choice_2}
											choice_3={this.state.copyForms[i].choice_3}
										/>

										// <TableRow
										// 	key={i}
										// 	table_id={this.state.testFormsArray[i].id}
										// 	first_name={this.state.testFormsArray[i].first_name}
										// 	last_name={this.state.testFormsArray[i].last_name}
										// 	availability={this.state.testFormsArray[i].availability}
										// 	discipline_1={this.state.testFormsArray[i].discipline_1}
										// 	discipline_2={this.state.testFormsArray[i].discipline_2}
										// 	discipline_3={this.state.testFormsArray[i].discipline_3}
										// 	choice_1={this.state.testFormsArray[i].choice_1}
										// 	choice_2={this.state.testFormsArray[i].choice_2}
										// 	choice_3={this.state.testFormsArray[i].choice_3}
										// />
									);
								})
							}
						</tbody>		
					</table>
				</div>


				{/* Delete student component. Passes in a function */}
			  	<DeleteStudent deleteStudentFromTable={this.deleteStudentFromTable}/>


				{/* Create Groups Button */}
				<button 
				onClick={this.onCreateGroups}
				className="teal darken-2 btn waves-effect waves-light mt3 w-100 w-40-ns center mt4" type="submit" name="action">
					Create Groups
			  	</button>

			  	
			  	{/* Display created groups */}
			  	<h2 className="f2 ttu tracked center pl4 pr4 pb2 lh-copy bb mt4">Suggested Groups</h2>

			  	<div className="pa4 flex flex-wrap">
			  		{
			  			this.state.groupsArray.map((group, i) => {
			  				return(
			  					<GroupCard 
			  						key={i}
			  						group_number={this.state.groupsArray[i].group_number}
			  						group_members={this.state.groupsArray[i].group_members}
			  						group_project={this.state.groupsArray[i].group_project}
			  						group_availability={this.state.groupsArray[i].group_availability}
			  					/>
			  				)
			  			})
			  		}		
			  	</div>

			</div>
		);
	}

}

export default AdminPage;