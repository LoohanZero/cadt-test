/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';

import { SettingsProvider } from '../../contexts/SettingsContext';
import Designs from './Designs.js';

  
const designsData = {
	designs: [ {
		'courses': 900,
		'id': 9,
		'name': '9th Design',
		'status': 'in-progress',
		'updated': '1/04/21',
		'user_id_last_update': 1,
		'user_name_last_update': 'Marcus Mulligan',
		'wales': 900
	}, 
	{
		'courses': 160,
		'id': 8,
		'name': '8th Design',
		'status': 'in-progress',
		'updated': '31/03/21',
		'user_id_last_update': 2,
		'user_name_last_update': 'John Doe',
		'wales': 50
	} ],
	error: null,
	isLoading: false,
	users: [
		{
			'id': 1,
			'name': 'Walter Doe'
		},
		{
			'id': 2,
			'name': 'John Doe'
		}
	]
};



describe('Designs renders', () => {
	test('renders list', async () => {
		render(
			<SettingsProvider value={designsData}>
				<Designs />
			</SettingsProvider>

		);

		waitForElementToBeRemoved(screen.queryByTestId('loader'));
		// await waitFor(() => expect(screen.getByText('data-list')).toBeInTheDocument());
		// expect(await screen.findByTestId('data-list')).toBeInTheDocument();
		// expect(screen.findByTestId('data-list')).toBeInTheDocument();
	});
});


