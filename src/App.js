import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';

import Aside from './components/aside/Aside';

function App() {
	return (
		<div className="App">
			<Router>
				<Aside/>
        
				<Switch>
					<Route exact path='/designs' ></Route>
					<Route exact path='/setouts'></Route>
				</Switch>
			</Router>
			
		</div>
	);
}

export default App;
