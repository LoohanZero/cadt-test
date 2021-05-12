import { PAGES, TYPES } from '../enums';

//----------------------------- CONTEXT HELPERS ----------------------------------

const formatDateUpdate = item => {
	const formatDMMYY = new Date(item.updated).toLocaleString('dv-MV', { year:'2-digit',month:'2-digit', day:'numeric' }).split(' ')[0];
	return { ...item, updated: formatDMMYY };
};

const formatMachineName = setout => {
	return { ...setout, machine_name: setout?.machine_name?.replaceAll('_', ' ') };
};

const formatStatus = design => {
	return { ...design, status: design.status?.replaceAll('_', ' ').replaceAll('-', ' ') };
};

const formatUpdateName = (design, users) => {
	const userName = users?.filter(user => user.id === design.user_id_last_update);
	return { ...design, user_name_last_update: userName[0]?.name };
};


const resortData = data => {
	return data?.sort((firstDesign, secondDesign) => new Date(secondDesign.updated) - new Date(firstDesign.updated));
};

const orderInformation = (dispatchData, data, page) => {
	dispatchData({ type: TYPES.SET_DATA, payload: { data: data, page: page } });
	dispatchData({ type: TYPES.RESORT_DATA, payload: page });
	dispatchData({ type: TYPES.FORMAT_LAST_UPDATE_DATE, payload: page });
	page === PAGES.DESIGNS && dispatchData({ type: TYPES.FORMAT_STATUS });
	page === PAGES.SETOUTS && dispatchData({ type: TYPES.FORMAT_MACHINE_NAME });
};

//----------------------------- MODAL HELPERS ----------------------------------

const checkIfStatusIsIncluded = titles => {
	return !titles.includes('Status') ? [ ...titles, 'Status' ] : titles;
};

const checkIfUserIsInDB = (users, name) => {
	return users.some(user => user.name.toLowerCase() === name.toLowerCase());
};


const updateDate = () => {
	const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: 3 };
	const today = new Date();
	return new Intl.DateTimeFormat('sv-SE', options).format(today).toString().replace(',', '.');
};

export { checkIfStatusIsIncluded, checkIfUserIsInDB, formatDateUpdate, formatMachineName, formatStatus, formatUpdateName, orderInformation, resortData, updateDate };