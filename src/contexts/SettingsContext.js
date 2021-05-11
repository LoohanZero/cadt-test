/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useReducer, useState } from 'react';

import { dataModel, PAGES, TYPES } from '../services/enums';
import { getDesignData, getSetoutsData,getUsersData } from '../services/getData';

const SettingsContext = createContext();

const formatDateUpdate = item => {
	const formatDMMYY = new Date(item.updated).toLocaleString('dv-MV', { year:'2-digit',month:'2-digit', day:'numeric' }).split(' ')[0];
	return { ...item, updated: formatDMMYY };
};

const resortData = data => {
	return data?.sort((firstDesign, secondDesign) => new Date(secondDesign.updated) - new Date(firstDesign.updated));
};

const formatMachineName = setout => {
	return { ...setout, machine_name: setout?.machine_name?.replaceAll('_', ' ') };
};

const formatUpdateName = (design, users) => {
	const userName = users?.filter(user => user.id === design.user_id_last_update);
	return { ...design, user_name_last_update: userName[0]?.name };
};

const formatStatus = design => {
	return { ...design, status: design.status?.replaceAll('_', ' ').replaceAll('-', ' ') };
};

const reducerData = (state, action) => {
	switch (action.type) {
		case TYPES.SET_IS_LOADING:
			return { ...state, 
				isLoading: action.payload };
		case TYPES.SET_DATA:
			return { ...state, [action.payload.page]: action.payload.data };
		case TYPES.FORMAT_LAST_UPDATE_DATE:
			return action.payload === PAGES.DESIGNS ? 
				{ ...state, designs: state.designs?.map(formatDateUpdate) } :
				{ ...state, setouts: state.setouts?.map(formatDateUpdate) };
		case TYPES.ADD_LAST_USER_UPDATE:
			return { ...state, 
				designs: state.designs?.map(design => formatUpdateName(design, action.payload)),
				users: action.payload };
		case TYPES.FORMAT_STATUS:
			return { ...state, 
				designs: state.designs?.map(design => formatStatus(design)) };
		case TYPES.RESORT_DATA:
			return action.payload === PAGES.DESIGNS ? 
				{ ...state, designs: resortData(state.designs) } :
				{ ...state, setouts: resortData(state.setouts) };
		case TYPES.FORMAT_MACHINE_NAME:
			return { ...state,
				setouts: state.setouts?.map(formatMachineName) };
		case TYPES.SET_ERROR:
		default:
			return { ...state, 
				error: new Error() };
	}
};

const orderInformation = (dispatchData, data, page) => {
	dispatchData({ type: TYPES.SET_DATA, payload: { data: data, page: page } });
	dispatchData({ type: TYPES.RESORT_DATA, payload: page });
	dispatchData({ type: TYPES.FORMAT_LAST_UPDATE_DATE, payload: page });
	page === PAGES.DESIGNS && dispatchData({ type: TYPES.FORMAT_STATUS });
	page === PAGES.SETOUTS && dispatchData({ type: TYPES.FORMAT_MACHINE_NAME });
};


const SettingsProvider = ({ children }) => {
	const [ data, dispatchData ] = useReducer(reducerData, dataModel);
	const [ isEdited, setIsEdited ] = useState(false);



	const getDesignsData = async () => {
		dispatchData({ type: TYPES.SET_IS_LOADING, payload: true });

		const designsInformation = await getDesignData();
	
		if (designsInformation instanceof Error) {
			dispatchData({ type: TYPES.SET_ERROR });
		} else{
			orderInformation(dispatchData, designsInformation, PAGES.DESIGNS);
		}

		dispatchData({ type: TYPES.SET_IS_LOADING, payload: false });
	};




	const getUsers = async () => {
		dispatchData({ type: TYPES.SET_IS_LOADING, payload: true  });

		const usersInformation = await getUsersData();
		
		if (usersInformation instanceof Error) {
			dispatchData({ type: TYPES.SET_ERROR });
		} else{
			dispatchData({ type: TYPES.ADD_LAST_USER_UPDATE, payload: usersInformation });
		}
		dispatchData({ type: TYPES.SET_IS_LOADING, payload: false  });

	};


	const getSetouts = async () => {
		dispatchData({ type: TYPES.SET_IS_LOADING, payload: true  });

		const setoutsInformation = await getSetoutsData();
		if (setoutsInformation instanceof Error) {
			dispatchData({ type: TYPES.SET_ERROR });
		} else{
			orderInformation(dispatchData, setoutsInformation, PAGES.SETOUTS);
		}
		dispatchData({ type: TYPES.SET_IS_LOADING, payload: false  });
	};



	useEffect(() => {
		getDesignsData();
		getUsers();
		getSetouts();
		return () => {
			dispatchData({ type: TYPES.GET_DESIGN_DATA, payload: null });
			dispatchData({ type: TYPES.GET_SETOUTS_DATA, payload: null });
			setIsEdited(false);
		};
	}, [ isEdited ]);

	useEffect(() => {
		
	}, [ ]);

	return (
		<SettingsContext.Provider
			value={{ data, setIsEdited }}>
			{children}
		</SettingsContext.Provider>
	);
};
    
export default SettingsContext;
export { SettingsProvider };