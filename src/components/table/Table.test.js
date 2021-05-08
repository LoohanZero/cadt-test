/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import React from 'react';

import Table from './Table';


test('renders title list content', () => {
	render(<Table/>);

	screen.getByTitle('Name');
	screen.getByTitle('Courses');
	screen.getByTitle('Wales');
	screen.getByTitle('Last Updated');
	screen.getByTitle('By');
});


test('renders title list content', async () => {
	render(<Table/>);

	screen.findAllQueries('li');
});