import React, { useState } from 'react';
import { MessageCircle, ShoppingBag, SlidersHorizontal, Scale, PhoneCall, Menu, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { buildSupportWhatsAppUrl } from '../utils/whatsapp';

export const Navbar: React.FC = () => {
  const {
    cartTotalCount,
    setIsCartOpen,
    comparisonTvs,
    setIsComparisonOpen,
    whatsappPhone,
    setIsPhoneSettingsOpen
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Single text element wordmark (Display face) */}
          <a
            href="#"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-90 font-display"
          >
            <span className="text-emerald-400">Nexus</span>
            <span>TV</span>
            <span className="text-xs font-mono font-normal text-slate-400 tracking-normal ml-1 border-l border-slate-800 pl-2 hidden sm:inline">
              Smart TV Bolivia
            </span>
          </a>

          {/* Zone 2: Clean 4-6 nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#catalogo" className="hover:text-emerald-400 transition-colors">
              Catálogo
            </a>
            <a href="#calculador" className="hover:text-emerald-400 transition-colors">
              Calculador de Distancia
            </a>
            <a href="#como-comprar" className="hover:text-emerald-400 transition-colors">
              Cómo Comprar
            </a>
            <a href="#garantia" className="hover:text-emerald-400 transition-colors">
              Garantía & Envíos
            </a>
            <a href="#preguntas" className="hover:text-emerald-400 transition-colors">
              Preguntas Frecuentes
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Compare Counter if active */}
            {comparisonTvs.length > 0 && (
              <button
                onClick={() => setIsComparisonOpen(true)}
                className="relative hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700 rounded-lg hover:border-slate-500 transition-colors"
                title="Comparar televisores seleccionados"
              >
                <Scale className="w-3.5 h-3.5 text-emerald-400" />
                <span>Comparar ({comparisonTvs.length})</span>
              </button>
            )}

            {/* Cart / Cotización Drawer Opener */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex items-center justify-center p-2 text-slate-200 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 hover:text-white transition-colors"
              aria-label="Abrir pedido o cotización"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartTotalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-bold text-slate-950 tabular-nums">
                  {cartTotalCount}
                </span>
              )}
            </button>

            {/* Store Phone Settings Button (for testing or customizing store WhatsApp) */}
            <button
              onClick={() => setIsPhoneSettingsOpen(true)}
              className="hidden lg:inline-flex p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-900 transition-colors"
              title="Configurar número de WhatsApp de ventas"
            >
              <PhoneCall className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-900"
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 py-4 space-y-3">
            <a
              href="#catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-200 hover:text-emerald-400 py-1"
            >
              Catálogo de Televisores
            </a>
            <a
              href="#calculador"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-200 hover:text-emerald-400 py-1"
            >
              Calculador de Distancia & Tamaño
            </a>
            <a
              href="#como-comprar"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-200 hover:text-emerald-400 py-1"
            >
              Cómo Comprar por WhatsApp
            </a>
            <a
              href="#garantia"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-200 hover:text-emerald-400 py-1"
            >
              Garantía Oficial & Envíos
            </a>
            <a
              href="#preguntas"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-200 hover:text-emerald-400 py-1"
            >
              Preguntas Frecuentes
            </a>

            {comparisonTvs.length > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsComparisonOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700 rounded-lg"
              >
                <Scale className="w-4 h-4 text-emerald-400" />
                Comparar ({comparisonTvs.length}) Televisores
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsPhoneSettingsOpen(true);
              }}
              className="w-full text-left text-xs text-slate-400 hover:text-slate-300 py-1"
            >
              Cambiar número WhatsApp ({whatsappPhone})
            </button>
          </div>
        )}
      </header>
    </>
  );
};
