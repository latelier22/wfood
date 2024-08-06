// pages/index.jsx
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Reservation from '@/components/Reservation';
import Footer from '@/components/Footer';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Home() {
  return (
    <main className='w-full max-w-[1440px] bg-body mx-auto overflow-hidden'>
      <Header />
      <Hero resto={"petite-terre"} gauche={true}/>
      <Hero resto={"grande-terre"} gauche = {false}/>
      {/* <Reservation /> */}
      <Map />
      <Footer />
    </main>
  );
}
