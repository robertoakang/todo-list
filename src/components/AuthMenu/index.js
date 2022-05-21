import React from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownIconMenu from '../DropdownIconMenu';
import { useAuth } from "../../context/auth";

export default function AuthMenu() {
	const { name, Logout } = useAuth();
	const navigate = useNavigate();

	function handleLogout() {
		Logout()
		navigate('/');
	}

	return (
		<DropdownIconMenu
			properties={{
				name,
				fields: [
					{
						text: 'Logout',
						handle: handleLogout,
					},
				],
			}}
		/>
	);
}
