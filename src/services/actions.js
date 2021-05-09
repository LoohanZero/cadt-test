const dataModel = { isLoading: false,
	data: null,
	error: null };
	
const ACTIONS = {
	SET_IS_LOADING: 'isLoading',
	SET_DESIGN_DATA: 'data',
	SET_SETOUTS_DATA: 'setouts',
	ADD_LAST_USER_UPDATE: 'user',
	FORMAT_LAST_UPDATE_DATE: 'formatDate',
	RESORT_SETOUTS: 'resortSetouts',
	SET_ERROR: 'error'
};
	
const TITLES = {
	DESIGNS: [ 'Name', 'Courses', 'Wale', 'Last Updated', 'By' ],
	SETOUTS: [ 'Name', 'Machine Name', 'Machine Width', 'Courses', 'Last Updated' ]
};
	
export { ACTIONS, dataModel, TITLES };