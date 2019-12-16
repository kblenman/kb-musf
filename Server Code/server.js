const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

// Connect postgres database
const matchDB = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true,
  }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());

const saltRounds = 10;

app.get('/', (req, res) => {
	res.send('Server is working');
})

/* Compare the submitted sign in info with the admin table in the database. If the credentials
match with an admin: log them in and retrieve the student list from the database. */
app.post ('/signin', (req, res) => {
	matchDB.select('username','hash').from('admins')
		.where('username', '=', req.body.username)
		.then(data => {
			const isValidAdmin = bcrypt.compareSync(req.body.password, data[0].hash);

			if (isValidAdmin) {
				let adminData = {
					id: '',
					username: '',
					studentForms: [],
				}
				// First grab admin information from the admin table
				matchDB.select('id', 'username').from('admins')
					.where('username', '=', req.body.username)
					.then(admin => {
						adminData.id = admin[0].id;
						adminData.username = admin[0].username;

						/* Then grab the students form the studentforms table and 
						   return the adminData object */
						matchDB.select('*').from('studentforms')
						.then(forms => {
							adminData.studentForms = forms;
							res.json(adminData);
						})
					})
			}
			else {
				res.status(400).json('Error logging in');
			}
		})

		// If the admin table doesn't hold any such username, catch the error
		.catch(err => res.status(400).json('Error logging in'));

})


/* Retrieve the student form and create a new student entry with the student's
information in the database */
app.post ('/submitform', (req, res) => {
	const { first_name, last_name, availability, discipline_1, 
		discipline_2, discipline_3, choice_1, choice_2, 
		choice_3 } = req.body;

	matchDB('studentforms')
		.returning('*')
		.insert({
			first_name: first_name,
			last_name: last_name,
			availability: availability,
			discipline_1: discipline_1,
			discipline_2: discipline_2,
			discipline_3: discipline_3,
			choice_1: choice_1,
			choice_2: choice_2,
			choice_3: choice_3
		})
		.then(student => {
			res.json(student[0]);
		})
		.catch(err => res.status(400).json('Unable to submit form'));
})

/* Delete a student fromt the database */
app.delete ('/delete/:id', (req, res) => {
	matchDB('studentforms')
		.where('id', req.params.id)
		.del()
		.then(rowsDeleted => {
			if (rowsDeleted === 0) {
				res.json('Nothing deleted');
			}
			else {
				res.json('Student ' + req.params.id + ' deleted');
			}
		})
		.catch(err => res.status(400).json('Unable to delete student'));
})

app.listen(process.env.PORT || 3001, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})



/*

	(/) ---> res = this is working
	(/signin) ---> POST request. res = success/fail
	(/submitform) ---> POST request. res = user info that was filled in form
	(/adminportal) ---> GET request. res = students table from database

*/