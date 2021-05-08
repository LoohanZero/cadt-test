/* eslint-disable react-hooks/exhaustive-deps */
import '../pages.scss';

import React, { useEffect, useReducer } from 'react';
import GridLoader from 'react-spinners/GridLoader';

import { getDesignData } from '../../services/getData';

const designsModel = { isLoading: false, 
	data: null, 
	error: null };

const reducerDesigns = (state, action) => {
	switch (action.type) {
		case 'isLoading':
			return { ...state, isLoading: !state.isLoading };
		case 'data':
			return { ...state, data: action.payload };
		default:
			return { ...state, error: new Error() };
	}
};


const Designs = () => {
	const [ designs, dispatchDesings ] = useReducer(reducerDesigns, designsModel);


	const getDesigns = async () => {
		dispatchDesings({ type: 'isLoading' });

		const designsInformation = await getDesignData();
		
		dispatchDesings({ type: 'data', payload: designsInformation });
		dispatchDesings({ type: 'isLoading' });
		
	};

	useEffect(() => {
		getDesigns();

		return () => {
			dispatchDesings({ type: 'designs', payload: null });
		};
	}, [ ]);

	return (
		<main className='pages-main-container'>
			{designs.isLoading && 
				<div className='pages-loader'>
					<GridLoader color="#80c4b9" />
				</div>
			}
			{!designs.isLoading && designs.data && <li></li>}
            
		</main>
	);
};

export default Designs;
