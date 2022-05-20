import React from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownIconMenu from '../DropdownIconMenu';

export default function AuthMenu() {
  const name = 'Roberto Arruda Kang';
  const navigate = useNavigate();

  function handleLogout() {
    navigate('/');
  }

  return (
    <DropdownIconMenu properties={{
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
