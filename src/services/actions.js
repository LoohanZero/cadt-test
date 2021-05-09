const designsModel = { isLoading: false, 
	data: null, 
	error: null };

const ACTIONS = {
	SET_IS_LOADING: 'isLoading',
	GET_DESIGN_DATA: 'data',
	GET_USERS_DATA: 'users',
	SET_ERROR: 'error'
};

const TITLES = {
	DESIGNS: [ 'Name', 'Courses', 'Wale', 'Last Updated', 'By' ], 
	SETOUTS: [ 'Name', 'Machine Name', 'Machine Width', 'Courses', 'Last Updated' ]
};

export { ACTIONS, designsModel, TITLES };