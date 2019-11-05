import React from 'react';
// eslint-disable-next-line
import M from 'materialize-css/dist/js/materialize.min.js';
import TableRow from './TableRow';
import GroupCard from '../GroupCard/GroupCard';
import CreateGroupsAlgorithm from './CreateGroupsAlgorithm'

class AdminPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			copyForms: this.props.submittedForms,
			groupsArray: [],
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

						<tbody>
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
									);
								})
							}
						</tbody>			
					</table>
				</div>

				{/* Create Groups Button */}
				<button 
				onClick={this.onCreateGroups}
				className="teal darken-2 btn waves-effect waves-light mt3 w-100 w-40-ns center" type="submit" name="action">
					Create Groups
			  	</button>
			  	
			  	{/* Display created groups */}
			  	<h2 className="f2 ttu tracked center pl4 pr4 pb2 lh-copy bb mt5">Suggested Groups</h2>

			  	<div className="pa4 flex flex-wrap">
			  		{
			  			this.state.groupsArray.map((group, i) => {
			  				return(
			  					<GroupCard 
			  						key={i}
			  						group_number={this.state.groupsArray[i].group_number}
			  						group_members={this.state.groupsArray[i].group_members}
			  						group_project={this.state.groupsArray[i].group_project}
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