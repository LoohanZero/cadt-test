/* eslint-disable no-console */
import React from 'react';

// const reduceTitles = (accumulatedTitles, newItem) => {
// 	for (const key in newItem) {
// 		if(!accumulatedTitles.includes(key)) {
// 			return [ ...accumulatedTitles, key ];
// 		}
// 	}
// 	return accumulatedTitles;
// };

const Table = ({ data, titles }) => {
	// const titles = data.reduce(reduceTitles, []);
	console.log(data);

	return (
		<div>
			<ul>
				<li className="table-heading-list-item">
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
