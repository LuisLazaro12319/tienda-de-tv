import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Tv, 
  ArrowDown, 
  ChevronLeft, 
  ChevronRight, 
  Flame,
  Gift
} from 'lucide-react';
import { heroImage } from '../data/tvs';
import oledImage from '../assets/images/tv_oled_evo_display_1790262645463.jpg';
import qledImage from '../assets/images/tv_qled_gaming_setup_1790262655355.jpg';
import miniLedImage from '../assets/images/tv_mini_led_cinema_1790262665687.jpg';
import { useStore } from '../context/StoreContext';
import { buildSupportWhatsAppUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Hero: React.FC = () => {
  const { whatsappPhone } = useStore();

  const slides = [
    {
      id: 'tiktok-special',
      image: heroImage,
      isTikTok: true,
      badge: 'Precios Únicos en TikTok',
      badgeColor: 'bg-rose-500 text-white',
      title: 'Precios Únicos en TikTok',
      subtitle: 'Mira nuestros videos y demostraciones de televisores en vivo con ofertas especiales.',
      priceTag: 'Canal Oficial TikTok',
      oldPrice: '',
      currentPrice: '@NexusTV',
      tiktokUrl: 'https://www.tiktok.com'
    },
    {
      id: 'lg-c4-oled',
      image: oledImage,
      isTikTok: false,
      badge: 'Destacado de la Semana · LG',
      badgeColor: 'bg-emerald-400 text-slate-950',
      title: 'LG OLED evo C4 65" 4K 144Hz',
      subtitle: 'Negros absolutos, contraste infinito y 4 puertos HDMI 2.1 para PS5 & PC Gaming.',
      priceTag: 'Entrega Hoy en Bolivia',
      oldPrice: 'Bs 14.500',
      currentPrice: 'Bs 11.990',
      whatsappNote: 'Hola NexusTV, deseo comprar el LG OLED evo C4 65" en oferta de Bs 11.990.'
    },
    {
      id: 'samsung-qn90d',
      image: qledImage,
      isTikTok: false,
      badge: 'Gaming Pro · Samsung',
      badgeColor: 'bg-cyan-400 text-slate-950',
      title: 'Samsung Neo QLED 65" QN90D',
      subtitle: 'Quantum Mini-LED de 2000 nits con panel antirreflejo perfecto para salas luminosas.',
      priceTag: 'Garantía Oficial 2 años',
      oldPrice: 'Bs 13.200',
      currentPrice: 'Bs 10.890',
      whatsappNote: 'Hola NexusTV, me interesa el Samsung Neo QLED 65" QN90D de Bs 10.890.'
    },
    {
      id: 'tcl-qm8-cinema',
      image: miniLedImage,
      isTikTok: false,
      badge: 'Cine en Casa · 75 Pulgadas',
      badgeColor: 'bg-amber-400 text-slate-950',
      title: 'TCL QM8 Pro 75" Flagship Mini-LED',
      subtitle: '5000 nits de pico de brillo y sistema de sonido integrado Onkyo 2.1.2 con subwoofer.',
      priceTag: 'Despacho Nacional Asegurado',
      oldPrice: 'Bs 12.800',
      currentPrice: 'Bs 10.490',
      whatsappNote: 'Hola NexusTV, consulto stock del TCL QM8 Pro 75" Mini-LED de Bs 10.490.'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel every 5 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 md:py-20">
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Ambient Tagline */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart TVs en Bolivia · Envíos Express a Santa Cruz, La Paz, Cbba & Nacional</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-display">
              El televisor perfecto para tu sala, gaming o cine en casa en Bolivia.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Catálogo con los mejores Smart TVs OLED, Neo QLED y Mini-LED de LG, Samsung, Sony y TCL con garantía de marca.
              Consulta stock en almacén y <strong className="text-white font-medium">concreta tu compra por WhatsApp</strong> con entrega en el día o despacho nacional asegurado.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#catalogo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-950/40"
              >
                <span>Ver Catálogo con Filtros</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>

            {/* Adjacent Trust Elements */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Garantía Oficial de Marca</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Envío Inmediato Asegurado</span>
              </div>
              <div className="flex items-center gap-2">
                <Tv className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Nuevos y Sellados</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset Carousel */}
          <div 
            className="lg:col-span-6 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-900 shadow-2xl shadow-black/80 group">
              {/* Carousel Image with Smooth Transition */}
              <div className="relative h-[360px] sm:h-[420px] w-full overflow-hidden bg-slate-950">
                <img
                  key={active.id}
                  src={active.image}
                  alt={active.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-700 animate-in fade-in zoom-in-95"
                />
                
                {/* Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />

                {/* Top Badge: Highlight TikTok or Tech */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className={`px-3 py-1 text-xs font-bold rounded-md tracking-wider flex items-center gap-1.5 shadow-md ${active.badgeColor}`}>
                    {active.isTikTok ? (
                      <>
                        <Flame className="w-3.5 h-3.5 fill-current" />
                        <span>PRECIOS ÚNICOS EN TIKTOK</span>
                      </>
                    ) : (
                      <span>{active.badge}</span>
                    )}
                  </span>
                </div>

                {/* Left / Right Carousel Navigation Chevrons */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white border border-slate-800 backdrop-blur-sm transition-all opacity-80 hover:opacity-100"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white border border-slate-800 backdrop-blur-sm transition-all opacity-80 hover:opacity-100"
                  aria-label="Foto siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Overlay Callout Box at bottom */}
                <div className="absolute bottom-4 left-4 right-4 z-10 p-4 sm:p-5 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-800/90 shadow-xl space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      {active.isTikTok ? (
                        <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wide">
                          <Gift className="w-3.5 h-3.5" />
                          <span>Oferta Especial de la Comunidad TikTok</span>
                        </div>
                      ) : (
                        <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                          {active.priceTag}
                        </p>
                      )}
                      <h2 className="text-base sm:text-lg font-bold text-white line-clamp-1 font-display">
                        {active.title}
                      </h2>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {active.subtitle}
                      </p>
                    </div>

                    <div className="sm:text-right shrink-0">
                      {active.oldPrice && (
                        <span className="text-xs line-through text-slate-500 block font-mono">
                          {active.oldPrice}
                        </span>
                      )}
                      <span className="text-lg sm:text-xl font-extrabold text-emerald-400 font-mono tabular-nums">
                        {active.currentPrice}
                      </span>
                    </div>
                  </div>

                  {/* Direct Action inside the Slide */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3">
                    {active.isTikTok ? (
                      <a
                        href={active.tiktokUrl || 'https://www.tiktok.com'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg transition-colors shadow-sm bg-black hover:bg-slate-950 text-white border border-rose-500/40"
                      >
                        <svg className="w-4 h-4 fill-current text-rose-400" viewBox="0 0 24 24">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                        </svg>
                        <span>Entrar a TikTok</span>
                      </a>
                    ) : (
                      <a
                        href={buildSupportWhatsAppUrl(whatsappPhone, active.whatsappNote)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg transition-colors shadow-sm bg-emerald-400 hover:bg-emerald-300 text-slate-950"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Comprar por WhatsApp</span>
                      </a>
                    )}

                    <a
                      href="#catalogo"
                      className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-950 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap"
                    >
                      Ver Catálogo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Indicators / Dots below the frame */}
            <div className="flex items-center justify-center gap-2 mt-3">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? slide.isTikTok 
                        ? 'w-8 bg-rose-500' 
                        : 'w-8 bg-emerald-400'
                      : 'w-2 bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Ir a diapositiva ${index + 1}`}
                  title={slide.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

