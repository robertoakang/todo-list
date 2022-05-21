import React from 'react';
import AuthMenu from '../AuthMenu';
import './index.css';

export default function Header() {
	return (
		<div className="header-top">
			<div className="header-span">
				<span>TODO List</span>
			</div>
			<AuthMenu />
		</div>
	);
}
