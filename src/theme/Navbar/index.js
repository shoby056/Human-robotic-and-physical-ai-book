import React from 'react';
import NavbarLayout from '@theme/Navbar/Layout';
import NavbarContent from '@theme/Navbar/Content';
import LanguageSwitcher from '../../components/LanguageSwitcher';

function NavbarContentWithLanguageSwitcher(props) {
  return (
    <>
      <NavbarContent {...props} />
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '0.5rem' }}>
        <LanguageSwitcher />
      </div>
    </>
  );
}

function Navbar() {
  return (
    <NavbarLayout>
      <NavbarContentWithLanguageSwitcher />
    </NavbarLayout>
  );
}

export default Navbar;