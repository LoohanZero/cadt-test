/* eslint-disable react-hooks/exhaustive-deps */
import '../pages.scss';

import React, { useEffect, useReducer } from 'react';
import GridLoader from 'react-spinners/GridLoader';

import List from '../../components/list/List';
import { dataModel, TITLES,TYPES } from '../../services/enums';
import { getSetoutsData } from '../../services/getData';

const formatDateUpdate = setout => {
	const formatDMMYY = new Date(setout.updated).toLocaleString('dv-MV', { year:'2-digit',month:'2-digit', day:'numeric' }).split(' ')[0];
	return { ...setout, updated: formatDMMYY };
};

const reverseSetouts = data => {
	return data.sort((firstSetout, secondSetout) => new Date(secondSetout.updated) - new Date(firstSetout.updated));
};


const reducerSetouts = (state, action) => {
	switch (action.type) {
		case TYPES.SET_IS_LOADING:
			return { ...state,
				isLoading: !state.isLoading };
		case TYPES.SET_SETOUTS_DATA:
			return { ...state,
				data: action.payload };
		case TYPES.FORMAT_LAST_UPDATE_DATE:
			return { ...state,
				data: state.data?.map(formatDateUpdate) };
		case TYPES.RESORT_SETOUTS:
			return { ...state, data: reverseSetouts(state.data) };
		case TYPES.SET_ERROR:
		default:
			return { ...state, 
				error: new Error() };
	}
};

const Setouts = () => {
	const [ setouts, dispatchSetouts ] = useReducer(reducerSetouts, dataModel);


	const getSetouts = async () => {
		dispatchSetouts({ type: TYPES.SET_IS_LOADING });

		const designsInformation = await getSetoutsData();
		if (designsInformation instanceof Error) {
			dispatchSetouts({ type: TYPES.SET_ERROR });
		} else{
			dispatchSetouts({ type: TYPES.SET_SETOUTS_DATA, payload: designsInformation });
			dispatchSetouts({ type: TYPES.RESORT_SETOUTS });
			dispatchSetouts({ type: TYPES.FORMAT_LAST_UPDATE_DATE });
		}
		dispatchSetouts({ type: TYPES.SET_IS_LOADING });
	};

	useEffect(() => {
		getSetouts();
		return () => {
			dispatchSetouts({ type: TYPES.GET_DESIGN_DATA, payload: null });
		};
	}, [ ]);
	return (
		<main className='pages-main-container'>
			{setouts.isLoading &&
			<div data-testid="loader" className='pages-loader'>
				<GridLoader color="#80c4b9" />
			</div>
			}
			{!setouts.isLoading && setouts.data && <List origin='setouts' data={setouts.data} titles={TITLES.SETOUTS} />}
		</main>
	);
};

export default Setouts;
export { reducerSetouts };

