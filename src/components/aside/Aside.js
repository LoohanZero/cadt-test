import './aside.scss';

import React from 'react';
import { Link } from 'react-router-dom';

const Aside = () => {
	return (
		<aside>
			<Link to='/designs'>Designs</Link>
			<Link to='/setouts'>Setouts</Link>
		</aside>
	);
};

export default Aside;
