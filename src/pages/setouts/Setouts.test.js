/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';

import { SettingsProvider } from '../../contexts/SettingsContext';
import Setouts from './Setouts';

  
const setoutsData = {
	setouts: [ {
		courses: 50,
		id: 18,
		machine_name: 'RSF 4 2 EL',
		machine_width: 2000,
		name: '18th Setout',
		updated: '10/04/21',
	}, 
	{
		courses: 30,
		id: 17,
		machine_name: 'RSJ 4 1 ON',
		machine_width: 1000,
		name: '17th Setout',
		updated: '9/04/21',
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
			<SettingsProvider value={setoutsData}>
				<Setouts />
			</SettingsProvider>

		);

		waitForElementToBeRemoved(screen.queryByTestId('loader'));
	});
});