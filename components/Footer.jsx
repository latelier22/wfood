'use client';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <motion.footer
      variants={fadeIn('up', 0.2)}
      initial='hidden'
      whileInView={'show'}
      viewport={{ once: false, amount: 0 }}
      className='bg-footer bg-cover bg-no-repeat text-white pt-16'
    >
      <div className='container mx-auto'>
        <div className='flex flex-col justify-between xl:flex-row'>
          {/* logo */}
          <div className='w-[300px] mb-8 xl:mb-0'>
            <Link href='/'>
              <Image src='/logo.jpg' width={250} height={100} alt='' />
            </Link>
          </div>
          {/* grid items */}
          <div className='flex-1 grid grid-cols-1 xl:grid-cols-3 gap-[50px] mb-8 xl:mb-16'>
            {/* blog */}
            <div>
              <h4 className='font-semibold mb-5'>GRANDE TERRE</h4>
              <ul className='flex flex-col gap-y-6 text-sm'>
                <li>
                  TERANGA Resto&apos; Galerie <br />
                  16 bis rue Mamawe <br />
                  97600 MAMOUDZOU
                </li>
                <li>
                  Fixe 0269623298 / Mobile 0614387559</li>



              </ul>
            </div>
            {/* item */}
            <div>
              <h4 className='font-semibold mb-5'>PETITE TERRE</h4>
              <ul className='flex flex-col gap-y-6 text-sm'>
                <li>
                  TERANGA Resto&apos; Galerie <br />
                  16 bis rue Mamawe <br />
                  97600 MAMOUDZOU
                </li>
                <li>
                  Fixe 0269623298 / Mobile 0614387559</li>



              </ul>
            </div>
            {/* socials */}
            <div>
              <h4 className='font-semibold mb-5'>Accueil</h4>
              <ul className='flex flex-col gap-y-6 text-sm'>
                <li>
                  <Link href='/'>Menu</Link>
                </li>
                <li>
                  <Link href='/'>Galerie d&apos;Art</Link>
                </li>
                <li>
                  <Link href='/'>On parle de nous</Link>
                </li>
                <li>
                  <Link href='/'>Réservez</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* copyright text */}
        <div className='py-4 border-t border-white/10'>
          <p className='text-white/60 text-center text-sm'>
            Copyright &copy; L'Atelie WebDesign 2024
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
