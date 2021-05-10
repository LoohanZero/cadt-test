const dataModel = { isLoading: false,
	data: null,
	error: null };
	
const TYPES = {
	SET_IS_LOADING: 'isLoading',
	SET_DESIGN_DATA: 'data',
	SET_SETOUTS_DATA: 'setouts',
	ADD_LAST_USER_UPDATE: 'user',
	FORMAT_LAST_UPDATE_DATE: 'formatDate',
	FORMAT_MACHINE_NAME: 'formatMachineName',
	RESORT_SETOUTS: 'resortSetouts',
	SET_ERROR: 'error'
};

const EDITION_TYPES = {
	EDIT_NAME: 'name',
	EDIT_COURSES: 'courses',
	EDIT_WALES: 'wales',
	EDIT_LAST_UPDATE: 'updated',
	EDIT_STATUS: 'status',
	EDIT_USER_ID_LAST_UPDATE: 'user_id_last_update',
	EDIT_MACHINE_NAME: 'machine_name',
	EDIT_USER_NAME_LAST_UPDATE: 'user_id_last_update',
	EDIT_MACHINE_WIDTH: 'machine_width', 
	SET_ERROR: 'error'
};
	
const TITLES = {
	DESIGNS: [ 'Name', 'Courses', 'Wales', 'Last Updated', 'By' ],
	SETOUTS: [ 'Name', 'Machine Name', 'Machine Width', 'Courses', 'Last Updated' ]
};

const PAGES = {
	DESIGNS: 'designs', 
	SETOUTS: 'setouts'
};
	
export { dataModel, EDITION_TYPES, PAGES, TITLES, TYPES };