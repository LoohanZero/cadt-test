/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';
import React from 'react';

import Aside from './Aside.js';


test('renders content', () => {
	const component = render(<Aside/>);

	component.getByText('Designs');
	component.getByText('Setouts');
});