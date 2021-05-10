/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import React from 'react';

import { TITLES } from '../../services/enums';
import Table from './List';


describe('renders titles in table when I pass different title lists', () => {
	test('renders title list content when I pass designs titles', () => {

		render(<Table titles={TITLES.DESIGNS} />);
	
		expect(screen.queryByText('Name')).toBeInTheDocument();
		expect(screen.queryByText('Courses')).toBeInTheDocument();
		expect(screen.queryByText('Wale')).toBeInTheDocument();
		expect(screen.queryByText('Last Updated')).toBeInTheDocument();
		expect(screen.queryByText('By')).toBeInTheDocument();
		expect(screen.queryByText('Machine Name')).not.toBeInTheDocument();
		expect(screen.queryByText('Machine Width')).not.toBeInTheDocument();
	});


	test('renders title list content when I pass designs titles', () => {

		render(<Table titles={TITLES.SETOUTS} />);

		expect(screen.queryByText('Name')).toBeInTheDocument();
		expect(screen.queryByText('Courses')).toBeInTheDocument();
		expect(screen.queryByText('Machine Name')).toBeInTheDocument();
		expect(screen.queryByText('Last Updated')).toBeInTheDocument();
		expect(screen.queryByText('Machine Width')).toBeInTheDocument();
		expect(screen.queryByText('Wale')).not.toBeInTheDocument();
		expect(screen.queryByText('By')).not.toBeInTheDocument();

	});
});

describe('renders data in table when I pass different data information', () => {
	
	test('renders data list content when I pass designs data', () => {
		const designData = [ {
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
		} ];

		render(<Table data={designData} />);
		const listitems = screen.getAllByTestId('data-list-item');
	
		expect(screen.queryByText('1/04/21')).toBeInTheDocument();
		expect(screen.queryByText('JD')).toBeInTheDocument();
		expect(screen.queryByText('MM')).toBeInTheDocument();
		expect(listitems).toHaveLength(2);
		expect(screen.queryByText('RSF 4 2 EL')).not.toBeInTheDocument();
		expect(screen.queryByText('Setout')).not.toBeInTheDocument();

	});

	test('renders data list content when I pass setout data', () => {
		const setoutsData = [ {
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

		render(<Table data={setoutsData} />);
		const listitems = screen.getAllByTestId('data-list-item');
	
		expect(screen.queryByText('27/03/21')).toBeInTheDocument();
		expect(listitems).toHaveLength(2);
		expect(screen.queryByText('JD')).not.toBeInTheDocument();
		expect(screen.queryByText('Design')).not.toBeInTheDocument();

	});
});
