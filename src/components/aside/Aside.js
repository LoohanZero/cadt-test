import './aside.scss';

import React, { useState } from 'react';
import { BsChevronLeft,BsChevronRight } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

const Aside = () => {
	const [ displayAside, setDisplayAside ] = useState(false);

	return (
		<aside className={`aside-container ${displayAside && 'aside-displayed' }`}>
			<a onClick={() => setDisplayAside(!displayAside)} className='aside-display-nav' >
				{displayAside ? <BsChevronLeft /> : <BsChevronRight /> }
			</a>
			<nav className='aside-nav' >
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
