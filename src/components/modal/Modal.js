/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-console */
import './modal.scss';

import React, { useEffect, useRef, useState } from 'react';
import { GrClose } from 'react-icons/gr';

import { EDITION_TYPES, PAGES } from '../../services/enums';
import { postData } from '../../services/postData';


const checkIfStatusIsIncluded = titles => {
	return [ ...titles, !titles.includes('Status') && 'Status' ];
};

const updateDate = () => {
	const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: 3 };
	const today = new Date();
	return new Intl.DateTimeFormat('sv-SE', options).format(today).toString().replace(',', '.');
};

const updateItemInformation= async (settings, page, users, setError) => {
	if(page === PAGES.DESIGNS) {
		const resultOfEdition = await editUsersInfomation(users, settings);
		const body = { ...settings, 
			updated: updateDate(), 
			id: null, 
			user_id_last_update: resultOfEdition.id 
		};
		console.log(body);

		if(resultOfEdition instanceof Error) {
			setError(true);
			return;
		}

		delete body.user_name_last_update;
		console.log(body);
		
		return await body;
	}

	return { ...settings, 
		updated: updateDate(), 
		id: null };
};

const checkIfUserIsInDB = (users, name) => {
	return users.some(user => user.name.toLowerCase() === name.toLowerCase());
};

const editUsersInfomation = async (users, settings) => {
	const isUserInDB = checkIfUserIsInDB(users, settings.user_name_last_update);
	const userModel = {
		id: null, 
		name: settings.user_name_last_update
	};

	if(!isUserInDB ){
		return await postData('users', userModel);
	} else {
		return  {
			id: settings.user_id_last_update, 
		};
	}
};


const Modal = ({ page, users, item, titles, setIsModalDisplayed }) => {
	const [ settings, setSettings ] = useState(item);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState(false);
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

	
	const sendEditedInformation = async event => {
		event.preventDefault();
		setIsLoading(true);

		const body = await updateItemInformation(settings, page, users, setError);

		const sendDataInformation = body && await postData(page, body);

		if(sendDataInformation instanceof Error) {
			setError(true);
			return;
		}
	
		setIsLoading(false);
		setIsModalDisplayed(false);
		
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [ isLoading ]);
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
					<form className='modal-form' onSubmit={event=>sendEditedInformation(event)} action='' method='POST'>
						<div className='modal-form-container'>
							<div className='modal-labels-container'>
								{modalTitles.map((title, index) => 
									<label className='modal-label' key={index} htmlFor={title}>
										{title}:
									</label>)}
							</div>
							<div className='modal-information-container'>
								<input className='modal-information-input' onChange={event => changeEditValue(EDITION_TYPES.EDIT_NAME, event.target.value)}  defaultValue={settings.name} required/>
								{page === PAGES.DESIGNS &&
                                <>
                                	{<input className='modal-information-input'onChange={event => changeEditValue(EDITION_TYPES.EDIT_COURSES, event.target.value)} defaultValue={settings.courses} type='number' min='0' required/> } 
                                	<input className='modal-information-input' onChange={event => changeEditValue(EDITION_TYPES.EDIT_WALES, event.target.value)} defaultValue={settings.wales} required />
                                	<input className='modal-information-input' value={settings.updated} disabled />
                                	<input className='modal-information-input' onChange={event => changeEditValue(EDITION_TYPES.EDIT_USER_NAME_LAST_UPDATE, event.target.value)} defaultValue={settings.user_name_last_update} required />
                                	<input className='modal-information-input' onChange={event => changeEditValue(EDITION_TYPES.EDIT_STATUS, event.target.value)}defaultValue={settings.status} required />
                                </>}
								{page === PAGES.SETOUTS && 
                                <>
                                	<input className='modal-information-input' onChange={event => changeEditValue(EDITION_TYPES.EDIT_MACHINE_NAME, event.target.value)} defaultValue={settings.machine_name} required/>
                                	<input className='modal-information-input' onChange={event => changeEditValue(EDITION_TYPES.EDIT_MACHINE_WIDTH, event.target.value)} defaultValue={settings.machine_width} type='number' min='0' required/>
                                	<input className='modal-information-input' onChange={event => changeEditValue(EDITION_TYPES.EDIT_COURSES, event.target.value)} defaultValue={settings.courses} type='number' min='0' required/>
                                	<input className='modal-information-input' value={settings.updated} disabled />
                                </>}
							</div>
						</div>
						{error && <p className='modal-error-text'>There was an error processing the information. Please, try again later.</p>}
						<div className='modal-submit-button-container'>
							{<button className='modal-submit-button' type='submit' disabled={isLoading && true} >{isLoading ? 'Processing Submition' : 'Update'}</button> }
						</div>
					</form>
                    
				</div>
			</div>
			<div className='modal-background' />
		</>
	);
};

export default Modal;
