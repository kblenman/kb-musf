import React from 'react';

class ProjectDescriptions extends React.Component {
	constructor() {
		super();
		this.state = {
			// eslint-disable-next-line
			projectDescText: "This project will require you to have some knowledge of \
			financial accounting.  I strongly recommend that you only consider this \
			project if a member of your group has taken (minimally) Principles of \
			Financial Accounting (ACG 2021) or something similar.  You will design a \
			system that can act as a GL, AP and AR system. It should be fully \
			functional and sufficient to support a small business.",

			projectDisciplines: ["Programming", "Human-Computer Interfaces", "Web Development"]
		}
	}

	/* Update the project description text and project discipline states based on what
	project is selected */
	onProjectDescChange = (event) => {
		if (event.target.value === "Project 1") {
			this.setState({projectDescText: `This project will require you to have some knowledge of 
			financial accounting.  I strongly recommend that you only consider this 
			project if a member of your group has taken (minimally) Principles of 
			Financial Accounting (ACG 2021) or something similar.  You will design a 
			system that can act as a GL, AP and AR system. It should be fully 
			functional and sufficient to support a small business.`});

			this.setState({projectDisciplines: ["Programming", "Human-Computer Interfaces", "Web Development"]});
		}
		else if (event.target.value === "Project 2") {
			this.setState({projectDescText: `Create a system where students can 
			enter their preferences and it will produce the "best matches" for 
			the course given certain constraints. You will need to consider the 
			following preferences: project preferences, time-of-day availability, 
			preference for synchronous versus asynchronous collaboration, and other 
			preferences that your group can think of. I could envision students being 
			required to enter their data on the first few days of courses and the system 
			then autoproducing a list of maximally compatible teams.`});

			this.setState({projectDisciplines: ["Programming", "Human-Computer Interfaces", "Web Development"]});
		}
		else if (event.target.value === "Project 3") {
			this.setState({projectDescText: `Visualize an empty field. Throughout that 
			field, you have low-cost sensors that are connected to low-cost processes 
			(e.g. arduinos or Raspberry Pi's). They are configured in a mesh network. 
			The sensors measure and can reproduce the movements of animals and people who 
			enter and exit the field. The output is to a website that graphically displays 
			recorded "events" where events are entries and exits of animals or people.`});

			this.setState({projectDisciplines: ["Programming", "Human-Computer Interfaces", "Web Development", "Computer Networks"]});
		}
		else if (event.target.value === "Project 4") {
			this.setState({projectDescText: `Using equipment that you will need to 
			purchase, build a network that is redundant at layer 2 (Ethernet), 
			layer 3 (TCP/IP), network services (e.g. DNS, DHCP) and at the 
			application level.`});

			this.setState({projectDisciplines: ["Computer Networks"]});
		}
		else if (event.target.value === "Project 5") {
			this.setState({projectDescText: `Create a system that will remind 
			each student to complete a weekly status report of their 
			contributions to their team's project. The system should email 
			the students and remind them to enter their status report if they fail 
			do to so by a specified time. The system should allow other 
			members of their team, the professor and the TA to see their 
			status reports (but not other teams).`});

			this.setState({projectDisciplines: ["Programming", "Human-Computer Interfaces", "Web Development", "Databases", "Cyber Security"]});
		}
		else if (event.target.value === "Project 6") {
			this.setState({projectDescText: `Traffic and road congestion is one of the 
			big challenges facing the Tampa Bay area. One possible solution is 
			the construction of more "co-working" facilities where workers 
			travel to shared offices around the area to reduce utilization of 
			the roadways. Using publicly available resources and/or your own 
			creativity, develop a traffic simulation and several "what if" 
			scenarios about how many cars would need to be taken off the road, 
			what are the optimal locations to construct co-working facilities, 
			what are the connectivity requirements for such facilities, etc.`});

			this.setState({projectDisciplines: ["Programming", "Human-Computer Interfaces"]});
		}
		else if (event.target.value === "Project 7") {
			this.setState({projectDescText: `You will build a system that focuses primarily 
			on information security; there will be different roles 
			(patients, nurses, doctors) with different privileges; you will be 
			required to demonstrate HIPAA compliance; you will be required to 
			implement 2FA; you will be required to have a variety of systems-level 
			security including but not limited to encrypted databases, intrusion 
			detection, robust vulnerability scanning, encrypted network 
			communications, etc. There must be some basic demonstrable functionality 
			but the focus is on making a highly secure system.`});

			this.setState({projectDisciplines: ["Programming", "Computer Networks", "Cyber Security"]});
		}
		else if (event.target.value === "Project 8") {
			this.setState({projectDescText: `Many/most applications rely on one 
			or more databases. The proper functioning of those databases is 
			critical; when the database fails, the system fails. Create a meaningful 
			application of your design (something where it would make sense for multiple 
			users to access it simultaneously) and create a highly robust, 
			scalable database architecture such that several copies of the master 
			database are maintained and redundant for each other. It should 
			facilitate multiple writes from multiple sources as well as multiple 
			reads. It should also avoid unnecessary database table locks.`});

			this.setState({projectDisciplines: ["Programming", "Human-Computer Interfaces", "Databases"]});
		}

		else if (event.target.value === "Project 9") {
			this.setState({projectDescText: `The proliferation of high-resolution 
			smart phones and inexpensive headsets (such as Google Cardboard or 
			Oculus Rift) as well as more advanced immersion technologies opens the door 
			for new and interesting virtual reality applications. So far, 
			a handful of games and immersion experiences have been developed. 
			In this project, you will think of a novel phone-based app that 
			will integrate with Google Cardboard and do something useful, 
			such as a virtual tour of a house. The game must be "playable" -- 
			meaning, it must have a purpose, and win and lose conditions.`});

			this.setState({projectDisciplines: ["Programming", "Human-Computer Interfaces", "Web Development"]});
		}
	}

	render() {
		return (
			<div className="athelas ba mt4 bg-white center w-100 w-80-ns shadow-4">
				<h4 className="f3 ttu tracked tc ma0 pa3 bg-sea-glass w-100 bb">Project Descriptions</h4>

				{/* Project select dropdown */}
				<div className="flex flex-column w-100 mb2">
					<select
					onChange={this.onProjectDescChange} 
					name="project-desc-selector" className="browser-default bg-near-white">
						<option value="Project 1">Project 1 - Financial Accounting System</option>
						<option value="Project 2">Project 2 - Student Matching System</option>
						<option value="Project 3">Project 3 - Mesh Network Sensor Array</option>
						<option value="Project 4">Project 4 - Redundant Network</option>
						<option value="Project 5">Project 5 - Status Reporting System</option>
						<option value="Project 6">Project 6 - Traffic Reduction</option>
						<option value="Project 7">Project 7 - Secure Electronic Medical Record System</option>
						<option value="Project 8">Project 8 - Application with Highly Redundant Databases</option>
						<option value="Project 9">Project 9 - Virtual Reality Game</option>
				    </select>
				</div>

				{/* Description Box */}
				<div className="w-100 w-90-ns mb2 center">
					<div className="pl4 pr4 pt2 pb2 lh-copy bb">
						<p>{this.state.projectDescText}</p>
					</div>
					<div>
						<p className="usf-green">Suggested Discipline(s):</p>
						<ul>
							{
								this.state.projectDisciplines.map((discipline, i) => {
									return(
										<li key={i} className="ma2">{this.state.projectDisciplines[i]}</li>
									);
								})
							}
						</ul>
					</div>
				</div>

			</div>
		);
	}
}

export default ProjectDescriptions;