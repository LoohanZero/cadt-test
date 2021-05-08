/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';

import Aside from './Aside.js';


test('renders content', () => {
	const component = render(<Aside/>);

	component.getByText('Designs');
	component.getByText('Setouts');
});