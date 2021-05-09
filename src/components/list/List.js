import './list.scss';

import React from 'react';


const List = ({ origin, data, titles }) => {
	
	return (
		<div className='main-list-container'>
			<ul>
				<li className='list-row-styling list-heading' >
					{titles?.map((title, index) =>
						(<div className='list-row-item-container' key={index}>
							<h2 className='list-column-title'>{title}</h2>
						</div>))}
				</li>
				{data?.map(item =>
					<li className='list-row-list-item' key={item.id} data-testid='data-list-item' >
						<a className='list-row-styling list-row-link'>
							<div className='list-row-item-container'>
								<p>{item.name}</p>
							</div>
							<div className='list-row-item-container'>
								<p>{origin ? item.machine_name?.replaceAll('_', ' ') : item.courses}</p>
							</div>
							<div className='list-row-item-container'>
								<p>{origin ? item.machine_width : item.wales}</p>
							</div>
							<div className='list-row-item-container'>
								<p>{origin ? item.courses : item.updated}</p>
							</div>
							<div className='list-row-item-container'>
								{origin ? <p>{item.updated}</p> :
									<div className='list-name-circle'>
										<p>{item.user_name_last_update?.split(' ').map(word => word.charAt(0)).join('')}</p>
									</div>}
							</div>
						</a>
					</li>)}
			</ul>
		</div>
	);
};

export default List;