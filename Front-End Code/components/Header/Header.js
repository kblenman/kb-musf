import React from 'react';
import logo from './USF-Logo.png';

const Header = ({ onRouteChange, isSignedIn }) => {
	return (
		<header className="athelas bg-usf-gold flex flex-column items-center
				flex-row-ns flex-wrap-ns justify-between-ns bb">
			{/*<!-- Logos and reference guide can be found at 
			https://www.usf.edu/ucm/marketing/brand-asset-management.aspx -->*/}
			<div className="flex flex-column items-center flex-row-ns center-m">
				<img src={logo} height="100" width="250"
				alt="USF Logo"/>
				<h1 className="ttu tracked bl-ns pa2">USF Match</h1>
			</div>

			{/* If the admin is signed in, display only a logout button in the header.
			    Else, (when on the Login or Student form pages) display the home and
			    admin login buttons */}

			{ isSignedIn ?
				<div className="ma3 flex center-m">
					<button
						onClick = {() => onRouteChange('signout')}
						className="teal darken-2 btn waves-effect waves-light mr2 f6"> 
						Sign Out 
					</button>
				</div>
				:
				<div className="ma3 flex center-m">
					<button
						onClick = {() => onRouteChange('student-form')}
						className="teal darken-2 btn waves-effect waves-light mr2 f6"> 
						Home 
					</button>
					<button
						onClick = {() => onRouteChange('admin-login-form')}
						className="teal darken-2 btn waves-effect waves-light f6"> 
						Administrator Login 
					</button>
				</div>

			}
		</header>
	);
}

export default Header;