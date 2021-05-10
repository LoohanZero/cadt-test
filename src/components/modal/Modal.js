/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-console */
import './modal.scss';

import React, { useState } from 'react';

import { EDITION_TYPES, PAGES } from '../../services/enums';


const checkIfStatusIsIncluded = titles => {
	return [ ...titles, !titles.includes('Status') && 'Status' ];
};


const Modal = ({ page, item, titles }) => {
	const [ settings, setSettings ] = useState(item[0]);
	const editPage = page.slice(0, -1);
	const modalTitles = page === PAGES.DESIGNS ? checkIfStatusIsIncluded(titles) : titles;
	// eslint-disable-next-line no-console
	console.log(settings);

	const changeEditValue = (type, value) => {
		setSettings({ ...settings, [type]: value });
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
                            	{<input className='modal-information-input'onClick={event => changeEditValue(EDITION_TYPES.EDIT_COURSES, event.target.value)} defaultValue={settings.courses} type='number' min='0'/> } 
                            	<input className='modal-information-input' onClick={event => changeEditValue(EDITION_TYPES.EDIT_WALES, event.target.value)} defaultValue={settings.wales} />
                            	<input className='modal-information-input' value={settings.updated} disabled />
                            	<input className='modal-information-input' onClick={event => changeEditValue(EDITION_TYPES.EDIT_LAST_UPDATE, event.target.value)} defaultValue={settings.user_name_last_update} />
                            	<input className='modal-information-input' onClick={event => changeEditValue(EDITION_TYPES.EDIT_STATUS, event.target.value)}defaultValue={settings.status} />
                            </>}
								{page === PAGES.SETOUTS && 
                            <>
                            	<input className='modal-information-input' onClick={event => changeEditValue(EDITION_TYPES.EDIT_MACHINE_NAME, event.target.value)} defaultValue={settings.machine_name} />
                            	<input className='modal-information-input' onClick={event => changeEditValue(EDITION_TYPES.EDIT_MACHINE_WIDTH, event.target.value)} defaultValue={settings.machine_width} type='number' min='0'/>
                            	<input className='modal-information-input' onClick={event => changeEditValue(EDITION_TYPES.EDIT_COURSES, event.target.value)} defaultValue={settings.courses} type='number' min='0' />
                            	<input className='modal-information-input' value={settings.updated} disabled />
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
