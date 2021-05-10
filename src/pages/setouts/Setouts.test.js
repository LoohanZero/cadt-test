/* eslint-disable no-console */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect';

import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';

import Setouts, { reducerSetouts } from './Setouts';

const setoutsData =[ {
	'id': 3,
	'updated': '26/03/21',
	'name': '3rd Setout',
	'machine_name': 'RSJ_5_1',
	'machine_width': 200,
	'courses': 250
},
{
	'id': 4,
	'updated': '27/03/21',
	'name': '4th Setout',
	'machine_name': 'RSF_4_2_EL',
	'machine_width': 100,
	'courses': 300
} ];

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


// test('renders list', async () => {
// 	render(<Setouts/>);

// 	screen.debug();
// 	await waitForElementToBeRemoved(screen.findByTestId('loader'));
// 	screen.debug();
// jest.advanceTimersByTime(3000);

// await wait(() => expect(screen.getByText('data-list')).toBeInTheDocument());
// expect(await screen.findByTestId('data-list')).toBeInTheDocument();
// expect(screen.findByTestId('data-list')).toBeInTheDocument();
// });


