import { getSession } from 'next-auth/react';
import ManageMenuClient from './ManageMenuClient';
import myFetchStrapi from "@/components/myFetchSTRAPI";
import Header from '@/components/Header';
import Footer from '@/components/Footer'

export const fetchMenusServer = async (token) => {
  try {
    const data = await myFetchStrapi('/api/menus?populate=*&pagination[page]=1&pagination[pageSize]=100', 'GET', null, 'fetch menus');
    const categorizedMenu = {
      entrees: data.data.filter(item => item.attributes.category === 'Entrées'),
      plats: data.data.filter(item => item.attributes.category === 'Plats'),
      desserts: data.data.filter(item => item.attributes.category === 'Desserts'),
      boissons: data.data.filter(item => item.attributes.category === 'Boissons'),
    };
    return categorizedMenu;
  } catch (error) {
    console.error('Error fetching menus:', error);
    return { entrees: [], plats: [], desserts: [], boissons: [] };
  }
};


async function ManageMenuPage({ req }) {
  const session = await getSession({ req });
  const token = session?.jwt;
  
  const [initialMenus, locations] = await Promise.all([
    fetchMenusServer(token)
  ]);

  return (
    <>
    <Header />
    <ManageMenuClient initialMenus={initialMenus}/>
    <Footer/>
    </>
  );
}

export default ManageMenuPage;
