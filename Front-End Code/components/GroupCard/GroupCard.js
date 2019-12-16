import React from 'react';

const GroupCard = ({ group_number, group_members, group_project, group_availability }) => {
	return (
		<div className="ma4 h-25 w-20 bg-light-gray ba shadow-4">
			<h3 className="f2 ma0 pa2 tracked center bb bg-sea-glass">Group {group_number}</h3>

			<p className="f3 ma0 pa2 center bg-white bb i tracked">{group_project} - {group_availability}</p>

			<div className="flex flex-column items-center center f4 tracked">
				{	
					// Maps out the names of members, each wrapped in a <p> tag.
					group_members.map((name, i) => {
						return(
							<p key={i}>{group_members[i]}</p>
						)
					})
				}
			</div>

			
		</div>
	);
}

export default GroupCard;