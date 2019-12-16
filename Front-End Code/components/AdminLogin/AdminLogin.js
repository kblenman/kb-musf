import React from 'react';
// eslint-disable-next-line
import M from 'materialize-css/dist/js/materialize.min.js';

class AdminLogin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signinUsername: '',
			signinPassword: ''
		}
	}

	onUsernameChange = (event) => {
		this.setState({signinUsername: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({signinPassword: event.target.value});
	}

	/* 
		Submit button function. Gets the user login input from the sign in form and
		if it matches the admin information in the database, changes the route
		to 'signin' (which displays the admin portal). Else an error window alert
		pops up.
	*/
	OnSubmitSignin = () => {
		fetch('http://localhost:3001/signin', {
			method: 'post',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify({
				username: this.state.signinUsername,
				password: this.state.signinPassword
			})
		})
		.then(response => response.json())
		.then(data => {
			if (data === 'Error logging in') {
				window.alert('Error logging in');
			}
			else {
				this.props.loadAdminInfo(data);
				this.props.onRouteChange('signin');
			}
		})	
	}

	render () {
		return (
			<div className="input-field bg-light-gray athelas flex flex-column ma4 shadow-4 
				w-90 w-70-ns center">
				<h2 className="center bb pl4 pr4 pb2 f2"> Administrator Login </h2>

				<div className=" pa4">
					<div className="flex flex-column mb4 w-100 w-60-ns center">
						<p className="ttu tracked f3">Username</p>
						<input onChange={this.onUsernameChange}
						placeholder="Username" id="username" type="text" required maxLength="30" 
						className="center"/>
					</div>
					<div className="flex flex-column mb4 w-100 w-60-ns center">
						<p className="ttu tracked f3">Password</p>
						<input onChange={this.onPasswordChange}
						placeholder="Password" id="password" type="password" required maxLength="30" 
						className="center"/>
					</div>
				</div>

				<button 
					onClick = {this.OnSubmitSignin}
					className="teal darken-2 btn waves-effect waves-light mt1 mb4 w-100 w-40-ns center" type="submit" name="action">
					Login
			  	</button>
			</div>
		);
	}
}

export default AdminLogin;