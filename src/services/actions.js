const designsModel = { isLoading: false, 
	data: null, 
	error: null };

const ACTIONS = {
	SET_IS_LOADING: 'isLoading',
	GET_DESIGN_DATA: 'data'
};

export { ACTIONS, designsModel };