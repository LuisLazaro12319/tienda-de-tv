import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Tv, 
  ArrowDown, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import oledImage from '../assets/images/tv_oled_evo_display_1790262645463.jpg';
import qledImage from '../assets/images/tv_qled_gaming_setup_1790262655355.jpg';
import miniLedImage from '../assets/images/tv_mini_led_cinema_1790262665687.jpg';
import { useStore } from '../context/StoreContext';
import { buildDirectWhatsAppUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';
import { STORE_NAME } from '../data/tvs';

export const Hero: React.FC = () => {
  const { whatsappPhone } = useStore();

  const slides = [
    {
      id: 'lg-c4-oled',
      image: oledImage,
      badge: 'Destacado de la Semana · LG',
      badgeColor: 'bg-blue-600 text-white',
      title: 'LG OLED evo C4 65" 4K 144Hz',
      subtitle: 'Negros absolutos, contraste infinito y 4 puertos HDMI 2.1 para PS5 & PC Gaming.',
      priceTag: 'Entrega Hoy en Bolivia',
      oldPrice: 'Bs 14.500',
      currentPrice: 'Bs 11.990',
      whatsappNote: `Hola ${STORE_NAME}, deseo comprar el LG OLED evo C4 65" en oferta de Bs 11.990.`
    },
    {
      id: 'samsung-qn90d',
      image: qledImage,
      badge: 'Gaming Pro · Samsung',
      badgeColor: 'bg-blue-600 text-white',
      title: 'Samsung Neo QLED 65" QN90D',
      subtitle: 'Quantum Mini-LED de 2000 nits con panel antirreflejo perfecto para salas luminosas.',
      priceTag: 'Garantía Oficial 2 años',
      oldPrice: 'Bs 13.200',
      currentPrice: 'Bs 10.890',
      whatsappNote: `Hola ${STORE_NAME}, me interesa el Samsung Neo QLED 65" QN90D de Bs 10.890.`
    },
    {
      id: 'tcl-qm8-cinema',
      image: miniLedImage,
      badge: 'Cine en Casa · 75 Pulgadas',
      badgeColor: 'bg-amber-400 text-slate-900',
      title: 'TCL QM8 Pro 75" Flagship Mini-LED',
      subtitle: '5000 nits de pico de brillo y sistema de sonido integrado Onkyo 2.1.2 con subwoofer.',
      priceTag: 'Despacho Nacional Asegurado',
      oldPrice: 'Bs 12.800',
      currentPrice: 'Bs 10.490',
      whatsappNote: `Hola ${STORE_NAME}, consulto stock del TCL QM8 Pro 75" Mini-LED de Bs 10.490.`
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

  const trustItems = [
    { icon: ShieldCheck, label: 'Garantía Oficial de Marca' },
    { icon: Truck, label: 'Envío Inmediato Asegurado' },
    { icon: Tv, label: '100% Nuevos y Sellados' },
  ];

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white via-blue-50 to-white py-12 md:py-20">
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Ambient Tagline */}
            <div className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart TVs en Bolivia · Envíos Express a Santa Cruz, La Paz, Cbba & Nacional</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight font-display">
              Smart TVs premium para tu sala, tu setup gamer o tu cine en casa.
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl">
              Catálogo con los mejores Smart TVs OLED, Neo QLED y Mini-LED de LG, Samsung, Sony y TCL con garantía de marca.
              Consulta stock en almacén y <strong className="text-slate-900 font-medium">concreta tu compra por WhatsApp</strong> con entrega en el día o despacho nacional asegurado.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#catalogo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30"
              >
                <span>Ver Catálogo</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>

            {/* Adjacent Trust Elements: rotating ticker */}
            <div className="pt-6 border-t border-slate-200/80 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex w-max items-center gap-10 animate-marquee">
                {[...trustItems, ...trustItems].map(({ icon: Icon, label }, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-slate-500 shrink-0 whitespace-nowrap">
                    <Icon className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset Carousel */}
          <div 
            className="lg:col-span-6 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-50 shadow-2xl shadow-slate-900/15 group">
              {/* Carousel Image with Smooth Transition */}
              <div className="relative h-[360px] sm:h-[420px] w-full overflow-hidden bg-white">
                <img
                  key={active.id}
                  src={active.image}
                  alt={active.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-700 animate-in fade-in zoom-in-95"
                />
                
                {/* Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className={`px-3 py-1 text-xs font-bold rounded-md tracking-wider flex items-center gap-1.5 shadow-md ${active.badgeColor}`}>
                    <span>{active.badge}</span>
                  </span>
                </div>

                {/* Left / Right Carousel Navigation Chevrons */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/70 hover:bg-slate-50 text-slate-900 border border-slate-200 backdrop-blur-sm transition-all opacity-80 hover:opacity-100"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/70 hover:bg-slate-50 text-slate-900 border border-slate-200 backdrop-blur-sm transition-all opacity-80 hover:opacity-100"
                  aria-label="Foto siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Overlay Callout Box at bottom */}
                <div className="absolute bottom-4 left-4 right-4 z-10 p-3 sm:p-5 rounded-xl bg-transparent space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-sky-300 uppercase tracking-wider">
                        {active.priceTag}
                      </p>
                      <h2 className="text-base sm:text-lg font-bold text-white line-clamp-1 font-display">
                        {active.title}
                      </h2>
                      <p className="hidden text-xs text-slate-700 line-clamp-2 leading-relaxed">
                        {active.subtitle}
                      </p>
                    </div>

                    <div className="hidden shrink-0">
                      {active.oldPrice && (
                        <span className="text-xs line-through text-slate-500 block font-mono">
                          {active.oldPrice}
                        </span>
                      )}
                      <span className="text-lg sm:text-xl font-extrabold text-blue-600 font-mono tabular-nums">
                        {active.currentPrice}
                      </span>
                    </div>
                  </div>

                  {/* Direct Action inside the Slide */}
                  <div className="pt-2 border-t border-white/20 flex items-center justify-between gap-3">
                    <a
                      href={buildDirectWhatsAppUrl(whatsappPhone, active.whatsappNote)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg transition-colors shadow-sm bg-blue-600 hover:bg-blue-500 text-white"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                      <span>Comprar por WhatsApp</span>
                    </a>

                    <a
                      href="#catalogo"
                      className="hidden px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap"
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
                      ? 'w-8 bg-blue-600'
                      : 'w-2 bg-slate-200 hover:bg-slate-300'
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

