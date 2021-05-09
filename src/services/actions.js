const designsModel = { isLoading: false, 
	data: null, 
	error: null };

const ACTIONS = {
	SET_IS_LOADING: 'isLoading',
	SET_DESIGN_DATA: 'data',
	ADD_LAST_USER_UPDATEA: 'user',
	FORMAT_LAST_UPDATE_DATE: 'formatDate',
	SET_ERROR: 'error'
};

const TITLES = {
	DESIGNS: [ 'Name', 'Courses', 'Wale', 'Last Updated', 'By' ], 
	SETOUTS: [ 'Name', 'Machine Name', 'Machine Width', 'Courses', 'Last Updated' ]
};

export { ACTIONS, designsModel, TITLES };