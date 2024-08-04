// pages/index.jsx
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Menu from '@/components/MenuComponent';
import Reservation from '@/components/Reservation';
import About from '@/components/About';
import Footer from '@/components/Footer';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Home() {
  return (
    <main className='w-full max-w-[1440px] bg-white mx-auto overflow-hidden'>
      <Header />
      <Hero />
      <Menu />
      <Reservation />
      <About />
      <Map />
      <Footer />
    </main>
  );
}
