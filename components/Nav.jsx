import { Link as ScrollLink } from 'react-scroll';
import Link from 'next/link';

const links = [
  {
    path: '/',
    name: 'Accueil',
    offset: -50,
    external: true,
  },
  {
    path: 'menu',
    name: 'Menu',
    offset: -50,
  },
  {
    path: 'galery',
    name: 'Galerie d\'Art',
    offset: -50,
  },
  {
    path: 'about',
    name: 'On parle de nous',
    offset: -150,
  },
  {
    path: 'contact',
    name: 'Contact',
    offset: 0,
  },
];

const Nav = ({ containerStyles, linkStyles }) => {
  return (
    <nav className={`${containerStyles}`}>
      {links.map((link, index) => {
        if (link.external) {
          return (
            <Link key={index} href={link.path} className={`${linkStyles}`}>
              {link.name}
            </Link>
          );
        } else {
          return (
            <ScrollLink
              key={index}
              to={link.path}
              spy={true}
              smooth={true}
              offset={link.offset}
              duration={500}
              className={`${linkStyles}`}
            >
              {link.name}
            </ScrollLink>
          );
        }
      })}
    </nav>
  );
};

export default Nav;
