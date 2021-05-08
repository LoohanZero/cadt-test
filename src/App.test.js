/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import '@testing-library/jest-dom/extend-expect';

import { fireEvent,render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Link, Router } from 'react-router-dom';

import App from './App';

test('renders aside', () => {
	const component = render(<App />);
	
	component.container.querySelector('aside');
});

it('routes to a new route', async () => {
	const history = createMemoryHistory();

	history.push = jest.fn();

	const { getByText } = render(
		<Router history={history}>
			<Link to="/designs">Designs</Link>
		</Router>
	);

	fireEvent.click(getByText('Designs'));


	expect(history.push).toHaveBeenCalledWith('/designs');
});