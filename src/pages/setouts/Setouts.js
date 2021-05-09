/* eslint-disable react-hooks/exhaustive-deps */
import '../pages.scss';

import React, { useEffect, useReducer } from 'react';
import GridLoader from 'react-spinners/GridLoader';

import Table from '../../components/table/Table';
import { ACTIONS, dataModel, TITLES } from '../../services/actions';
import { getSetoutsData } from '../../services/getData';

const formatDateUpdate = setout => {
	const formattedDate = new Date(setout.updated).toLocaleString('dv-MV', { year:'2-digit',month:'2-digit', day:'2-digit' }).split(' ')[0];
	return { ...setout, updated: formattedDate };
};


const reducerSetouts = (state, action) => {
	switch (action.type) {
		case ACTIONS.SET_IS_LOADING:
			return { ...state, 
				isLoading: !state.isLoading };
		case ACTIONS.SET_SETOUTS_DATA:
			return { ...state, 
				data: action.payload };
		case ACTIONS.FORMAT_LAST_UPDATE_DATE:
			return { ...state, 
				data: state.data?.map(formatDateUpdate) };
		case ACTIONS.SET_ERROR:
			return { ...state, 
				error: new Error() };
		default:
			return { ...state, 
				error: new Error() };
	}
};

	
const Setouts = () => {
	const [ setouts, dispatchSetouts ] = useReducer(reducerSetouts, dataModel);


	const getSetouts = async () => {
		dispatchSetouts({ type: ACTIONS.SET_IS_LOADING });

		const designsInformation = await getSetoutsData();
		
		if (designsInformation instanceof Error) {
			dispatchSetouts({ type: ACTIONS.SET_ERROR });
		} else{
			dispatchSetouts({ type: ACTIONS.SET_SETOUTS_DATA, payload: designsInformation });
			dispatchSetouts({ type: ACTIONS.FORMAT_LAST_UPDATE_DATE });
		}
		dispatchSetouts({ type: ACTIONS.SET_IS_LOADING });
		
	};

	useEffect(() => {
		getSetouts();
		return () => {
			dispatchSetouts({ type: ACTIONS.GET_DESIGN_DATA, payload: null });
		};
	}, [ ]);
	
	return (
		<main className='pages-main-container'>
			{setouts.isLoading && 
				<div data-testid="loader" className='pages-loader'>
					<GridLoader color="#80c4b9" />
				</div>
			}
			{!setouts.isLoading && setouts.data && <Table origin='setouts' data={setouts.data} titles={TITLES.SETOUTS} />}
            
		</main>
	);
};

export default Setouts;

