'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import { Button } from './ui/button';
import { Link as ScollLink}  from 'react-scroll';
import Link from 'next/link';

const Hero = ({ resto, gauche = true }) => {

const restoLink = resto ==="petite-terre" ?  'https://petite-terre.teranga-resto-galerie.fr' : 'https://grande-terre.teranga-resto-galerie.fr'

  return (
    <section
      className={`${gauche ? 'bg-hero' : 'bg-hero2'} bg-no-repeat relative xl:bg-cover xl:h-[1098px] py-40 pb-32 xl:py-0`}
      id={resto}
    >
      <Link href={restoLink}>
      <div className='container mx-auto'>
        {/* text & img */}
        <div className={`flex items-center xl:h-[960px] ${gauche ? '' : 'flex-row-reverse'}`}>
          {/* text */}
          <div className={`w-full xl:max-w-[460px] text-center xl:text-left ${gauche ? '' : 'xl:text-right'}`}>
            <motion.h1
              variants={fadeIn('down', 0.2)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.4 }}
              className='text-white mb-7'
            >
             NOUVEAU <br />
            </motion.h1>
            <motion.p
              variants={fadeIn('down', 0.4)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.4 }}
              className='text-white font-semibold mb-7'
            >
              par <span className='text-orange'>A découvrir !</span>
            </motion.p>
            <motion.p
              variants={fadeIn('down', 0.6)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.4 }}
              className='text-white mb-12 max-w-lg mx-auto xl:max-w-none xl:mx-0'
            >
              Nouveau, en petite terre à Pamandzi, Teranga propose ses plats pour vous faire découvrir les saveurs de l'Afrique
            </motion.p>
            <motion.div
              variants={fadeIn('down', 0.8)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.4 }}
            >
             
                <Button>SITE PETITE-TERRE</Button>
          
            </motion.div>
          </div>
          {/* image */}
          <motion.div
            variants={fadeIn('up', 0.8)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            className={`hidden xl:flex ${gauche ? 'xl:absolute xl:top-[200px] xl:right-0' : 'xl:absolute xl:top-[200px] xl:left-0'}`}
            style={{ width: 'auto', height: 'auto' }}
          >
            <Image
              src='/reservation/bg.png'
              width={756}
              height={682}
              alt=''
              style={{ width: 'auto', height: 'auto' }}
            />
          </motion.div>
        </div>
      </div>
      {/* coffee img */}
       {/* <motion.div
        variants={fadeIn('up', 1.2)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: false, amount: 0.1 }}
        className='hidden xl:flex xl:relative xl:-top-36 xl:flex-row-reverse xl:-m-10'
        style={{ width: 'auto', height: 'auto' }}
      >
        <Image
          src='/hero/coffee.png'
          width={386}
          height={404}
          alt=''
          style={{ width: 'auto', height: 'auto' }}
        />
      </motion.div> */}
      </Link>
    </section>
  );
};

export default Hero;
