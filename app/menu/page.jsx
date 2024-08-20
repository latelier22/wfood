'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import Suggestions from '@/components/Suggestions';
import myFetch from '@/components/myFetchSTRAPI';

const fetchMenu = async () => {

const resto = process.env.RESTO;


  const res = await myFetch('/api/menus?populate=*&pagination[page]=1&pagination[pageSize]=100', 'GET', null, 'get Menus 100 par page');
  // const res = await fetch('https://admin.teranga-resto-galerie.fr/api/menus?populate=*');
  
  console.log(res.data[0])
  return res.data;
};

const MenuSection = ({ title, items, hoveredItemId, setHoveredItemId }) => (
  <div className='mb-16 flex'>
    <div className='w-2/3'>
      <h3 className='text-2xl font-bold mb-6'>{title}</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {items
          .filter(item => item.attributes.image && item.attributes.image.data)
          .sort((a, b) => (a.attributes.order ?? Infinity) - (b.attributes.order ?? Infinity))
          .map(item => {
            const imageUrl = item.attributes.image.data.attributes.formats?.medium?.url || item.attributes.image.data.attributes.url;
            const isHovered = hoveredItemId === item.id;
            return (
              <div
                key={item.id}
                className={`p-4 bg-white shadow-lg transition-transform duration-300 ${isHovered ? 'transform scale-105' : ''}`}
                style={{ height: '400px' }}
              >
                <div className='overflow-hidden h-48'>
                  <Image
                    src={`https://admin.teranga-resto-galerie.fr${imageUrl}`}
                    width={300}
                    height={200}
                    alt={item.attributes.title}
                    className='object-cover object-center w-full h-full'
                  />
                </div>
                <div className='pt-4 flex flex-col justify-center'>
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
    <div className='w-1/3 flex flex-col'>
      <h3 className='text-2xl font-bold mb-6'>{title} - Liste</h3>
      <div className='bg-white p-4 shadow-lg rounded-lg flex-1'>
        <ul>
          {items.sort((a, b) => (a.attributes.order ?? Infinity) - (b.attributes.order ?? Infinity))
          .map(item => (
            <li
              key={item.id}
              className='flex justify-between border-b border-gray-200 py-2 cursor-pointer'
              onMouseEnter={() => setHoveredItemId(item.id)}
              onMouseLeave={() => setHoveredItemId(null)}
            >
              <span>{item.attributes.title}</span>
              <span>{item.attributes.price}€</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const MenuPage = () => {
  const [menu, setMenu] = useState({ entrees: [], plats: [], desserts: [], boissons: [] });
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [suggestions, setSuggestions] = useState({ entrees: [], plats: [], desserts: [], boissons: [] });

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

      const categorizedSuggestions = {
        entrees: categorizedMenu.entrees.filter(item => item.attributes.EnAvant),
        plats: categorizedMenu.plats.filter(item => item.attributes.EnAvant),
        desserts: categorizedMenu.desserts.filter(item => item.attributes.EnAvant),
        boissons: categorizedMenu.boissons.filter(item => item.attributes.EnAvant),
      };
      setSuggestions(categorizedSuggestions);
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
        <Suggestions categories={suggestions} />
        <MenuSection title='Entrées' items={menu.entrees} hoveredItemId={hoveredItemId} setHoveredItemId={setHoveredItemId} />
        <MenuSection title='Plats' items={menu.plats} hoveredItemId={hoveredItemId} setHoveredItemId={setHoveredItemId} />
        <MenuSection title='Desserts' items={menu.desserts} hoveredItemId={hoveredItemId} setHoveredItemId={setHoveredItemId} />
        <MenuSection title='Boissons' items={menu.boissons} hoveredItemId={hoveredItemId} setHoveredItemId={setHoveredItemId} />
      </main>
      <Footer />
    </div>
  );
};

export default MenuPage;
