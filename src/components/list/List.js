import './list.scss';

import React, { useState } from 'react';

import { PAGES } from '../../services/enums';
import { getInitials } from '../../services/helpers/helpers';
import Modal from '../modal/Modal';

const List = ({ origin, data, users, titles }) => {
	const [ isModalDisplayed, setIsModalDisplayed ] = useState(false);
	const [ informationDisplayed, setInformationDisplayed ] = useState(false);

	const displayInformation = item => {
		setInformationDisplayed(item);
		setIsModalDisplayed(true); 
	};

	return (
		<div className='main-list-container'>
			<ul className='list-container' data-testid='data-list'>
				<li className='list-row-styling list-heading' >
					{titles?.map((title, index) =>
						(<div className='list-row-item-container' key={index}>
							<h2 className='list-column-title'>{title}</h2>
						</div>))}
				</li>
				{data?.map(item =>
					<li className='list-row-list-item' key={item.id} data-testid='data-list-item' >
						<a onClick={() => displayInformation(item)} className='list-row-styling list-row-link'>
							<div className='list-row-item-container'>
								<p>{item.name}</p>
							</div>
							<div className='list-row-item-container'>
								<p>{origin === PAGES.SETOUTS ? item.machine_name : item.courses}</p>
							</div>
							<div className='list-row-item-container'>
								<p>{origin === PAGES.SETOUTS ? item.machine_width : item.wales}</p>
							</div>
							<div className='list-row-item-container'>
								<p>{origin === PAGES.SETOUTS ? item.courses : item.updated}</p>
							</div>
							<div className='list-row-item-container'>
								{origin === PAGES.SETOUTS ? <p>{item.updated}</p> :
									<div className='list-name-circle'>
										<p>{item && item.user_name_last_update && getInitials(item.user_name_last_update)}</p>
									</div>}
							</div>
						</a>
					</li>)}
			</ul>
			{isModalDisplayed && <Modal page={origin} item={informationDisplayed} users={users} titles={titles} setIsModalDisplayed={setIsModalDisplayed} /> }
		</div>
	);
};

export default List;