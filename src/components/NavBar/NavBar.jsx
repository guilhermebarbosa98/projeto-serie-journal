import { NavLink } from 'react-router-dom';
import './NavBar.css';

const links = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/cadastrar', label: 'Cadastrar série' },
  { to: '/series', label: 'Minhas séries' },
];

function NavBar() {
  return (
    <header className="navbar">
      <div className="navbar__perforation" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand">
          <span className="navbar__brand-mark">▶</span>
          SérieJournal
        </NavLink>
        <nav aria-label="Navegação principal">
          <ul className="navbar__links">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
