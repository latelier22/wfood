'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import { Button } from './ui/button';

const About = () => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <section
      className='grid grid-cols-1 xl:grid-cols-2 gap-x-[74px] p-8 md:p-12 xl:p-0 items-center'
      id='about'
    >
      {/* text */}
      <motion.div
        variants={fadeIn('right', 0.2)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: false, amount: 0.2 }}
        className='xl:pl-[135px]'
      >
        <h1 className='mb-9'>On parle de nous...</h1>
        <p className='mb-8'>
          Nous avons déjeuné dans ce restaurant un midi avec nos enfants et c'était une bonne expérience. Les plats typiques sénégalais sont juste parfaits et le service est très rapide. Ce n'est pas utile de réserver car le service est tellement rapide qu'il n'y a pas d'attente. Je recommande.
        </p>
        <p className='mb-10'>
          Restaurant sénégalais vraiment sympa. On a bien mangé, c’était très bon. On a aimé le jus d’hibiscus. Bon rapport qualité-prix.
        </p>
        {showMore && (
          <>
            <p className='mb-10'>
              Vraiment super qualité avec une patronne adorable qui fait le mieux pour vous, on y mange très très bien. Facile à trouver, idéal après le site.
            </p>
            <p className='mb-10'>
              Si vous souhaitez découvrir la cuisine sénégalaise, vous êtes au bon endroit ! Un accueil très chaleureux, des plats délicieux et généreux, nous nous sommes régalées. Son mafé, poulet yassa et tous ses autres plats sont excellents. Un restaurant incontournable lors de votre séjour à Dakhla. Je recommande à 100%.
            </p>
            <p className='mb-10'>
              Nous y étions hier en famille et nous avions apprécié l’accueil et les plats choisis. Nous sommes très satisfaits et nous comptons y retourner dans la semaine.
            </p>
            <p className='mb-10'>
              Nous nous sommes régalés à Teranga. Nous avons goûté une spécialité avec du poulet et une spécialité avec du poisson, les deux plats étaient succulents. Excellent rapport qualité-prix !
            </p>
            <p className='mb-10'>
              Une cuisine simple et délicieuse. Super service agréable et efficace, et propreté impeccable ! Super rapport qualité/prix. Je recommande vivement !
            </p>
          </>
        )}
        <Button onClick={handleShowMore}>
          {showMore ? 'Voir moins...' : 'En savoir plus...'}
        </Button>
      </motion.div>
      {/* img */}
      <motion.div
        variants={fadeIn('left', 0.4)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: false, amount: 0.2 }}
      >
        <Image
          src='/about/img.png'
          width={705}
          height={771}
          alt=''
          className='hidden xl:flex'
        />
      </motion.div>
    </section>
  );
};

export default About;
