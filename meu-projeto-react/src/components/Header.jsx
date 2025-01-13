import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src="/assets/logo.png" alt="Logo Bebecê" />
      </div>
      <nav className="header__menu">
        <ul>
          <li><a href="#">Início</a></li>
          <li><a href="#">Loja</a></li>
          <li><a href="#">Contato</a></li>
        </ul>
      </nav>
      <div className="header__search">
        <input type="text" placeholder="Buscar..." />
        <button>Buscar</button>
      </div>
    </header>
  );
};

export default Header;
