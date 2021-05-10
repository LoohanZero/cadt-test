/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-console */
import './modal.scss';

import React, { useReducer } from 'react';

import { EDITION_TYPES, PAGES } from '../../services/enums';

const reduceSettings = (state, action) => {
	switch (action.type) {
		case EDITION_TYPES.EDIT_NAME:
			return { ...state, 
				name: action.payload };
		case EDITION_TYPES.EDIT_COURSES:
			return { ...state, 
				data: action.payload };
		case EDITION_TYPES.EDIT_LAST_UPDATE:
			return { ...state, 
				data: {} };
		case EDITION_TYPES.EDIT_USER_ID_LAST_UPDATE:
			return { ...state, 
				data: {} };
		case EDITION_TYPES.WALES:
			return { ...state, 
				data: {} };
		case EDITION_TYPES.EDIT_STATUS:
			return { ...state, 
				data: {} };
		case EDITION_TYPES.EDIT_MACHINE_NAME:
			return { ...state, 
				data: {} };
		case EDITION_TYPES.EDIT_MACHINE_WIDTH:
			return { ...state, 
				data: {} };
		case EDITION_TYPES.SET_ERROR:
		default:
			return { ...state, 
				error: new Error() };
	}
};

const checkIfStatusIsIncluded = titles => {
	return [ ...titles, !titles.includes('Status') && 'Status' ];
};


const Modal = ({ page, item, titles }) => {
	const [ settings, dispatchSettings ] = useReducer(reduceSettings, item[0]);
	const editPage = page.slice(0, -1);
	const modalTitles = page === PAGES.DESIGNS ? checkIfStatusIsIncluded(titles) : titles;
	const item1 = item[0];
	// eslint-disable-next-line no-console
	console.log(item1, settings, dispatchSettings);

	const changeEditValue = (type, value) => {
		dispatchSettings({ type: type,  payload: value });
	};


	return (
		<>
			<div className='modal-main-container'>
				<div className='modal-container'>
					<h3 className='modal-title'>Edit {editPage}</h3>

					<form className='modal-form'>
						<div className='modal-form-container'>
							<div className='modal-labels-container'>
								{modalTitles.map((title, index) => 
									<label className='modal-label' key={index} htmlFor={title}>
										{title}:
									</label>)}
							</div>
							<div className='modal-information-container'>
								<input className='modal-information-input' onClick={event => changeEditValue(EDITION_TYPES.EDIT_NAME, event.target.value)}  defaultValue={settings.name} />
								{page === PAGES.DESIGNS &&
                            <>
                            	{<input className='modal-information-input'onClick={event => changeEditValue(EDITION_TYPES.EDIT_COURSES, event.target.value)} defaultValue={settings.courses} /> } 
                            	<input className='modal-information-input' onClick={event => changeEditValue(EDITION_TYPES.EDIT_WALES, event.target.value)} defaultValue={settings.wales} />
                            	<input className='modal-information-input' onClick={event => changeEditValue(EDITION_TYPES.EDIT_COURSES, event.target.value)} defaultValue={settings.updated} />
                            	<input className='modal-information-input' onClick={event => changeEditValue(EDITION_TYPES.EDIT_LAST_UPDATE, event.target.value)} defaultValue={settings.user_name_last_update} />
                            	<input className='modal-information-input' onClick={event => changeEditValue(EDITION_TYPES.EDIT_STATUS, event.target.value)}defaultValue={settings.status} />
                            </>}
								{page === PAGES.SETOUTS && 
                            <>
                            	<input className='modal-information-input' onClick={event => changeEditValue(EDITION_TYPES.EDIT_MACHINE_NAME, event.target.value)} defaultValue={settings.machine_name} />
                            	<input className='modal-information-input' onClick={event => changeEditValue(EDITION_TYPES.EDIT_MACHINE_WIDTH, event.target.value)} defaultValue={settings.machine_width} />
                            	<input className='modal-information-input' onClick={event => changeEditValue(EDITION_TYPES.EDIT_COURSES, event.target.value)} defaultValue={settings.courses} />
                            	<input className='modal-information-input' onClick={event => changeEditValue(EDITION_TYPES.EDIT_LAST_UPDATE, event.target.value)} defaultValue={settings.updated} />
                            </>}
							</div>
						</div>
						<div className='modal-submit-button-container'>
							<button className='modal-submit-button' type='submit'>Update</button>
						</div>
					</form>
                    
				</div>
			</div>
			<div className='modal-background' />
		</>
	);
};

export default Modal;
