'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';
import { useSession, signOut } from 'next-auth/react';

import Nav from './Nav';
import NavMobile from './NavMobile';
import { Button } from './ui/button';

const Header = () => {
  const [active, setActive] = useState(false);
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // detect scroll
      setActive(window.scrollY > 100);
    };

    // add event listener
    window.addEventListener('scroll', handleScroll);

    // clear event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        active ? 'bg-black-heavy py-4' : 'bg-none py-8'
      } fixed top-0 w-full z-50 left-0 right-0 transition-all duration-200`}
    >
      <div className='container mx-auto'>
        {/* logo, nav, btn */}
        <div className='flex items-center justify-between'>
          {/* logo */}
          <Link href='/'>
            <Image src='/logo.jpg' width={200} height={75} alt='' />
          </Link>
          {/* nav */}
          <Nav
            containerStyles='hidden xl:flex gap-x-12 text-white'
            linkStyles='capitalize'
          />
          {/* btn */}
          {session ? (
            <div className='relative inline-block text-left'>
              <button
                type='button'
                className='mx-2 py-2 px-4 bg-black text-white capitalize'
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                ADMIN
              </button>
              {dropdownOpen && (
                <div className='absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5'>
                  <div className='py-1'>
                    <Link href='/admin/manage-menu' className='block px-4 py-2 text-white text-sm hover:bg-gray-100'>
                      Gérer le menu
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className='block w-full text-left px-4 py-2 text-sm text-white  hover:text-orange-hover'
                    >
                      Se déconnecter
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <ScrollLink to='reservation' smooth={true}>
              <Button variant='orange' size='sm'>
                Réserver
              </Button>
            </ScrollLink>
          )}
          {/* mobile nav */}
          <NavMobile
            containerStyles='xl:hidden'
            iconStyles='text-3xl'
            linkStyles='uppercase'
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
