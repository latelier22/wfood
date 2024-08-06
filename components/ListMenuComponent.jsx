'use client';
import React from 'react';

const ListMenuComponent = ({ menu }) => {
  return (
    <div>
      {Object.keys(menu).map(category => (
        <div key={category} className='mb-6 p-4 border border-gray-300 rounded-lg'>
          <h3 className='text-xl font-semibold mb-2'>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <ul>
            {menu[category].map(item => (
              <li key={item.id} className='flex justify-between border-b border-gray-200 py-2'>
                <span>{item.attributes.title}</span>
                <span>{item.attributes.price}€</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ListMenuComponent;
