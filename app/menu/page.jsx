'use client';
import React from 'react';
import Header from '@/components/Header'; // Ajustez le chemin en fonction de votre structure de dossiers
import Footer from '@/components/Footer'; // Ajustez le chemin en fonction de votre structure de dossiers
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import menu from '@/components/menu'; // Ajustez le chemin en fonction de votre structure de dossiers

const MenuSection = ({ title, items }) => (
  <div className='mb-16'>
    <h3 className='text-2xl font-bold mb-6'>{title}</h3>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {items.map((item, index) => (
        <div key={index} className='p-4 bg-white shadow-lg'>
          <div className='overflow-hidden'>
            <Image
              src={item.img}
              width={300}
              height={200}
              alt={item.title}
              className='object-cover object-center w-full h-48'
            />
          </div>
          <div className='pt-4'>
            <h3 className='font-poppins text-black mb-2 text-center'>{item.title}</h3>
            <div className='text-xl font-poppins font-semibold text-orange text-center'>{item.price}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MenuPage = () => {
  return (
    <div>
      <Header />
      <main className='container mx-auto py-12 bg-red'>
        <motion.div
          variants={fadeIn('left', 0.3)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.2 }}
          className='max-w-[570px] mx-auto text-center mb-16'
        >
          <h2 className='mb-3 mt-12'>Notre Menu</h2>
        </motion.div>
        <MenuSection title='Entrées' items={menu.entrees} />
        <MenuSection title='Plats' items={menu.plats} />
        <MenuSection title='Desserts' items={menu.desserts} />
        <MenuSection title='Boissons' items={menu.boissons} />
      </main>
      <Footer />
    </div>
  );
};

export default MenuPage;
