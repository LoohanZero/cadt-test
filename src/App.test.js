/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import App from './App';

test('renders aside', () => {
	const component = render(<App />);
	
	component.container.querySelector('aside');
});

test('full app rendering/navigating', () => {
	const history = createMemoryHistory();
	render(
		<Router history={history}>
			<App />
		</Router>);

	expect(screen.getByText(/You are on the setout page/i)).toBeInTheDocument();

	const leftClick = { button: 0 };
	userEvent.click(screen.getByText(/designs/i), leftClick);

	expect(screen.getByText(/You are on the designs page/i)).toBeInTheDocument();
});