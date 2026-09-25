import React, { useState } from 'react';
import { StoreProvider } from './context/StoreContext';
import { AdminApp } from './components/admin/AdminApp';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { TvSizeCalculator } from './components/TvSizeCalculator';
import { HowItWorksSection } from './components/HowItWorksSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { TvDetailModal } from './components/TvDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { TvComparisonModal } from './components/TvComparisonModal';
import { WhatsAppSettingsModal } from './components/WhatsAppSettingsModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

const esRutaAdmin = window.location.pathname.replace(/\/$/, '').endsWith('/admin');

export default function App() {
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<number | null>(null);

  if (esRutaAdmin) {
    return (
      <StoreProvider>
        <AdminApp />
      </StoreProvider>
    );
  }

  const handleSelectSizeFromCalculator = (size: number) => {
    setSelectedSizeFilter(size);
  };

  const handleClearSizeFilter = () => {
    setSelectedSizeFilter(null);
  };

  return (
    <StoreProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        {/* Top Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero />

          {/* Interactive TV Size & Distance Guide */}
          <TvSizeCalculator onSelectSizeFilter={handleSelectSizeFromCalculator} />

          {/* Catalog Section with Advanced Filters and Search */}
          <CatalogSection 
            externalSizeFilter={selectedSizeFilter} 
            onClearExternalSizeFilter={handleClearSizeFilter}
          />

          {/* How It Works & Warranty Details */}
          <HowItWorksSection />

          {/* Frequently Asked Questions */}
          <FaqSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Drawers and Modals */}
        <TvDetailModal />
        <CartDrawer />
        <TvComparisonModal />
        <WhatsAppSettingsModal />
        <FloatingWhatsApp />
      </div>
    </StoreProvider>
  );
}
