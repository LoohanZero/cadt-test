/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect';

import { render, waitFor } from '@testing-library/react';
import { act,renderHook } from '@testing-library/react-hooks';
import React from 'react';

import SettingsContext, { SettingsProvider } from './SettingsContext';


beforeAll(() =>{ 
	jest.spyOn(window, 'fetch');
	
});
afterAll(() => {
	window.fetch.mockClear();
});




test('calls GetSetouts function once', async () => {
	render(<Setouts/>);

	const mockAPI = window.fetch.mockResolvedValueOnce({
		ok: true,
		json: async () => ({ success: true }),
	});
	
	await waitFor(() => expect(mockAPI).toHaveBeenCalledWith('/setouts'));
	expect(mockAPI).toHaveBeenCalledTimes(1);
});