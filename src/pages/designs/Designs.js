/* eslint-disable react-hooks/exhaustive-deps */
import '../pages.scss';

import React, { useEffect, useReducer } from 'react';
import GridLoader from 'react-spinners/GridLoader';

import List from '../../components/list/List';
import { dataModel, PAGES, TITLES, TYPES } from '../../services/enums';
import { getDesignData, getUsersData } from '../../services/getData';

const formatDateUpdate = setout => {
	const formatDMMYY = new Date(setout.updated).toLocaleString('dv-MV', { year:'2-digit',month:'2-digit', day:'numeric' }).split(' ')[0];
	return { ...setout, updated: formatDMMYY };
};

const resortDesigns = data => {
	return data.sort((firstDesign, secondDesign) => new Date(secondDesign.updated) - new Date(firstDesign.updated));
};

const formatUpdateName = (design, users) => {
	const userName = users?.filter(user => user.id === design.user_id_last_update);
	return { ...design, user_name_last_update: userName[0]?.name };
};

const formatStatus = design => {
	return { ...design, status: design.status?.replaceAll('_', ' ').replaceAll('-', ' ') };
};

const reducerDesigns = (state, action) => {
	switch (action.type) {
		case TYPES.SET_IS_LOADING:
			return { ...state, 
				isLoading: !state.isLoading };
		case TYPES.SET_DESIGN_DATA:
			return { ...state, 
				data: action.payload };
		case TYPES.FORMAT_LAST_UPDATE_DATE:
			return { ...state, 
				data: state.data?.map(formatDateUpdate) };
		case TYPES.ADD_LAST_USER_UPDATE:
			return { ...state, 
				data: state.data?.map(design => formatUpdateName(design, action.payload)),
				users: action.payload };
		case TYPES.FORMAT_STATUS:
			return { ...state, 
				data: state.data?.map(design => formatStatus(design)) };
		case TYPES.RESORT_DATA:
			return { ...state, data: resortDesigns(state.data) };
		case TYPES.SET_ERROR:
		default:
			return { ...state, 
				error: new Error() };
	}
};

	
const Designs = () => {
	const [ designs, dispatchDesings ] = useReducer(reducerDesigns, dataModel);


	const getDesigns = async () => {
		dispatchDesings({ type: TYPES.SET_IS_LOADING });

		const designsInformation = await getDesignData();
		
		if (designsInformation instanceof Error) {
			dispatchDesings({ type: TYPES.SET_ERROR });
		} else{
			dispatchDesings({ type: TYPES.SET_DESIGN_DATA, payload: designsInformation });
			dispatchDesings({ type: TYPES.RESORT_DATA });
			dispatchDesings({ type: TYPES.FORMAT_LAST_UPDATE_DATE });
			dispatchDesings({ type: TYPES.FORMAT_STATUS });
		}

		dispatchDesings({ type: TYPES.SET_IS_LOADING });
	};

	const getUsers = async () => {
		dispatchDesings({ type: TYPES.SET_IS_LOADING });

		const usersInformation = await getUsersData();
		
		if (usersInformation instanceof Error) {
			dispatchDesings({ type: TYPES.SET_ERROR });
		} else{
			dispatchDesings({ type: TYPES.ADD_LAST_USER_UPDATE, payload: usersInformation });
		}
		dispatchDesings({ type: TYPES.SET_IS_LOADING });

	};


	useEffect(() => {
		getDesigns();
		getUsers();

		return () => {
			dispatchDesings({ type: TYPES.GET_DESIGN_DATA, payload: null });
		};
	}, [ ]);

	return (
		<main className='pages-main-container'>
			{designs.isLoading && 
				<div data-testid="loader" className='pages-loader'>
					<GridLoader color="#80c4b9" />
				</div>
			}
			{!designs.isLoading && designs.data && <List origin={PAGES.DESIGNS} data={designs.data} titles={TITLES.DESIGNS} />}
            
		</main>
	);
};

export default Designs;
