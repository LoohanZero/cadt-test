import './main.scss';

import React from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';

import Aside from './components/aside/Aside';
import Designs from './pages/designs/Designs';
import Setouts from './pages/setouts/Setouts';

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

			</Router>
			
		</div>
	);
}

export default App;
