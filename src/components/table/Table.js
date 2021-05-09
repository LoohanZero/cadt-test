import './table.scss';

import React from 'react';



const Table = ({ data, titles }) => {

	return (
		<div className='table-list-container'>
			<ul className='table-list'>
				
				<li className='table-row-styling table-heading'>
					{titles?.map((title, index) => 
						(<div className='table-row-item-container' key={index}>
							<h2 className='table-column-title'>{title}</h2>
						</div>))}
				</li>
				{data?.map(item => 
					<li className='table-row-list-item' key={item.id} >
						<a className='table-row-styling'>
							<div className='table-row-item-container'>
								<p>{item.name}</p>
							</div>
							<div className='table-row-item-container'>
								<p>{item.courses}</p>
							</div>
							<div className='table-row-item-container'>
								<p>{item.wales}</p>
							</div>
							<div className='table-row-item-container'>
								<p>{item.updated}</p>
							</div>
							<div className='table-row-item-container'>
								<div className='table-name-circle'>
									<p>{item.user_name_last_update?.split(' ').map(word => word.charAt(0)).join('')}</p>
								</div>
							</div>
						</a>
					</li>)}
			</ul>
            
		</div>
	);
};

export default Table;
