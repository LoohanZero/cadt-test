import React from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
	useLocation
} from 'react-router-dom';

import Aside from './components/aside/Aside';
import Designs from './pages/designs/Designs';
import Setouts from './pages/setouts/Setouts';


const LocationDisplay = () => {
	const location = useLocation();
  
	return <div data-testid="location-display">{location.pathname}</div>;
};

function App() {
	return (
		<div className="App">
			<Router>
				<Aside/>
        
				<Switch>
					<Route exact path='/designs' >
						<Designs/>
					</Route>
					<Route exact path='/setouts'>
						<Setouts/>
					</Route>
					<Route>
						<Redirect to='designs'/>
					</Route>
				</Switch>

				<LocationDisplay />
			</Router>
			
		</div>
	);
}

export { App, LocationDisplay };
