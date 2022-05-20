import React from 'react';
import AuthMenu from '../AuthMenu';
import './index.css';

export default function Header() {
  return (
    <header className="header-top">
      <span className="header-span">TODO List</span>
      <AuthMenu />
    </header>
  );
}
