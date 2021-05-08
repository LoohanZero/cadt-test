/* eslint-disable no-console */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect';

import { render, waitFor } from '@testing-library/react';
import React from 'react';

import Designs from './Designs.js';

beforeAll(() => jest.spyOn(window, 'fetch'));

test('renders list', () => {
	const component = render(<Designs/>);

	component.container.querySelector('ul');
});



test('calls GetDesign function once', async () => {
	await act(async () => {
		render(<Designs/>);
	});
	const mockAPI = window.fetch.mockResolvedValueOnce({
		ok: true,
		json: async () => ({ success: true }),
	});
	
	await waitFor(() => expect(mockAPI).toHaveBeenCalledTimes(1));
	await waitFor(() => expect(mockAPI).toHaveBeenCalledWith('/designs'));
});

