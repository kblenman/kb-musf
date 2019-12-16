const CreateGroupsAlgorithm = (forms) => {
	/* 	
		This algorithm will create groups of at least 3 but no more than 
		4. It will try to group people based on compatible time of day and
		project choices starting from most preferred to least preferred. 

		Availability Compatability Rules:
		- 'Mixed' and 'Afternoon' are compatible with any availability. 

			NOTE: The reasoning behind making afternoon variable is because the 
			afternoon timeslot covers late morning and early evening thus
			I believe that they would have a slight flexibility that will still
			allow them to work well with other times, similar to mixed. 
			With that being said we might want to consider getting rid of the 
			'Afternoon' option as we continue developing.

		- 'Morning' is primarily compatible with itself but secondarily
		compatible with 'Mixed' and 'Afternoon'.

		- Afternoon is primarily compatible with itself but secondarily compatible
		with 'Mixed' and 'Afternoon'

	*/

	/* 	------------------------------------------ 
		Functions
		------------------------------------------
	*/

	// 	This function returns an array of students that are not assigned to a group
	const GetUnassignedStudents = (studentForms) => {
		let unassignedStudentsArray = [];

		studentForms.forEach(student => {
			if (student.assigned_group === "None") {
				unassignedStudentsArray.push(student);
			}
		});

		return unassignedStudentsArray;
	}

	/* 	This function creates groups of N length then returns the current group number
		after creating the group(s) */
	const CreateGroupOfN = (num, array, currentGroupNumber, project) => {
		let filteredArray = array;

		/* 	Assign the available time of the group. Set it as 'mixed' 
			initially and have it change if someone in the group is morning 
			or evening 
		*/
		let groupsAvailability = 'Mixed';

		filteredArray.forEach(student => {
			if (student.availability === 'Morning'){
				groupsAvailability = 'Morning';
			}
			else if (student.availability === 'Evening') {
				groupsAvailability = 'Evening';
			}
		})

		while (filteredArray.length !== 0) {
			let currentGroup = new CreateGroup(currentGroupNumber, [], project, groupsAvailability);

			/* While the current group has less than N people, keep adding students 
			from the filtered array. */
			while (currentGroup.group_members.length !== num && filteredArray.length !== 0) {

				// Push the first and last name of the unassigned student at index 0
				currentGroup.group_members.push(filteredArray[0].first_name + " " + filteredArray[0].last_name);

				/* Get the id and the index within studentForms of the student 
				that was just pushed */
				let studentID = filteredArray[0].id;
				let studentIndex = studentForms.findIndex(student => student.id === studentID);

				// Reassign the assigned_group property of the pushed student within studentForms
				studentForms[studentIndex].assigned_group = currentGroupNumber;

				// Remove the pushed student (index 0) from the filtered array
				filteredArray.splice(0, 1);
			}

			// Push the current group to the createdGroups array
			createdgroupsArray.push(currentGroup);

			// Update current group number
			currentGroupNumber++;
		}

		return currentGroupNumber;
	}

	//	This function adds a single student to an existing group
	const AddStudentToGroup = (student, group) => {

		// Push the first and last name of the unassigned student at index 0
		group.group_members.push(student.first_name + " " + student.last_name);

		/* Get the id and the index within studentForms of the student 
		that was just pushed */
		let studentID = student.id;
		let studentIndex = studentForms.findIndex(student => student.id === studentID);

		// Reassign the assigned_group property of the pushed student within studentForms
		studentForms[studentIndex].assigned_group = group.group_number;
	}

	/* 	This functions checks an array of possible candidates to 
		see if any of them can be added to the existing group in
		question. If the group is open and there is a match, 
		it adds the student to that group.
	*/
	const GroupSizeCheckAndAdd = (group, possibleCandidates) => {
		/* If the group isn't maxed out, add someone that matches */
		if (group.group_members.length < 4) {
			if (possibleCandidates.length !== 0) {
				for (let i = 0; i < possibleCandidates.length; i++) {

					/* 	If the current iterated candidate availability is compatible,
						add them and then break out the loop. Mixed 
						availability groups can take anyone.
					*/
					if (group.group_availability === 'Mixed') {
						AddStudentToGroup(possibleCandidates[i], group);
						break;
					}
					else if (possibleCandidates[i].availability === "Mixed" ||
						possibleCandidates[i].availability === "Afternoon" ||
						possibleCandidates[i].availability === group.group_availability) {

						// Add candidate to the group
						AddStudentToGroup(possibleCandidates[i], group);

						break;
					}
				}
			}
		}
	}



	/* 	------------------------------------------ 
		Initialize Global Variables 
		------------------------------------------
	*/

	let studentForms = forms;
	let createdgroupsArray = [];

	/* 	Add a property called 'assigned_group' to each form object in the 
		studentForms array to keep track of what group a student has been 
		assigned to. */
	studentForms.forEach(student => {
		student.assigned_group = "None";
	});

	/* 	Prototype of group objects */
	function CreateGroup(group_number, group_members, group_project, group_availability) {
		this.group_number = group_number;
		this.group_members = group_members;
		this.group_project = group_project;
		this.group_availability = group_availability;
	}

	/* 	Keep track of students that haven't been assigned a group and the current
		group number. */
	let unassignedStudents = GetUnassignedStudents(studentForms);
	let currentGroupNumber = 1;

	/* 	Array of projects */
	const PROJECTS_ARRAY = ['Project 1', 'Project 2', 'Project 3', 'Project 4',
	'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9'];




	/* 	--------------------------------------------------- 
		The Algorithm 
		---------------------------------------------------
	*/

	/* 	----
		STEP 1: Get rid of projects that don't have enough demand on level 1 
		or level 2 (2 or less students). 
		---
	*/

	/* 	Create a new projects array that can be modified.

		NOTE: I had to make a new array variable because based on how forEach 
		(or for) loops work, if the array is modified in the middle of the 
		loop, it can accidentally throw off the counter and skip array elements. 
		In my initial test case, I was skipping Project 4's iteration after project 3 
		was removed. 
	*/
	let modifiedProjectsArray = [];


	/* 	For each project in PROJECTS_ARRAY, count how many student picked that
		project. If 3 or more students picked that project, add it to 
		modifiedProjectsArray. 
	*/
	PROJECTS_ARRAY.forEach(project => {
		let projectDemand = unassignedStudents.filter(student => 
			student.choice_1 === project ||
			student.choice_2 === project);

		if (projectDemand.length > 2) {
			modifiedProjectsArray.push(project);
		}
	});


	/*
		----
		STEP 2

		Create groups of 3 where possible based on shared choice 1 and 
		compatible times.
		----

	 	For each project in modifiedProjectsArray, get a list of students from
		unassignedStudents that picked that project as their first choice and 
		store them into three separate arrays based on the students availability 
		(morningCompatibleFilter, eveningCompatibleFilter, and mixedAvailability). 

		Create groups of 3 or 4 for each availabilty type, grabbing from 
		mixedAvailability when possible if an availability type isn't divisible 
		by 3 or 4 yet.

	*/
	modifiedProjectsArray.forEach(project => {

		let mixedAvailability = unassignedStudents.filter(student =>
			(student.availability === 'Mixed' || 
			student.availability === 'Afternoon') &&
			student.choice_1 === project);


		/* --- GROUP MORNING --- */ 

		let morningCompatibleFilter = unassignedStudents.filter(student =>
			student.availability === 'Morning' &&
			student.choice_1 === project);

		/* 	If morningCompatibleFilter is already divisible by 3 or 4,
			create groups of 3 or 4. 
			
			Else, check if it's length is greater than 5 and mixedAvailability
			is empty. If it is, pop students from morningCompatibleFilter until 
			it is divisible by 3 or 4.

			Finally, if the above conditions still aren't met, check if 
			morningCompatibleFilter has a length of one or more and 
			mixedAvailability isn't empty. If so, add people from 
			mixedAvailability until it is divisible by 3 or 4. 
		 */
		if (morningCompatibleFilter.length % 4 === 0) {
			currentGroupNumber = CreateGroupOfN(4, morningCompatibleFilter, currentGroupNumber, project);
		}
		else if (morningCompatibleFilter.length % 3 === 0) {
			currentGroupNumber = CreateGroupOfN(3, morningCompatibleFilter, currentGroupNumber, project);
		}
		else if (morningCompatibleFilter >= 5 && mixedAvailability.length === 0) {
			while (true) {
				// 	Pop off the last student 
				morningCompatibleFilter.pop()

				/* 	Check if the array is divisible by 3 or 4. If it is, create group(s) 
					and break out the loop
				*/
				if (morningCompatibleFilter.length % 4 === 0) {
					currentGroupNumber = CreateGroupOfN(4, morningCompatibleFilter, currentGroupNumber, project);
					break;
				}
				else if (morningCompatibleFilter.length % 3 === 0) {
					currentGroupNumber = CreateGroupOfN(3, morningCompatibleFilter, currentGroupNumber, project);
					break;
				}
			}
		}
		else if (morningCompatibleFilter.length >= 1 && mixedAvailability.length !== 0) {
			while (true) {
				if (mixedAvailability.length !== 0) {
					// Append a mixed availability student
					let studentToAppend = mixedAvailability[0];
					morningCompatibleFilter.push(studentToAppend);

					// Remove the added student from mixedAvailability array
					mixedAvailability.splice(0, 1);
				}
				// break out the loop if there aren't anymore mixed availability students to add
				else {
					break;
				}

				// Check if the array is now divisible. break out the loop if it is.
				if (morningCompatibleFilter.length % 3 === 0 || morningCompatibleFilter.length % 4 === 0) {
					break;
				}
			}


			/* 	Create group(s) (if possible) */
			if (morningCompatibleFilter.length % 4 === 0) {
				currentGroupNumber = CreateGroupOfN(4, morningCompatibleFilter, currentGroupNumber, project);
			}
			else if (morningCompatibleFilter.length % 3 === 0) {
				currentGroupNumber = CreateGroupOfN(3, morningCompatibleFilter, currentGroupNumber, project);
			}
			else if (morningCompatibleFilter.length >= 5) {
				// Reset mixed students array 
				mixedAvailability = unassignedStudents.filter(student =>
					(student.availability === 'Mixed' || 
					student.availability === 'Afternoon') &&
					student.choice_1 === project);

				// Remove students from morning array until it is divisible.
				while (true) {
					// 	Pop off the last student 
					morningCompatibleFilter.pop()

					/* 	Check if the array is divisible by 3 or 4. If it is, create group(s) 
						and break out the loop
					*/
					if (morningCompatibleFilter.length % 4 === 0) {
						currentGroupNumber = CreateGroupOfN(4, morningCompatibleFilter, currentGroupNumber, project);
						break;
					}
					else if (morningCompatibleFilter.length % 3 === 0) {
						currentGroupNumber = CreateGroupOfN(3, morningCompatibleFilter, currentGroupNumber, project);
						break;
					}
				}
			}
			else {
				// Reset mixed students array 
				mixedAvailability = unassignedStudents.filter(student =>
					(student.availability === 'Mixed' || 
					student.availability === 'Afternoon') &&
					student.choice_1 === project);
			}
		}


		/* --- GROUP EVENING --- */ 

		let eveningCompatibleFilter = unassignedStudents.filter(student =>
			student.availability === 'Evening' &&
			student.choice_1 === project);

		
		/* Repeat above but with the eveningCompatibleFilter */

		if (eveningCompatibleFilter.length % 4 === 0) {
			currentGroupNumber = CreateGroupOfN(4, eveningCompatibleFilter, currentGroupNumber, project);
		}
		else if (eveningCompatibleFilter.length % 3 === 0) {
			currentGroupNumber = CreateGroupOfN(3, eveningCompatibleFilter, currentGroupNumber, project);
		}
		else if (eveningCompatibleFilter >= 5 && mixedAvailability.length === 0) {
			while (true) {
				eveningCompatibleFilter.pop()

				if (eveningCompatibleFilter.length % 4 === 0) {
					currentGroupNumber = CreateGroupOfN(4, eveningCompatibleFilter, currentGroupNumber, project);
					break;
				}
				else if (eveningCompatibleFilter.length % 3 === 0) {
					currentGroupNumber = CreateGroupOfN(3, eveningCompatibleFilter, currentGroupNumber, project);
					break;
				}
			}
		}
		else if (eveningCompatibleFilter.length >= 1 && mixedAvailability.length !== 0) {
			while (true) {
				if (mixedAvailability.length !== 0) {

					let studentToAppend = mixedAvailability[0];
					eveningCompatibleFilter.push(studentToAppend);

					mixedAvailability.splice(0, 1);
				}

				else {
					break;
				}

				if (eveningCompatibleFilter.length % 3 === 0 || eveningCompatibleFilter.length % 4 === 0) {
					break;
				}
			}

			if (eveningCompatibleFilter.length % 4 === 0) {
				currentGroupNumber = CreateGroupOfN(4, eveningCompatibleFilter, currentGroupNumber, project);
			}
			else if (eveningCompatibleFilter.length % 3 === 0) {
				currentGroupNumber = CreateGroupOfN(3, eveningCompatibleFilter, currentGroupNumber, project);
			}
			else if (eveningCompatibleFilter.length >= 5) {
				mixedAvailability = unassignedStudents.filter(student =>
					(student.availability === 'Mixed' || 
					student.availability === 'Afternoon') &&
					student.choice_1 === project);

				while (true) {
					eveningCompatibleFilter.pop()

					if (eveningCompatibleFilter.length % 4 === 0) {
						currentGroupNumber = CreateGroupOfN(4, eveningCompatibleFilter, currentGroupNumber, project);
						break;
					}
					else if (eveningCompatibleFilter.length % 3 === 0) {
						currentGroupNumber = CreateGroupOfN(3, eveningCompatibleFilter, currentGroupNumber, project);
						break;
					}
				}
			}
			else {
				mixedAvailability = unassignedStudents.filter(student =>
					(student.availability === 'Mixed' || 
					student.availability === 'Afternoon') &&
					student.choice_1 === project);
			}
		}

		/* --- GROUP REMAINING (MIXED) STUDENTS --- */

		/* 	If the remaining mixed students length is divisible by 3 or 4, create 
			a group out of them. If the length is greater than or equal to 5, remove 
			students until it is divisible then create a group. The removed student(s) 
			will have the chance to join another open group meeting their first choice 
			in the next step. */

		if (mixedAvailability.length !== 0) {
			if (mixedAvailability.length % 4 === 0) {
				currentGroupNumber = CreateGroupOfN(4, mixedAvailability, currentGroupNumber, project);
			}
			else if (mixedAvailability.length % 3 === 0) {
				currentGroupNumber = CreateGroupOfN(3, mixedAvailability, currentGroupNumber, project);
			}
			else if (mixedAvailability.length >= 5) {
				while (true) {

					mixedAvailability.pop()

					if (mixedAvailability.length % 4 === 0) {
						currentGroupNumber = CreateGroupOfN(4, mixedAvailability, currentGroupNumber, project);
						break;
					}
					else if (mixedAvailability.length % 3 === 0) {
						currentGroupNumber = CreateGroupOfN(3, mixedAvailability, currentGroupNumber, project);
						break;
					}
				}
			}
		}
	})

	/* 	
		----
		STEP 3
		----

		Taking note of the created groups so far, If a group isn't full try to 
		add in available students. The student must have a compatible time with 
		the group and shared choice_1 with the project to be added.
	*/

	// Update unassignedStudents
	unassignedStudents = GetUnassignedStudents(studentForms);

	createdgroupsArray.forEach(group => {
		unassignedStudents = GetUnassignedStudents(studentForms);

		/* 	Get the list of students that have the project as choice_1 and 
			are still unassigned */
		let possibleCandidates = unassignedStudents.filter(student => 
			student.choice_1 === group.group_project);

		GroupSizeCheckAndAdd(group, possibleCandidates);
	})

	unassignedStudents = GetUnassignedStudents(studentForms);


	/* 
		----
		STEP 4

		Fill almost completed project groups on level 1.
		----

		Look for projects at least 2 people but no more than 3 sharing 
		the same choice_1. If there is such a group, and 2 have compatible 
		times, place them into the 'almostCompletedGroups' array and attempt 
		to find one more person OUTSIDE of the 'almostCompletedGroups'array 
		with a compatible time and the same project listed as their choice 2 or 
		choice 3 to make that group complete. If it can't find anyone continue 
		on. If it can, add them and create a group.

		SIDE THOUGHTS - This round of grouping brought up a choice dilemma
		for myself regarding the rest of the code: Either fill out 
		existing/almost completed groups first at the expense of someone being 
		put into their 2nd or 3rd choice or try to make it so that
		people are only put in there 1st or 2nd choice. To make things simpler
		and give the chance to groups that are extremely close to being completed,
		I decided to prioritize completing groups.
	*/

	// 	Update unassignedStudents
	unassignedStudents = GetUnassignedStudents(studentForms);

	let almostCompletedGroups = [];

	modifiedProjectsArray.forEach(project => {
		// 	Get students that chose the project as their 1st choice.
		let choseProject = unassignedStudents.filter(student =>
			student.choice_1 === project);

		if (choseProject.length >= 2 && choseProject.length <= 3) {
			// 	First try out morning compatibility 
			let morningCompatibleFilter = choseProject.filter(student => 
				student.availability === 'Morning' ||
				student.availability === 'Mixed' ||
				student.availability === 'Afternoon');

			if (morningCompatibleFilter.length === 2) {
				almostCompletedGroups.push(morningCompatibleFilter);
			}
			// 	Else, try for evening compatability
			else {
				let eveningCompatibleFilter = choseProject.filter(student => 
				student.availability === 'Evening' ||
				student.availability === 'Mixed' ||
				student.availability === 'Afternoon');

				if (eveningCompatibleFilter.length === 2) {
					almostCompletedGroups.push(eveningCompatibleFilter);
				}
			}
		}
	})


	/* 	Loop through each group in almost completed and attempt
		to fill it. */

	almostCompletedGroups.forEach(group => {
		// update unassigned students
		unassignedStudents = GetUnassignedStudents(studentForms);

		/* 	Assign the current groups available time. Set it as
			'mixed' initially and have it change if someone in the group
			is morning or evening */
		let groupsAvailability = 'Mixed';

		group.forEach(student => {
			if (student.availability === 'Morning'){
				groupsAvailability = 'Morning';
			}
			else if (student.availability === 'Evening') {
				groupsAvailability = 'Evening';
			}
		})


		/* 	Get a list of possible candidates. Possible candidates
			have the current group's project as their 2nd choice or 
			3rd choice
		*/
		let possibleCandidates = [];

		// Get choice 2 students first then choice 3
		let choice2Students = unassignedStudents.filter(student => 
			student.choice_2 === group[0].choice_1);

		let choice3Students = unassignedStudents.filter(student => 
			student.choice_3 === group[0].choice_1);

		// Combine choice 2 and choice 3 arrays together, in order.
		possibleCandidates = choice2Students.concat(choice3Students);

		/* 	If possibleCandidates isn't empty, loop through to see if 
			any of the candidates are compatible on availability */
		if (possibleCandidates.length !== 0) {
			for (let i = 0; i < possibleCandidates.length; i++) {

				/* 	Check if the current candidate is already in another 
					almost completed group. If they are, skip over that
					iteration. */
				let candidateID = possibleCandidates[i].id;
				let choiceConflict = false;

				almostCompletedGroups.forEach(group => {
					group.forEach(student => {
						if (student.id === candidateID) {
							choiceConflict = true;
						}
					})
				})

				if (choiceConflict) {
					continue;
				}


				/* 	If the current iterated candidate doesn't have a choice conflict and their 
					availability is compatible, add them to the current group list,
					create a group then break out the loop.
				*/
				if (possibleCandidates[i].availability === "Mixed" ||
					possibleCandidates[i].availability === "Afternoon" ||
					possibleCandidates[i].availability === groupsAvailability) {

					// Add candidate to the group
					group.push(possibleCandidates[i]);

					// Create a group of three
					currentGroupNumber = CreateGroupOfN(3, group, currentGroupNumber, group[0].choice_1);

					break;
				}
			}
		}
	})

	/* 	
		----
		STEP 5
		----

		Taking note of the created groups so far, If a group isn't full try to 
		add in available students. The student must have a compatible time with 
		the group and shared choice_1 or choice_2 with the project to be added.
	*/

	// Update unassignedStudents
	unassignedStudents = GetUnassignedStudents(studentForms);

	createdgroupsArray.forEach(group => {
		unassignedStudents = GetUnassignedStudents(studentForms);

		/* 	Get the list of students that have the project as choice_1 and 
			are still unassigned */
		let possibleCandidates = unassignedStudents.filter(student => 
			student.choice_1 === group.group_project ||
			student.choice_2 === group.group_project);

		GroupSizeCheckAndAdd(group, possibleCandidates);
	})

	// 	Update unassignedStudents
	unassignedStudents = GetUnassignedStudents(studentForms);

	/* 
		----
		STEP 6

		Create groups of 3 where possible based on shared choice 1 or 
		choice 2 and compatible times. Similiar to STEP 2.
		----

		For each project in modifiedProjectsArray, get a list of students from
		unassignedStudents that picked that project as their 1st or 2nd choice 
		and store them in the arrays. Create groups of three where possible.
	*/

	modifiedProjectsArray.forEach(project => {
		// 	Update unassignedStudents
		unassignedStudents = GetUnassignedStudents(studentForms);

		let mixedAvailability = unassignedStudents.filter(student =>
			(student.availability === 'Mixed' || 
			student.availability === 'Afternoon') &&
			(student.choice_1 === project ||
			student.choice_2 === project));


		/* --- GROUP MORNING --- */ 

		let morningCompatibleFilter = unassignedStudents.filter(student =>
			student.availability === 'Morning' &&
			(student.choice_1 === project ||
			 student.choice_2 === project));

		if (morningCompatibleFilter.length % 4 === 0) {
			currentGroupNumber = CreateGroupOfN(4, morningCompatibleFilter, currentGroupNumber, project);
		}
		else if (morningCompatibleFilter.length % 3 === 0) {
			currentGroupNumber = CreateGroupOfN(3, morningCompatibleFilter, currentGroupNumber, project);
		}
		else if (morningCompatibleFilter >= 5 && mixedAvailability.length === 0) {
			while (true) {
				morningCompatibleFilter.pop()

				if (morningCompatibleFilter.length % 4 === 0) {
					currentGroupNumber = CreateGroupOfN(4, morningCompatibleFilter, currentGroupNumber, project);
					break;
				}
				else if (morningCompatibleFilter.length % 3 === 0) {
					currentGroupNumber = CreateGroupOfN(3, morningCompatibleFilter, currentGroupNumber, project);
					break;
				}
			}
		}
		else if (morningCompatibleFilter.length >= 1 && mixedAvailability.length !== 0) {
			while (true) {
				if (mixedAvailability.length !== 0) {
					// Append a mixed availability student
					let studentToAppend = mixedAvailability[0];
					morningCompatibleFilter.push(studentToAppend);

					// Remove the added student from mixedAvailability array
					mixedAvailability.splice(0, 1);
				}
				// break out the loop if there aren't anymore mixed availability students to add
				else {
					break;
				}

				// Check if the array is now divisible. break out the loop if it is.
				if (morningCompatibleFilter.length % 3 === 0 || morningCompatibleFilter.length % 4 === 0) {
					break;
				}
			}


			/* 	Create group(s) (if possible) */
			if (morningCompatibleFilter.length % 4 === 0) {
				currentGroupNumber = CreateGroupOfN(4, morningCompatibleFilter, currentGroupNumber, project);
			}
			else if (morningCompatibleFilter.length % 3 === 0) {
				currentGroupNumber = CreateGroupOfN(3, morningCompatibleFilter, currentGroupNumber, project);
			}
			else if (morningCompatibleFilter.length >= 5) {
				// Reset mixed students array 
				mixedAvailability = unassignedStudents.filter(student =>
					(student.availability === 'Mixed' || 
					student.availability === 'Afternoon') &&
					(student.choice_1 === project ||
					student.choice_2 === project));

				// Remove students from morning array until it is divisible.
				while (true) {

					morningCompatibleFilter.pop()

					if (morningCompatibleFilter.length % 4 === 0) {
						currentGroupNumber = CreateGroupOfN(4, morningCompatibleFilter, currentGroupNumber, project);
						break;
					}
					else if (morningCompatibleFilter.length % 3 === 0) {
						currentGroupNumber = CreateGroupOfN(3, morningCompatibleFilter, currentGroupNumber, project);
						break;
					}
				}
			}
			else {
			// Reset mixed students array 
				mixedAvailability = unassignedStudents.filter(student =>
					(student.availability === 'Mixed' || 
					student.availability === 'Afternoon') &&
					(student.choice_1 === project ||
					student.choice_2 === project));
			}
		}


		/* --- GROUP EVENING --- */ 

		let eveningCompatibleFilter = unassignedStudents.filter(student =>
			student.availability === 'Evening' &&
			(student.choice_1 === project ||
			 student.choice_2 === project));

		
		/* Repeat above but with the eveningCompatibleFilter */

		if (eveningCompatibleFilter.length % 4 === 0) {
			currentGroupNumber = CreateGroupOfN(4, eveningCompatibleFilter, currentGroupNumber, project);
		}
		else if (eveningCompatibleFilter.length % 3 === 0) {
			currentGroupNumber = CreateGroupOfN(3, eveningCompatibleFilter, currentGroupNumber, project);
		}
		else if (eveningCompatibleFilter >= 5 && mixedAvailability.length === 0) {
			while (true) {

				eveningCompatibleFilter.pop()

				if (eveningCompatibleFilter.length % 4 === 0) {
					currentGroupNumber = CreateGroupOfN(4, eveningCompatibleFilter, currentGroupNumber, project);
					break;
				}
				else if (eveningCompatibleFilter.length % 3 === 0) {
					currentGroupNumber = CreateGroupOfN(3, eveningCompatibleFilter, currentGroupNumber, project);
					break;
				}
			}
		}
		else if (eveningCompatibleFilter.length >= 1 && mixedAvailability.length !== 0) {
			while (true) {
				if (mixedAvailability.length !== 0) {

					let studentToAppend = mixedAvailability[0];
					eveningCompatibleFilter.push(studentToAppend);

					mixedAvailability.splice(0, 1);
				}
				else {
					break;
				}

				if (eveningCompatibleFilter.length % 3 === 0 || eveningCompatibleFilter.length % 4 === 0) {
					break;
				}
			}

			/* 	Create group(s) if possible */
			if (eveningCompatibleFilter.length % 4 === 0) {
				currentGroupNumber = CreateGroupOfN(4, eveningCompatibleFilter, currentGroupNumber, project);
			}
			else if (eveningCompatibleFilter.length % 3 === 0) {
				currentGroupNumber = CreateGroupOfN(3, eveningCompatibleFilter, currentGroupNumber, project);
			}
			else if (eveningCompatibleFilter.length >= 5) {
				// Reset mixed students array 
				mixedAvailability = unassignedStudents.filter(student =>
					(student.availability === 'Mixed' || 
					student.availability === 'Afternoon') &&
					(student.choice_1 === project ||
					student.choice_2 === project));

				while (true) {

					eveningCompatibleFilter.pop()

					if (eveningCompatibleFilter.length % 4 === 0) {
						currentGroupNumber = CreateGroupOfN(4, eveningCompatibleFilter, currentGroupNumber, project);
						break;
					}
					else if (eveningCompatibleFilter.length % 3 === 0) {
						currentGroupNumber = CreateGroupOfN(3, eveningCompatibleFilter, currentGroupNumber, project);
						break;
					}
				}
			}
			else {
				// Reset mixed students array 
				mixedAvailability = unassignedStudents.filter(student =>
					(student.availability === 'Mixed' || 
					student.availability === 'Afternoon') &&
					(student.choice_1 === project ||
					student.choice_2 === project));
			}
		}

		/* --- GROUP REMAINING (MIXED) STUDENTS --- */

		/* 	If the remaining mixed students length is divisible by 3 or 4, create a group 
			out of them. If the length is greater than or equal to 5, remove 
			students until it is divisible then create a group. */

		if (mixedAvailability.length !== 0) {
			if (mixedAvailability.length % 4 === 0) {
				currentGroupNumber = CreateGroupOfN(4, mixedAvailability, currentGroupNumber, project);
			}
			else if (mixedAvailability.length % 3 === 0) {
				currentGroupNumber = CreateGroupOfN(3, mixedAvailability, currentGroupNumber, project);
			}
			else if (mixedAvailability.length >= 5) {
				while (true) {
					// 	Pop off the last student in mixedAvailability
					mixedAvailability.pop()

					/* 	Check if the array is divisible by 3 or 4. If it is, create group(s) 
						and break out the loop
					*/
					if (mixedAvailability.length % 4 === 0) {
						currentGroupNumber = CreateGroupOfN(4, mixedAvailability, currentGroupNumber, project);
						break;
					}
					else if (mixedAvailability.length % 3 === 0) {
						currentGroupNumber = CreateGroupOfN(3, mixedAvailability, currentGroupNumber, project);
						break;
					}
				}
			}
		}
	})

	/* 
		----
		STEP 7

		Fill almost completed project groups on levels 1 and 2.
		Similar to STEP 4.
		----

		Look for projects with atleast 2 but no more than 3 
		people sharing the same choice 1 and 2. If there is such a group, 
		and 2 have compatible times, place them into the 'almostCompletedGroups' 
		array and attempt to find one more person OUTSIDE of the 
		'almostCompletedGroups'array with a compatible 
		time and the same project listed as their choice 2 or choice 3
		to make that group complete. If it can't find anyone continue on. 
		If it can, add them and create a group.
	*/

	// 	Update unassignedStudents
	unassignedStudents = GetUnassignedStudents(studentForms);

	// Reset almostCompletedGroups
	almostCompletedGroups = [];

	modifiedProjectsArray.forEach(project => {
		// 	Get students that chose the project as their 1st or 2nd choice.
		let choseProject = unassignedStudents.filter(student =>
			student.choice_1 === project ||
			student.choice_2 === project);

		if (choseProject.length >= 2 && choseProject.length <= 3) {
			// 	First try out morning compatibility 
			let morningCompatibleFilter = choseProject.filter(student => 
				student.availability === 'Morning' ||
				student.availability === 'Mixed' ||
				student.availability === 'Afternoon');

			if (morningCompatibleFilter.length === 2) {
				almostCompletedGroups.push(morningCompatibleFilter);
			}
			// 	Else, try for evening compatability
			else {
				let eveningCompatibleFilter = choseProject.filter(student => 
				student.availability === 'Evening' ||
				student.availability === 'Mixed' ||
				student.availability === 'Afternoon');

				if (eveningCompatibleFilter.length === 2) {
					almostCompletedGroups.push(eveningCompatibleFilter);
				}
			}
		}
	})

	/* 	Loop through each group in almost completed and attempt
		to fill it. */

	almostCompletedGroups.forEach(group => {
		// update unassigned students
		unassignedStudents = GetUnassignedStudents(studentForms);

		/* 	Assign the current groups available time. Set it as
			'mixed' initially and have it change if someone in the group
			is morning or evening */
		let groupsAvailability = 'Mixed';

		group.forEach(student => {
			if (student.availability === 'Morning'){
				groupsAvailability = 'Morning';
			}
			else if (student.availability === 'Evening') {
				groupsAvailability = 'Evening';
			}
		})

		/* Find out the shared project */
		let sharedProject = "";

		if (group[0].choice_1 === group[1].choice_1) {
			sharedProject = group[0].choice_1;
		}
		else if (group[0].choice_1 === group[1].choice_2) {
			sharedProject = group[0].choice_1;
		}
		else if (group[0].choice_2 === group[1].choice_1) {
			sharedProject = group[0].choice_2;
		}
		else if (group[0].choice_2 === group[1].choice_2) {
			sharedProject = group[0].choice_2;
		}


		/* 	Get a list of possible candidates. Possible candidates
			have the current group's project as their 2nd choice or 
			3rd choice
		*/
		let possibleCandidates = [];

		// Get choice 2 students first then choice 3
		let choice2Students = unassignedStudents.filter(student => 
			student.choice_2 === sharedProject);

		let choice3Students = unassignedStudents.filter(student => 
			student.choice_3 === sharedProject);

		// Combine choice 2 and choice 3 arrays together, in order.
		possibleCandidates = choice2Students.concat(choice3Students);

		/* 	If possibleCandidates isn't empty, loop through to see if 
			any of the candidates are compatible on availability */
		if (possibleCandidates.length !== 0) {
			for (let i = 0; i < possibleCandidates.length; i++) {

				/* 	Check if the current candidate is already in another 
					almost completed group. If they are, skip over that
					iteration. */

				let candidateID = possibleCandidates[i].id;
				let choiceConflict = false;

				almostCompletedGroups.forEach(group => {
					group.forEach(student => {
						if (student.id === candidateID) {
							choiceConflict = true;
						}
					})
				})

				if (choiceConflict) {
					continue;
				}


				/* 	If the current iterated candidate doesn't have a choice conflict and their 
					availability is compatible, add them to the current group list,
					create a group then break out the loop.
				*/
				if (possibleCandidates[i].availability === "Mixed" ||
					possibleCandidates[i].availability === "Afternoon" ||
					possibleCandidates[i].availability === groupsAvailability) {

					// Add candidate to the group
					group.push(possibleCandidates[i]);

					// Create a group of three
					currentGroupNumber = CreateGroupOfN(3, group, currentGroupNumber, group[0].choice_1);

					break;
				}
			}
		}
	})

	// 	Update unassignedStudents
	unassignedStudents = GetUnassignedStudents(studentForms);

	/* 
		----
		STEP 8

		Fill almost completed project groups on level 1 and 2.
		Similar to STEP 7 but this time, allow these groups to grab 
		ANYONE available that is compatible.
		----
	*/

	// Reset almost completed groups
	almostCompletedGroups = [];

	modifiedProjectsArray.forEach(project => {
		// 	Get students that chose the project as their 1st choice.
		let choseProject = unassignedStudents.filter(student =>
			student.choice_1 === project ||
			student.choice_2 === project);

		if (choseProject.length >= 2 && choseProject.length <= 3) {
			// 	First try out morning compatibility 
			let morningCompatibleFilter = choseProject.filter(student => 
				student.availability === 'Morning' ||
				student.availability === 'Mixed' ||
				student.availability === 'Afternoon');

			if (morningCompatibleFilter.length === 2) {
				almostCompletedGroups.push(morningCompatibleFilter);
			}
			// 	Else, try for evening compatability
			else {
				let eveningCompatibleFilter = choseProject.filter(student => 
				student.availability === 'Evening' ||
				student.availability === 'Mixed' ||
				student.availability === 'Afternoon');

				if (eveningCompatibleFilter.length === 2) {
					almostCompletedGroups.push(eveningCompatibleFilter);
				}
			}
		}
	})


	/* 	Loop through each group in almost completed and attempt
		to fill it. */

	almostCompletedGroups.forEach(group => {
		// update unassigned students
		unassignedStudents = GetUnassignedStudents(studentForms);

		/* 	Assign the current groups available time. Set it as
			'mixed' initially and have it change if someone in the group
			is morning or evening */
		let groupsAvailability = 'Mixed';

		group.forEach(student => {
			if (student.availability === 'Morning'){
				groupsAvailability = 'Morning';
			}
			else if (student.availability === 'Evening') {
				groupsAvailability = 'Evening';
			}
		})

		/* Find out the shared project */
		let sharedProject = "";

		if (group[0].choice_1 === group[1].choice_1) {
			sharedProject = group[0].choice_1;
		}
		else if (group[0].choice_1 === group[1].choice_2) {
			sharedProject = group[0].choice_1;
		}
		else if (group[0].choice_2 === group[1].choice_1) {
			sharedProject = group[0].choice_2;
		}
		else if (group[0].choice_2 === group[1].choice_2) {
			sharedProject = group[0].choice_2;
		}



		/* 	Get a list of possible candidates. Possible candidates
			have the current group's project as their 2nd choice or 
			3rd choice
		*/
		let possibleCandidates = [];

		// Get choice 2 students first then choice 3
		let choice2Students = unassignedStudents.filter(student => 
			student.choice_2 === sharedProject);

		let choice3Students = unassignedStudents.filter(student => 
			student.choice_3 === sharedProject);

		// Combine choice 2 and choice 3 arrays together, in order.
		possibleCandidates = choice2Students.concat(choice3Students);

		/* 	If possibleCandidates isn't empty, loop through to see if 
			any of the candidates are compatible on availability */
		if (possibleCandidates.length !== 0) {
			for (let i = 0; i < possibleCandidates.length; i++) {

				/* 		If the current iterated candidate doesn't have a choice conflict and their 
						availability is compatible, add them to the current group list,
						create a group then break out the loop.
				*/
				if (possibleCandidates[i].availability === "Mixed" ||
					possibleCandidates[i].availability === "Afternoon" ||
					possibleCandidates[i].availability === groupsAvailability) {

					/* 	Make sure possible candidate isn't already in the group.
						If they are, continue to the next iteration */
					let exists = false;
					group.forEach(student => {
						if (possibleCandidates[i].id === student.id) {
							exists = true;
						}
					})

					if (exists) {
						continue;
					}


					// 	Add candidate to the group
					group.push(possibleCandidates[i]);

					/* 	Double check if all the students in the current iterated group are
						in-fact still unassigned before creating the group 

						NOTE: Since we are pulling from anywhere this time, the possible 
						candidate may have been in an almost completed group further down 
						the loop so we have to ensure that we dont double assign that student
					*/
					let isValid = true;

					group.forEach(student => {
						if (student.assigned_group !== "None") {
							isValid = false;
						}
					})

					if (isValid) {
						// Create a group of three
						currentGroupNumber = CreateGroupOfN(3, group, currentGroupNumber, sharedProject);

						break;
					}
				}
			}
		}
	})

	/* 	
		----
		STEP 8
		----

		Taking note of the list of current unassigned students, Go through each of their
		choices in order. If there is a group that matches that choice, has a compatible time,
		and the group is open, add that student. 

		NOTE: Step 9 is likely reduntant now. Keep testing.
	*/

	// Update unassignedStudents
	unassignedStudents = GetUnassignedStudents(studentForms);

	for (let i = 0; i < unassignedStudents.length; i++) {

		/* Check for groups matching on choice 1 */
		let currentIteratedStudent = unassignedStudents[i];
		let wasAssigned = false;


		let studentChoice1 = currentIteratedStudent.choice_1;
		let possibleGroups = createdgroupsArray.filter(group =>
			group.group_project === studentChoice1);

		 /* Loop through the possible groups. Add the current iterated student
			if their availability time matches the group availability. CONTINUE
			to the next student if the current one is able to be added. */
		if (possibleGroups.length !== 0) {
			for (let j = 0; j < possibleGroups.length; j++) {
				let studentAvailability = currentIteratedStudent.availability;

				if (possibleGroups[j].group_members.length < 4) {
					if (studentAvailability === possibleGroups[j].group_availability ||
						studentAvailability === "Mixed") {
						AddStudentToGroup(currentIteratedStudent, possibleGroups[j]);
						wasAssigned = true;
						break;
					}
				}
			}
		}

		if (wasAssigned) {
			continue;
		}

		/* Check for groups matching on choice 2 */
		let studentChoice2 =  currentIteratedStudent.choice_2;
		possibleGroups = createdgroupsArray.filter(group => 
			group.group_project === studentChoice2);


		if (possibleGroups.length !== 0) {
			for (let j = 0; j < possibleGroups.length; j++) {
				let studentAvailability = currentIteratedStudent.availability;

				if (possibleGroups[j].group_members.length < 4) {
					if (studentAvailability === possibleGroups[j].group_availability ||
						studentAvailability === "Mixed") {
						AddStudentToGroup(currentIteratedStudent, possibleGroups[j]);
						wasAssigned = true;
						break;
					}
				}
			}
		}

		if (wasAssigned) {
			continue;
		}


		/* Check for groups matching on choice 3 */
		let studentChoice3 =  currentIteratedStudent.choice_3;
		possibleGroups = createdgroupsArray.filter(group =>
			group.group_project === studentChoice3);


		if (possibleGroups.length !== 0) {
			for (let j = 0; j < possibleGroups.length; j++) {
				let studentAvailability = currentIteratedStudent.availability;

				if (possibleGroups[j].group_members.length < 4) {
					if (studentAvailability === possibleGroups[j].group_availability ||
						studentAvailability === "Mixed") {
						AddStudentToGroup(currentIteratedStudent, possibleGroups[j]);
						wasAssigned = true;
						break;
					}
				}
			}
		}

	}


	// /* 	
	// 	----
	// 	STEP 9
	// 	----

	// 	Taking note of the created groups so far, If a group isn't full try to 
	// 	add in available students. The student must have a compatible time with 
	// 	the group and a shared choice at any level.
	// */

	// // Update unassignedStudents
	// unassignedStudents = GetUnassignedStudents(studentForms);

	// createdgroupsArray.forEach(group => {
	// 	unassignedStudents = GetUnassignedStudents(studentForms);

	// 	/* 	Get possible candidates at level 1, 2, and 3. Seperate them into 
	// 		different arrays */

	// 	let possibleCandidates1 = unassignedStudents.filter(student => 
	// 		student.choice_1 === group.group_project);

	// 	let possibleCandidates2 = unassignedStudents.filter(student => 
	// 		student.choice_2 === group.group_project);

	// 	let possibleCandidates3 = unassignedStudents.filter(student => 
	// 		student.choice_3 === group.group_project);


	// 	if (possibleCandidates1.length >= 1) {
	// 		GroupSizeCheckAndAdd(group, possibleCandidates1);
	// 	}
	// 	else if (possibleCandidates2.length >= 1) {
	// 		GroupSizeCheckAndAdd(group, possibleCandidates2);
	// 	}
	// 	else if (possibleCandidates3.length >= 1) {
	// 		GroupSizeCheckAndAdd(group, possibleCandidates3);
	// 	}
	// })

	/* 	
		----
		STEP 10
		----

		DEBUG GROUP

		Return a group of students that couldn't be assigned to a group for whatever
		reason. These students more than likely chose projects that had very little demand
		compared to the others, thus were never created. 

		We have the choice of allowing the instructor to either look at this group,
		and contact the students/manually place them into a different group and overriding 
		the four student limit or trying to auto add the student into any open group that meets 
		their available time.
	*/

	unassignedStudents = GetUnassignedStudents(studentForms);

	let debugStudents = [];

	unassignedStudents.forEach(student => {
		// push the first and last name to debugStudents
		debugStudents.push(student.first_name + " " + student.last_name);
	})

	// Create a debug group
	let debugGroup = new CreateGroup(0, debugStudents, "Unassigned Students", "Mixed");

	createdgroupsArray.push(debugGroup);

	// Return the array of created groups
	return (createdgroupsArray);
}

export default CreateGroupsAlgorithm;