/* eslint-disable react-hooks/exhaustive-deps */
import '../pages.scss';

import React, { useEffect, useReducer } from 'react';
import GridLoader from 'react-spinners/GridLoader';

import Table from '../../components/table/Table';
import { ACTIONS, designsModel, TITLES } from '../../services/actions';
import { getDesignData, getUsersData } from '../../services/getData';

const formatDateUpdate = design => {
	const formattedDate = new Date(design.updated).toLocaleString('dv-MV', { year:'2-digit',month:'2-digit', day:'2-digit' }).split(' ')[0];
	return { ...design, updated: formattedDate };
};

const formatUpdateName = (design, users) => {
	const userName = users?.filter(user => user.id === design.user_id_last_update);
	return { ...design, user_name_last_update: userName[0].name };
};

const reducerDesigns = (state, action) => {
	switch (action.type) {
		case ACTIONS.SET_IS_LOADING:
			return { ...state, 
				isLoading: !state.isLoading };
		case ACTIONS.SET_DESIGN_DATA:
			return { ...state, 
				data: action.payload };
		case ACTIONS.FORMAT_LAST_UPDATE_DATE:
			return { ...state, 
				data: state.data.map(formatDateUpdate) };
		case ACTIONS.ADD_LAST_USER_UPDATE:
			return { ...state, 
				data: state.data.map(design => formatUpdateName(design, action.payload)) };
		case ACTIONS.SET_ERROR:
			return { ...state, 
				error: new Error() };
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
			dispatchDesings({ type: ACTIONS.SET_ERROR });
		} else{
			dispatchDesings({ type: ACTIONS.SET_DESIGN_DATA, payload: designsInformation });
			dispatchDesings({ type: ACTIONS.FORMAT_LAST_UPDATE_DATE });
		}
		dispatchDesings({ type: ACTIONS.SET_IS_LOADING });
		
	};

	const getUsers = async () => {
		dispatchDesings({ type: ACTIONS.SET_IS_LOADING });

		const usersInformation = await getUsersData();
		
		if (usersInformation instanceof Error) {
			dispatchDesings({ type: ACTIONS.SET_ERROR });
		} else{
			dispatchDesings({ type: ACTIONS.ADD_LAST_USER_UPDATE, payload: usersInformation });
		}
		dispatchDesings({ type: ACTIONS.SET_IS_LOADING });
	};


	useEffect(() => {
		getDesigns();
		getUsers();
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
			{!designs.isLoading && designs.data && <Table data={designs.data} titles={TITLES.DESIGNS} />}
            
		</main>
	);
};

export default Designs;
