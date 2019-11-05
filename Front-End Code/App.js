import React, { Component } from 'react';
import Header from './components/Header/Header';
import TopMessage from './components/TopMessage/TopMessage';
import StudentForm from './components/StudentForm/StudentForm';
import AdminLogin from './components/AdminLogin/AdminLogin';
import AdminPage from './components/AdminPage/AdminPage';
import SuccessPage from './components/SuccessPage/SuccessPage';


class App extends Component {

	constructor() {
		super();
		this.state = {
			route: 'student-form',
			admin: {
				id: '',
				username: '',
			},
			submittedForms: [],
			isSignedIn: false,
		}
	}


	onRouteChange = (route) => {
		/* If signing out, empty the admin and submitted forms state and switch
		   isSignedIn to false*/
		if (route === 'signout') {
			this.setState(Object.assign(this.state.admin, {id: '', username:''}));
			this.setState(Object.assign(this.state, {submittedForms: []}));

			this.setState({isSignedIn: false});
			this.setState({route: 'admin-login-form'});
		}
		else if (route === 'signin') {
			this.setState({isSignedIn: true});
			this.setState({route: route});
		}
		else {
			this.setState({route: route});
		}
	}

	/* Load the current admin's info upon a successful sign in. */
	loadAdminInfo = (data) => {
		// Set admin state
		this.setState({
			admin: {
				id: data.id,
				username: data.username
			}
		})

		// Set the forms that were retrieved 
		this.setState({
			submittedForms: data.studentForms
		})
	}

	render() {
		return (
		<div className="App">
			{/* Header component displays on all routes */}
			<Header isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />

			{/* Display the student form if the current route is 'student-form' (default route).
			 	Else, check if the route is 'successfulSubmit' and display the sucess page.
			 	Else, check if the route is 'admin-login-form' and display the admin login.
			 	Finally if the route is none of those, which would mean it
			 	is 'signin', display the top message. */}

			{ this.state.route === 'student-form' ?
				<div>
					<TopMessage />
					<StudentForm onRouteChange={this.onRouteChange}/>
				</div>
			: 
				(this.state.route === 'successfulSubmit' ?
					<SuccessPage />
					:
					(this.state.route === 'admin-login-form'?
						<AdminLogin loadAdminInfo={this.loadAdminInfo} onRouteChange={this.onRouteChange}/>
					:
						<AdminPage submittedForms={this.state.submittedForms} />
					)
				)
			}
		</div>
		);
	}
}

export default App;