'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import myFetchStrapi from '@/components/myFetchSTRAPI';

const ImportMenus = () => {
  const [file, setFile] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { data: session } = useSession();
  const token = session?.jwt;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleFileRead = (e) => {
    const content = e.target.result;
    try {
      const parsedMenus = JSON.parse(content);
      setMenus(parsedMenus.data);
    } catch (error) {
      setError('Invalid JSON file');
    }
  };

  const handleUpload = () => {
    const reader = new FileReader();
    reader.onload = handleFileRead;
    reader.readAsText(file);
  };

  const importMenus = async () => {
    setLoading(true);
    try {
      for (const category of menus) {
        for (const item of category.items) {
          const payload = {
            data: {
              title: item.name,
              price: item.price,
              category: category.category,
              order: item.order ?? 0,
             
              EnAvant: item.EnAvant ?? false,
              petiteTerre: item.petiteTerre ?? false,
              grandeTerre: item.grandeTerre ?? false,
            },
          };
          await myFetchStrapi('/api/menus', 'POST', payload, 'create menu', { Authorization: `Bearer ${token}` });
        }
      }
      setError(null);
      alert('Menus imported successfully');
    } catch (error) {
      setError('Error importing menus. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-center mb-4">Importer les menus</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <input type="file" onChange={handleFileChange} className="border p-2 mb-2 w-full" />
        <button onClick={handleUpload} className="bg-blue-500 text-black px-4 py-2 rounded mb-4">
          Charger le fichier
        </button>
      </div>
      {menus.length > 0 && (
        <div>
          <h2 className="text-xl mb-4">Menus à importer</h2>
          {menus.map((category, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-2xl font-bold mb-4">{category.category}</h3>
              {category.items.map((item, idx) => (
                <div key={idx} className="p-4 bg-white shadow-lg mb-4">
                  <h4 className="font-poppins text-black mb-2">{item.name}</h4>
                  <div className="text-xl font-poppins font-semibold text-orange">{item.price}€</div>
                  <div className="text-gray-500">Order: {item.order ?? 'N/A'}</div>
                  <div className="text-gray-500">Petite-Terre: {item.petiteTerre ? 'Oui' : 'Non'}</div>
                  <div className="text-gray-500">Grande-Terre: {item.grandeTerre ? 'Oui' : 'Non'}</div>
                </div>
              ))}
            </div>
          ))}
          <button onClick={importMenus} className="bg-green-500 text-black px-4 py-2 rounded">
            Importer
          </button>
        </div>
      )}
    </div>
  );
};

export default ImportMenus;
