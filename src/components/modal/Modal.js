/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-console */
import './modal.scss';

import React, { useEffect, useRef, useState } from 'react';
import { GrClose } from 'react-icons/gr';

import { EDITION_TYPES, PAGES } from '../../services/enums';


const checkIfStatusIsIncluded = titles => {
	return [ ...titles, !titles.includes('Status') && 'Status' ];
};


const Modal = ({ page, item, titles, setIsModalDisplayed }) => {
	const [ settings, setSettings ] = useState(item);
	const editPage = page.slice(0, -1);
	const modalTitles = page === PAGES.DESIGNS ? checkIfStatusIsIncluded(titles) : titles;
	const modalRef = useRef(null);

	const handleClickOutside = event => {
		if (modalRef.current && !modalRef.current.contains(event.target)) {
			setIsModalDisplayed(false);
		}
	};
    
	const changeEditValue = (type, value) => {
		setSettings({ ...settings, [type]: value });
	};

	const sendEditedInformation = event => {
		event.preventDefault();

		setIsModalDisplayed(false);
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [  ]);

	return (
		<>
			<div className='modal-main-container' >
				<div className='modal-container' ref={modalRef}>
					<div className='modal-title-container'>
						<h3 className='modal-title'>Edit {editPage}</h3>
						<a onClick ={() => setIsModalDisplayed(false)}>
							<GrClose className='modal-close-icon' />
						</a>
					</div>
					<form className='modal-form' action={event=>sendEditedInformation(event)} method='POST'>
						<div className='modal-form-container'>
							<div className='modal-labels-container'>
								{modalTitles.map((title, index) => 
									<label className='modal-label' key={index} htmlFor={title}>
										{title}:
									</label>)}
							</div>
							<div className='modal-information-container'>
								<input className='modal-information-input' onClick={event => changeEditValue(EDITION_TYPES.EDIT_NAME, event.target.value)}  defaultValue={settings.name} required/>
								{page === PAGES.DESIGNS &&
                                <>
                                	{<input className='modal-information-input'onClick={event => changeEditValue(EDITION_TYPES.EDIT_COURSES, event.target.value)} defaultValue={settings.courses} type='number' min='0' required/> } 
                                	<input className='modal-information-input' onClick={event => changeEditValue(EDITION_TYPES.EDIT_WALES, event.target.value)} defaultValue={settings.wales} required />
                                	<input className='modal-information-input' value={settings.updated} disabled />
                                	<input className='modal-information-input' onClick={event => changeEditValue(EDITION_TYPES.EDIT_USER_NAME_LAST_UPDATE, event.target.value)} defaultValue={settings.user_name_last_update} required />
                                	<input className='modal-information-input' onClick={event => changeEditValue(EDITION_TYPES.EDIT_STATUS, event.target.value)}defaultValue={settings.status} required />
                                </>}
								{page === PAGES.SETOUTS && 
                                <>
                                	<input className='modal-information-input' onClick={event => changeEditValue(EDITION_TYPES.EDIT_MACHINE_NAME, event.target.value)} defaultValue={settings.machine_name} required/>
                                	<input className='modal-information-input' onClick={event => changeEditValue(EDITION_TYPES.EDIT_MACHINE_WIDTH, event.target.value)} defaultValue={settings.machine_width} type='number' min='0' required/>
                                	<input className='modal-information-input' onClick={event => changeEditValue(EDITION_TYPES.EDIT_COURSES, event.target.value)} defaultValue={settings.courses} type='number' min='0' required/>
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
