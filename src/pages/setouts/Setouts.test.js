/* eslint-disable no-console */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import React  from 'react';

import { SettingsProvider } from '../../contexts/SettingsContext';
import Setouts from './Setouts';

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





test('renders list', async () => {
	render(
		<SettingsProvider>
			<Setouts data={setoutsData}/>
		</SettingsProvider>
	);

	screen.debug();
	await waitForElementToBeRemoved(screen.findByTestId('loader'));
	screen.debug();


	// await wait(() => expect(screen.getByText('data-list')).toBeInTheDocument());
	// expect(await screen.findByTestId('data-list')).toBeInTheDocument();
	// expect(screen.findByTestId('data-list')).toBeInTheDocument();
});


