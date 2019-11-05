import React from 'react';

const TableRow = ({ table_id, first_name, last_name, availability, discipline_1, discipline_2, discipline_3, choice_1, choice_2, choice_3 }) => {
	return (
		<tr>
			<td className="center ba w-10">{table_id}</td>
			<td className="center ba w-10">{first_name}</td>
			<td className="center ba w-10">{last_name}</td>
			<td className="center ba w-10">{availability}</td>
			<td className="center ba w-10">{discipline_1}</td>
			<td className="center ba w-10">{discipline_2}</td>
			<td className="center ba w-10">{discipline_3}</td>
			<td className="center ba w-10">{choice_1}</td>
			<td className="center ba w-10">{choice_2}</td>
			<td className="center ba w-10">{choice_3}</td>
		</tr> 
	);
}

export default TableRow;