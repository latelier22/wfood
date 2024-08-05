"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import myFetchStrapi from "@/components/myFetchSTRAPI";

const ManageMenuClient = ({ initialMenus, initialLocations }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [menus, setMenus] = useState(initialMenus || { entrees: [], plats: [], desserts: [], boissons: [] });
  const [newMenu, setNewMenu] = useState({ title: '', price: '', category: 'Entrées', order: '', image: null, locations: [], EnAvant: false });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState(null);
  const [locations, setLocations] = useState(initialLocations || []);

  const { data: session, status } = useSession();
  const token = session?.jwt;

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('files', file);

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await myFetchStrapi('/api/upload', 'POST', formData, 'upload image', headers);
    return response[0].id;
  };

  const createMenu = async () => {
    setLoading(true);
    try {
      const payload = {
        data: {
          title: newMenu.title,
          price: newMenu.price,
          category: newMenu.category,
          order: newMenu.order,
          image: newMenu.image ? { id: newMenu.image } : imageId ? { id: imageId } : null,
          locations: newMenu.locations.map(id => ({ id })),
          EnAvant: newMenu.EnAvant,
        },
      };
      

      const newMenuData = await myFetchStrapi('/api/menus', 'POST', payload, 'create menu', { Authorization: `Bearer ${token}` });

      setMenus((prevMenus) => {
        const category = newMenu.category.toLowerCase();
        return {
          ...prevMenus,
          [category]: [...(prevMenus[category] || []), newMenuData.data],
        };
      });

      setNewMenu({ title: '', price: '', category: 'Entrées', order: '', image: null, locations: [] });
      setImagePreview(null);
      setImageId(null);
    } catch (error) {
      setError('Error creating menu. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const editMenu = (item) => {
    setIsEditing(true);
    setEditId(item.id);
    setNewMenu({
      title: item.attributes.title || '',
      price: item.attributes.price || '',
      category: item.attributes.category || 'Entrées',
      order: item.attributes.order || '',
      image: item.attributes.image?.data?.id || null,
      locations: item.attributes.locations?.data.map(location => location.id) || [],
      EnAvant: item.attributes.EnAvant || false,
    });
    setImagePreview(item.attributes.image?.data?.attributes?.url ? `https://admin.teranga-resto-galerie.fr${item.attributes.image.data.attributes.url}` : null);
  };


  const updateMenu = async () => {
    setLoading(true);
    try {
      const payload = {
        data: {
          title: newMenu.title,
          price: newMenu.price,
          category: newMenu.category,
          order: newMenu.order,
          image: newMenu.image ? { id: newMenu.image } : imageId ? { id: imageId } : null,
          locations: newMenu.locations.map(id => ({ id })),
          EnAvant: newMenu.EnAvant,
        },
      };
      

      const updatedMenu = await myFetchStrapi(`/api/menus/${editId}`, 'PUT', payload, 'update menu', { Authorization: `Bearer ${token}` });

      setMenus((prevMenus) => {
        const updatedMenus = { ...prevMenus };
        const category = newMenu.category.toLowerCase();
        if (updatedMenus[category]) {
          const index = updatedMenus[category].findIndex((item) => item.id === editId);
          if (index !== -1) {
            updatedMenus[category][index] = updatedMenu.data;
          }
        }
        return updatedMenus;
      });

      setNewMenu({ title: '', price: '', category: 'Entrées', order: '', image: null, locations: [] });
      setImagePreview(null);
      setImageId(null);
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      setError('Error updating menu. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (item) => {
    setShowModal(true);
    setMenuToDelete(item);
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await myFetchStrapi(`/api/menus/${menuToDelete.id}`, 'DELETE', null, 'delete menu', { Authorization: `Bearer ${token}` });
      setMenus((prevMenus) => ({
        ...prevMenus,
        [menuToDelete.attributes.category.toLowerCase()]: prevMenus[menuToDelete.attributes.category.toLowerCase()].filter((item) => item.id !== menuToDelete.id),
      }));
      setShowModal(false);
      setMenuToDelete(null);
    } catch (error) {
      setError('Error deleting menu. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMenu({ ...newMenu, [name]: value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      const id = await uploadImage(file);
      setImageId(id);
    }
  };

  const handleLocationChange = (e) => {
    const { options } = e.target;
    const selectedLocations = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedLocations.push(options[i].value);
      }
    }
    setNewMenu({ ...newMenu, locations: selectedLocations });
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('menuForm');
    const yOffset = -50; // Déplacement de 50 pixels vers le haut
    const y = formElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-center mb-4">Gérer le menu</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4" id="menuForm">
        <input
          type="checkbox"
          name="EnAvant"
          checked={newMenu.EnAvant}
          onChange={(e) => setNewMenu({ ...newMenu, EnAvant: e.target.checked })}
          className="border p-2 mb-2"
        />Suggestion

        <input
          type="text"
          name="title"
          placeholder="Titre"
          value={newMenu.title}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="price"
          placeholder="Prix"
          value={newMenu.price}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="order"
          placeholder="Order"
          value={newMenu.order}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
        />
        <select name="category" value={newMenu.category} onChange={handleInputChange} className="border p-2 mb-2 w-full">
          <option value="Entrées">Entrées</option>
          <option value="Plats">Plats</option>
          <option value="Desserts">Desserts</option>
          <option value="Boissons">Boissons</option>
        </select>
        <select multiple={true} value={newMenu.locations} onChange={handleLocationChange} className="border p-2 mb-2 w-full">
          {locations.length > 0 ? (
            locations.map(location => (
              <option key={location.id} value={location.id}>{location.attributes.name}</option>
            ))
          ) : (
            <option disabled>No locations available</option>
          )}
        </select>
        <input type="file" onChange={handleImageChange} className="border p-2 mb-2 w-full" />
        <button
          onClick={isEditing ? updateMenu : createMenu}
          className={`bg-${isEditing ? 'yellow' : 'blue'}-500 text-black px-4 py-2 rounded`}
          disabled={loading}
        >
          {isEditing ? 'Modifier' : 'Ajouter'}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <h3 className="text-2xl font-bold mb-6">Aperçu</h3>
        <div className="p-4 bg-white shadow-lg">
          <div className="overflow-hidden">
            {imagePreview ? (
              <Image
                src={imagePreview}
                width={300}
                height={200}
                alt="Aperçu de l'image"
                className="object-cover object-center w-full h-48"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-48 bg-gray-200">
                <span className="text-gray-500">Aperçu de l'image</span>
              </div>
            )}
          </div>
          <div className="pt-4">
            <h3 className="font-poppins text-black mb-2 text-center">{newMenu.title}</h3>
            <div className="text-xl font-poppins font-semibold text-orange text-center">{newMenu.price}€</div>
            <div className="text-center">{newMenu.category}</div>
          </div>
        </div>
      </div>
      {menus && Object.keys(menus).length > 0 ? (
        Object.keys(menus).map((category) => (
          <div key={category} className="mb-16">
            <h3 className="text-2xl font-bold mb-6">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menus[category]
                .sort((a, b) => (a.attributes.order ?? a.id) - (b.attributes.order ?? b.id))
                .map((item) => {
                  const imageUrl = item.attributes.image?.data?.attributes?.url;
                  return (
                    <div key={item.id} className={`p-4 bg-white shadow-lg ${item.attributes.EnAvant ? 'border-2 border-orange-500' : ''}`}>

                      <div className="overflow-hidden">
                        {imageUrl ? (
                          <Image
                            src={`https://admin.teranga-resto-galerie.fr${imageUrl}`}
                            width={300}
                            height={200}
                            alt={item.attributes.title}
                            className="object-cover object-center w-full h-48"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-48 bg-gray-200">
                            <span className="text-gray-500">{item.attributes.title}</span>
                          </div>
                        )}
                      </div>
                      <div className="pt-4 text-black">
                        <div className="flex justify-between">
                          <div className="text-sm text-gray-500">{item.attributes.locations?.data?.length ? item.attributes.locations.data.map(loc => loc.attributes.name).join(', ') : 'Non disponible'}</div>
                          <div className="text-sm text-gray-500">Order: {item.attributes.order ?? 'N/A'}</div>
                        </div>
                        <input
                          type="text"
                          value={item.attributes.title ?? ''}
                          onChange={(e) => {
                            const updatedItem = { ...item, attributes: { ...item.attributes, title: e.target.value } };
                            setMenus((prevMenus) => {
                              const updatedMenus = { ...prevMenus };
                              updatedMenus[category] = updatedMenus[category].map((i) => (i.id === item.id ? updatedItem : i));
                              return updatedMenus;
                            });
                          }}
                          className="font-poppins text-black mb-2 text-center"
                        />
                        <input
                          type="text"
                          value={item.attributes.price ?? ''}
                          onChange={(e) => {
                            const updatedItem = { ...item, attributes: { ...item.attributes, price: e.target.value } };
                            setMenus((prevMenus) => {
                              const updatedMenus = { ...prevMenus };
                              updatedMenus[category] = updatedMenus[category].map((i) => (i.id === item.id ? updatedItem : i));
                              return updatedMenus;
                            });
                          }}
                          className="text-xl font-poppins font-semibold text-orange text-center"
                        />
                        <div className="flex justify-between mt-2">
                          <button
                            onClick={() => {
                              editMenu(item);
                              scrollToForm();
                            }}
                            className="bg-yellow-500 text-black px-4 py-2 mr-2"
                          >
                            Editer
                          </button>
                          <button onClick={() => handleDelete(item)} className="bg-red-500 text-black px-4 py-2">
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))
      ) : (
        <div>No menus available</div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl mb-4">Confirmer la suppression</h2>
            <div className="flex items-center mb-4">
              {menuToDelete?.attributes?.image?.data?.attributes?.url && (
                <Image
                  src={`https://admin.teranga-resto-galerie.fr${menuToDelete.attributes.image.data.attributes.url}`}
                  width={100}
                  height={100}
                  alt={menuToDelete.attributes.title}
                  className="object-cover object-center mr-4"
                />
              )}
              <p>{menuToDelete?.attributes?.title}</p>
            </div>
            <button
              onClick={confirmDelete}
              className="bg-red-500 text-black px-4 py-2 rounded mr-2"
            >
              Supprimer
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-500 text-black px-4 py-2 rounded"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMenuClient;
