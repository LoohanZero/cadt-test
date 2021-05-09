/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect';

import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';

import Setouts from './Setouts';

beforeAll(() => jest.spyOn(window, 'fetch'));

test('renders list', () => {
	const component = render(<Setouts/>);

	component.container.querySelector('ul');
});



test('calls GetSetouts function once', async () => {
	await act(async () => {
		render(<Setouts/>);
	});
	const mockAPI = window.fetch.mockResolvedValueOnce({
		ok: true,
		json: async () => ({ success: true }),
	});
	
	await waitFor(() => expect(mockAPI).toHaveBeenCalledWith('/setouts'));
	expect(mockAPI).toHaveBeenCalledTimes(1);
});