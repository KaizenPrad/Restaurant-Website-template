import { useCallback, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import SpecialsSection from './components/SpecialsSection';
import AboutSection from './components/AboutSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import ReservationModal from './components/ReservationModal';
import AccountModal from './components/AccountModal';
import BackToTop from './components/BackToTop';

export default function App() {
  const [overlay, setOverlay] = useState(null);

  const closeOverlay = useCallback(() => setOverlay(null), []);
  const openOverlay = useCallback((name) => setOverlay(name), []);

  return (
    <div className="relative min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[140] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-[10px] focus:font-semibold focus:uppercase focus:tracking-[0.2em] focus:text-[#140D08]"
      >
        Skip to content
      </a>

      <Navbar
        onOpenSearch={() => openOverlay('search')}
        onOpenCart={() => openOverlay('cart')}
        onOpenAccount={() => openOverlay('account')}
        onReserve={() => openOverlay('reservation')}
      />

      <main id="main-content">
        <Hero onReserve={() => openOverlay('reservation')} />
        <MenuSection onViewMenu={() => openOverlay('search')} />
        <SpecialsSection onReserve={() => openOverlay('reservation')} />
        <AboutSection />
        <Testimonials />
      </main>

      <Footer />
      <BackToTop />

      <CartDrawer open={overlay === 'cart'} onClose={closeOverlay} />
      <SearchModal open={overlay === 'search'} onClose={closeOverlay} />
      <ReservationModal
        open={overlay === 'reservation'}
        onClose={closeOverlay}
      />
      <AccountModal open={overlay === 'account'} onClose={closeOverlay} />
    </div>
  );
}
