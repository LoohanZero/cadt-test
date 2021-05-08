import './table.scss';

import React from 'react';



const Table = ({ data, titles }) => {


	return (
		<div>
			<ul>
				<li className='table-heading-list-item'>
					{titles?.map((title, index) => 
						(<div key={index}>
							<h2>{title}</h2>
						</div>))}
				</li>
				{data?.map((item, index) => <li key={index}>{item.id}</li>)}
			</ul>
            
		</div>
	);
};

export default Table;
