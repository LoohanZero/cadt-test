import './aside.scss';

import React from 'react';
import { NavLink } from 'react-router-dom';

const Aside = () => {
	return (
		<aside className='aside-container'>
			<nav className='aside-nav'>
				<NavLink className='aside-nav-link' activeClassName="selected" to='/designs' >
					<p className='aside-nav-link-text'>Designs</p>
				</NavLink>
				<NavLink className='aside-nav-link' activeClassName="selected" to='/setouts'>
					<p className='aside-nav-link-text'>Setouts</p>
				</NavLink>
			</nav>
		</aside>
	);
};

export default Aside;
