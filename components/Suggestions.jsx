'use client';

import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Suggestions = ({ categories }) => (
  <div className='mb-16'>
    <h3 className='text-2xl font-bold mb-6 text-center'>Suggestions</h3>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
      {Object.keys(categories).map((category) => {
        const items = categories[category];
        const sliderSettings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true,
        };

        return (
          <div key={category} className='p-4 bg-white shadow-lg h-full'>
            <h4 className='text-xl font-semibold mb-4 text-center pb-8'>{category}</h4>
            {items.length > 1 ? (
              <Slider {...sliderSettings}>
                {items.map(item => {
                  const imageUrl = item.attributes.image.data.attributes.formats?.medium?.url || item.attributes.image.data.attributes.url;
                  return (
                    <div key={item.id} className='p-2'>
                      <div className='overflow-hidden h-48'>
                  <Image
                    src={`https://admin.teranga-resto-galerie.fr${imageUrl}`}
                    width={300}
                    height={200}
                    alt={item.attributes.title}
                    className='object-cover object-center w-full h-full'
                  />
                </div>
                      <div className='pt-4 -mb-4 flex flex-col justify-center' style={{ minHeight: '100px' }}>
                        <h3 className='font-poppins text-black mb-2 text-center'>{item.attributes.title}</h3>
                        <div className='text-xl font-poppins font-semibold text-orange text-center '>{item.attributes.price}€</div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            ) : (
              items.map(item => {
                const imageUrl = item.attributes.image.data.attributes.formats?.medium?.url || item.attributes.image.data.attributes.url;
                return (
                  <div key={item.id} className='p-4'>
                    <div className='overflow-hidden h-48'>
                  <Image
                    src={`https://admin.teranga-resto-galerie.fr${imageUrl}`}
                    width={300}
                    height={200}
                    alt={item.attributes.title}
                    className='object-cover object-center w-full h-full'
                  />
                </div>
                    <div className='pt-4 flex flex-col justify-center' style={{ minHeight: '160px' }}>
                      <h3 className='font-poppins text-black mb-2 text-center'>{item.attributes.title}</h3>
                      <div className='text-xl font-poppins font-semibold text-orange text-center'>{item.attributes.price}€</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default Suggestions;
