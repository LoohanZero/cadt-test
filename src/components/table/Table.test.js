/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';
import React from 'react';

import Table from './Table';


test('renders content', () => {
	const component = render(<Table/>);

	component.getByText('Name');
	component.getByText('Courses');
	component.getByText('Wales');
	component.getByText('Last Updated');
	component.getByText('By');
});