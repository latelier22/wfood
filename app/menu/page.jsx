'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';

const fetchMenu = async () => {
  const res = await fetch('https://admin.teranga-resto-galerie.fr/api/menus?populate=*');
  const data = await res.json();
  return data.data;
};

const MenuSection = ({ title, items }) => (
  <div className='mb-16'>
    <h3 className='text-2xl font-bold mb-6'>{title}</h3>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {items.map((item, index) => {
        const imageUrl = item.attributes.image.data.attributes.formats?.medium?.url || item.attributes.image.data.attributes.url;
        return (
          <div key={index} className='p-4 bg-white shadow-lg' style={{ height: '400px', width: '300px' }}>
            <div className='overflow-hidden h-2/3'>
              <Image
                src={`https://admin.teranga-resto-galerie.fr${imageUrl}`}
                width={300}
                height={200}
                alt={item.attributes.title}
                className='object-cover object-center w-full h-full'
                style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }}
              />
            </div>
            <div className='pt-4 h-1/3 flex flex-col justify-center'>
              <Link href='/'>
                <h3 className='font-poppins text-black mb-2 text-center'>{item.attributes.title}</h3>
              </Link>
              <div className='text-xl font-poppins font-semibold text-orange text-center'>{item.attributes.price}€</div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const MenuPage = () => {
  const [menu, setMenu] = useState({ entrees: [], plats: [], desserts: [], boissons: [] });

  useEffect(() => {
    const fetchData = async () => {
      const menuData = await fetchMenu();
      const categorizedMenu = {
        entrees: menuData.filter(item => item.attributes.category === 'Entrées'),
        plats: menuData.filter(item => item.attributes.category === 'Plats'),
        desserts: menuData.filter(item => item.attributes.category === 'Desserts'),
        boissons: menuData.filter(item => item.attributes.category === 'Boissons'),
      };
      setMenu(categorizedMenu);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <main className='container mx-auto py-12'>
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
