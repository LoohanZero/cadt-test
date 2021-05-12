/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Aside from './Aside.js';


test('renders content', () => {
	const component = render(
		<Router>
			<Aside />
		</Router>);

	component.getByText('Designs');
	component.getByText('Setouts');
});