/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { render } from '@testing-library/react';

import App from './App';

test('renders aside', () => {
	const component = render(<App />);
	
	component.container.querySelector('aside');
});

