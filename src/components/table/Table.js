import './table.scss';

import React from 'react';



const Table = ({ data, titles }) => {

	return (
		<div className='table-list-container'>
			<ul className='table-list'>
				<li className='table-row-styling'>
					{titles?.map((title, index) => 
						(<div className='table-row-item-container' key={index}>
							<h2 className='table-column-title'>{title}</h2>
						</div>))}
				</li>
				{data?.map(item => 
					<li key={item.id} >
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
								<p>{item.name}</p>
							</div>
						</a>
					</li>)}
			</ul>
            
		</div>
	);
};

export default Table;
