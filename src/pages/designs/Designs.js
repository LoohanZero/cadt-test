/* eslint-disable react-hooks/exhaustive-deps */
import '../pages.scss';

import React, { useContext } from 'react';
import GridLoader from 'react-spinners/GridLoader';

import List from '../../components/list/List';
import SettingsContext from '../../contexts/SettingsContext';
import { PAGES, TITLES } from '../../services/enums';


	
const Designs = () => {
	const { data } = useContext(SettingsContext);

	return (
		<main className='pages-main-container'>
			{data.isLoading && 
				<div data-testid="loader" className='pages-loader'>
					<GridLoader color="#80c4b9" />
				</div>
			}
			{!data.isLoading && data.designs && data.users && <List origin={PAGES.DESIGNS} data={data.designs} users={data.users} titles={TITLES.DESIGNS} />}
            
		</main>
	);
};

export default Designs;
