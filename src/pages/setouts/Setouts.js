/* eslint-disable react-hooks/exhaustive-deps */
import '../pages.scss';

import React, { useContext } from 'react';
import GridLoader from 'react-spinners/GridLoader';

import List from '../../components/list/List';
import SettingsContext from '../../contexts/SettingsContext';
import { PAGES, TITLES } from '../../services/enums';



const Setouts = () => {
	const { data } = useContext(SettingsContext);

	return (
		<main className='pages-main-container'>
			{data.isLoading &&
			<div data-testid="loader" className='pages-loader'>
				<GridLoader color="#80c4b9" />
			</div>
			}
			{!data.isLoading && data.setouts && <List origin={PAGES.SETOUTS} data={data.setouts} titles={TITLES.SETOUTS} />}
			{data.error && <p className='modal-error-text'>There was an error processing the information. Please, try again later.</p>}
		</main>
	);
};

export default Setouts;

