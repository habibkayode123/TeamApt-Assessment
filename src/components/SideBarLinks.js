import { useEffect, useRef, useState } from 'react';

const SideBarLinks = ({
	name,
	icon: Icon,
	setActiveNav,
	activeNav,
	toggleSideBar,
}) => {
	return (
		<li
			onClick={() => {
				setActiveNav(name);
			}}
		>
			<a href='#' id={activeNav === name ? 'active-nav' : ''}>
				<Icon />
				{toggleSideBar && <span>{name}</span>}
			</a>
		</li>
	);
};

export default SideBarLinks;
