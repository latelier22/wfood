'use client';

import { Link as ScrollLink } from 'react-scroll';
import Link from 'next/link';
import { useState } from 'react';

const links = [
  {
    path: 'petite-terre',
    name: 'Pamandzi (Petite-Terre)',
    offset: -50,
  },
  {
    path: 'grande-terre',
    name: 'Mamoudzou (Grande-Terre)',
    offset: -50,
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
