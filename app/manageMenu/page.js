'use client';
import React, { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const fetchMenus = async (token) => {
  const res = await fetch('https://admin.teranga-resto-galerie.fr/api/menus?populate=*', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data.data;
};

const createMenu = async (menu, token) => {
  const res = await fetch('https://admin.teranga-resto-galerie.fr/api/menus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data: menu }),
  });
  return res.json();
};

const updateMenu = async (id, menu, token) => {
  const res = await fetch(`https://admin.teranga-resto-galerie.fr/api/menus/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data: menu }),
  });
  return res.json();
};

const deleteMenu = async (id, token) => {
  const res = await fetch(`https://admin.teranga-resto-galerie.fr/api/menus/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

const MenuSection = ({ title, items, token, refreshMenus }) => {
  const [newMenu, setNewMenu] = useState({ title: '', price: '', category: title });

  const handleCreate = async () => {
    await createMenu(newMenu, token);
    setNewMenu({ title: '', price: '', category: title });
    refreshMenus();
  };

  const handleUpdate = async (id, menu) => {
    await updateMenu(id, menu, token);
    refreshMenus();
  };

  const handleDelete = async (id) => {
    await deleteMenu(id, token);
    refreshMenus();
  };

  return (
    <div className='mb-16'>
      <h3 className='text-2xl font-bold mb-6'>{title}</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {items.map((item) => (
          <div key={item.id} className='p-4 bg-white shadow-lg'>
            <div className='overflow-hidden'>
              <Image
                src={`https://admin.teranga-resto-galerie.fr${item.attributes.image.data.attributes.url}`}
                width={300}
                height={200}
                alt={item.attributes.title}
                className='object-cover object-center w-full h-48'
              />
            </div>
            <div className='pt-4'>
              <input
                type='text'
                value={item.attributes.title}
                onChange={(e) => handleUpdate(item.id, { ...item.attributes, title: e.target.value })}
                className='font-poppins text-black mb-2 text-center'
              />
              <input
                type='text'
                value={item.attributes.price}
                onChange={(e) => handleUpdate(item.id, { ...item.attributes, price: e.target.value })}
                className='text-xl font-poppins font-semibold text-orange text-center'
              />
              <button onClick={() => handleDelete(item.id)} className='mt-2 bg-red-500 text-black px-4 py-2'>
                Supprimer
              </button>
            </div>
          </div>
        ))}
        <div className='p-4 bg-white shadow-lg'>
          <div className='pt-4'>
            <input
              type='text'
              placeholder='Titre'
              value={newMenu.title}
              onChange={(e) => setNewMenu({ ...newMenu, title: e.target.value })}
              className='font-poppins text-black mb-2 text-center'
            />
            <input
              type='text'
              placeholder='Prix'
              value={newMenu.price}
              onChange={(e) => setNewMenu({ ...newMenu, price: e.target.value })}
              className='text-xl font-poppins font-semibold text-orange text-center'
            />
            <button onClick={handleCreate} className='mt-2 bg-green text-black px-4 py-2'>
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ManageMenu = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [menus, setMenus] = useState({ entrees: [], plats: [], desserts: [], boissons: [] });

  const refreshMenus = async () => {
    const token = session?.user?.token;
    const menuData = await fetchMenus(token);
    const categorizedMenu = {
      entrees: menuData.filter((item) => item.attributes.category === 'Entrées'),
      plats: menuData.filter((item) => item.attributes.category === 'Plats'),
      desserts: menuData.filter((item) => item.attributes.category === 'Desserts'),
      boissons: menuData.filter((item) => item.attributes.category === 'Boissons'),
    };
    setMenus(categorizedMenu);
  };

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/login');
    } else {
      refreshMenus();
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mx-auto py-12'>
      <h1 className='text-3xl font-bold mb-6'>Gérer le menu</h1>
      <MenuSection title='Entrées' items={menus.entrees} token={session?.user?.token} refreshMenus={refreshMenus} />
      <MenuSection title='Plats' items={menus.plats} token={session?.user?.token} refreshMenus={refreshMenus} />
      <MenuSection title='Desserts' items={menus.desserts} token={session?.user?.token} refreshMenus={refreshMenus} />
      <MenuSection title='Boissons' items={menus.boissons} token={session?.user?.token} refreshMenus={refreshMenus} />
    </div>
  );
};

export default ManageMenu;
