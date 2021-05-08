/* eslint-disable react-hooks/exhaustive-deps */
import '../pages.scss';

import React, { useEffect, useReducer } from 'react';
import GridLoader from 'react-spinners/GridLoader';

import { Table } from '../../components/table/Table';
import { ACTIONS, designsModel } from '../../services/actions';
import { getDesignData } from '../../services/getData';

const reducerDesigns = (state, action) => {
	switch (action.type) {
		case ACTIONS.SET_IS_LOADING:
			return { ...state, 
				isLoading: !state.isLoading };
		case ACTIONS.GET_DESIGN_DATA:
			return { ...state, 
				data: action.payload };
		default:
			return { ...state, 
				error: new Error() };
	}
};


const Designs = () => {
	const [ designs, dispatchDesings ] = useReducer(reducerDesigns, designsModel);


	const getDesigns = async () => {
		dispatchDesings({ type: ACTIONS.SET_IS_LOADING });

		const designsInformation = await getDesignData();
		
		if (designsInformation instanceof Error) {
			dispatchDesings();
		} else{
			dispatchDesings({ type: ACTIONS.GET_DESIGN_DATA, payload: designsInformation });
		}
		dispatchDesings({ type: ACTIONS.SET_IS_LOADING });
		
	};

	useEffect(() => {
		getDesigns();

		return () => {
			dispatchDesings({ type: ACTIONS.GET_DESIGN_DATA, payload: null });
		};
	}, [ ]);

	return (
		<main className='pages-main-container'>
			{designs.isLoading && 
				<div data-testid="loader" className='pages-loader'>
					<GridLoader color="#80c4b9" />
				</div>
			}
			{!designs.isLoading && designs.data && <Table data={designs}/>}
            
		</main>
	);
};

export default Designs;
