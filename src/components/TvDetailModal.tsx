import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  Check, 
  Plus, 
  Tv, 
  Sparkles, 
  Sliders, 
  Volume2, 
  Layers, 
  Ruler, 
  Share2 
} from 'lucide-react';
import { TV, Accessory } from '../types/tv';
import { ACCESSORIES } from '../data/tvs';
import { useStore } from '../context/StoreContext';
import { formatCurrency, buildSingleTvWhatsAppUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

export const TvDetailModal: React.FC = () => {
  const { 
    selectedTvForDetail, 
    setSelectedTvForDetail, 
    addToCart, 
    whatsappPhone,
    showToast
  } = useStore();

  const [customInquiry, setCustomInquiry] = useState('');
  const [selectedAddons, setSelectedAddons] = useState<Accessory[]>([]);

  if (!selectedTvForDetail) return null;

  const tv = selectedTvForDetail;

  const toggleAddon = (addon: Accessory) => {
    setSelectedAddons(prev => {
      const exists = prev.some(a => a.id === addon.id);
      if (exists) {
        return prev.filter(a => a.id !== addon.id);
      }
      return [...prev, addon];
    });
  };

  const handleAddToCartWithAddons = () => {
    addToCart(tv, selectedAddons);
    setSelectedTvForDetail(null);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Enlace copiado al portapapeles');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Top Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900/95 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              {tv.brand} · Ficha Técnica Oficial
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Compartir enlace"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedTvForDetail(null)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Top Section: Photo + Purchase Summary Module */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Visual Frame */}
            <div className="md:col-span-6 space-y-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={tv.image}
                  alt={`${tv.brand} ${tv.modelName}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md rounded text-xs font-mono text-emerald-400 border border-slate-800">
                  {tv.screenSize}" · {tv.resolution}
                </div>
              </div>

              {/* Delivery & Warranty Trust Callouts */}
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-400">
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{tv.deliveryEstimate}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{tv.warrantyYears} años de garantía oficial</span>
                </div>
              </div>
            </div>

            {/* Contiguous Purchase Module */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <p className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">
                  {tv.brand} · Código: {tv.modelCode}
                </p>
                <h2 className="text-2xl font-extrabold text-white mt-1 font-display">
                  {tv.modelName}
                </h2>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                  <span className="text-amber-400">★ {tv.rating} ({tv.reviewsCount} opiniones verificadas)</span>
                  <span>·</span>
                  <span className="text-emerald-400 font-medium">{tv.stockQuantity} unidades en inventario</span>
                </div>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 block mb-0.5">Precio promocional web:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white font-mono tabular-nums">
                      {formatCurrency(tv.price)}
                    </span>
                    {tv.originalPrice && (
                      <span className="text-sm line-through text-slate-500 font-mono">
                        {formatCurrency(tv.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right text-xs">
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                    Ahorras {tv.originalPrice ? formatCurrency(tv.originalPrice - tv.price) : ''}
                  </span>
                </div>
              </div>

              {/* Custom WhatsApp Inquiry Note */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  ¿Tienes alguna pregunta específica para el asesor por WhatsApp?
                </label>
                <input
                  type="text"
                  value={customInquiry}
                  onChange={(e) => setCustomInquiry(e.target.value)}
                  placeholder="Ej: ¿Tienen servicio de instalación a pared hoy? ¿Aceptan tarjeta?"
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Primary Direct WhatsApp Action */}
              <a
                href={buildSingleTvWhatsAppUrl(tv, whatsappPhone, customInquiry)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 px-5 py-3 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors shadow-lg shadow-emerald-950/40"
              >
                <WhatsAppIcon className="w-5 h-5 fill-slate-950" />
                <span>Comprar este Televisor por WhatsApp</span>
              </a>

              <button
                onClick={handleAddToCartWithAddons}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>Añadir a Cotización / Carrito</span>
              </button>
            </div>
          </div>

          {/* Key Highlights Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Puntos Destacados & Tecnologías
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tv.highlights.map((h, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Especificaciones Técnicas Detalladas
            </h3>
            <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden divide-y divide-slate-800/80 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 p-3 gap-2">
                <span className="text-slate-400">Tecnología de Pantalla:</span>
                <span className="text-white font-medium">{tv.technology}</span>
                <span className="text-slate-400">Resolución:</span>
                <span className="text-white font-medium">{tv.resolution}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 p-3 gap-2">
                <span className="text-slate-400">Tasa de Refresco:</span>
                <span className="text-emerald-400 font-semibold">{tv.refreshRate} Hz nativo</span>
                <span className="text-slate-400">Sistema Operativo:</span>
                <span className="text-white font-medium">{tv.os}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 p-3 gap-2">
                <span className="text-slate-400">Puertos HDMI:</span>
                <span className="text-white font-medium">
                  {tv.ports.hdmi} puertos ({tv.ports.hdmi21}x HDMI 2.1 a 120/144Hz)
                </span>
                <span className="text-slate-400">Puertos USB:</span>
                <span className="text-white font-medium">{tv.ports.usb} entradas</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 p-3 gap-2">
                <span className="text-slate-400">Potencia de Audio:</span>
                <span className="text-white font-medium">
                  {tv.audio.watts}W ({tv.audio.channels}) {tv.audio.atmos ? '· Dolby Atmos' : ''}
                </span>
                <span className="text-slate-400">Conectividad:</span>
                <span className="text-white font-medium">{tv.ports.wifi} · {tv.ports.bluetooth}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 p-3 gap-2">
                <span className="text-slate-400">Distancia Óptima:</span>
                <span className="text-emerald-400 font-medium">{tv.recommendedDistance}</span>
                <span className="text-slate-400">Medidas con Base:</span>
                <span className="text-white font-medium">{tv.dimensionsWithStand}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 p-3 gap-2">
                <span className="text-slate-400">Peso Total:</span>
                <span className="text-white font-medium">{tv.weightKg} kg</span>
                <span className="text-slate-400">Garantía Fabricante:</span>
                <span className="text-white font-medium">{tv.warrantyYears} años oficial</span>
              </div>
            </div>
          </div>

          {/* Optional Accessories Upsell */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Complementa tu Televisor (Opcional)
              </h3>
              <span className="text-xs text-slate-400">Añádelos a tu cotización</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ACCESSORIES.map(acc => {
                const isSelected = selectedAddons.some(a => a.id === acc.id);
                return (
                  <div
                    key={acc.id}
                    onClick={() => toggleAddon(acc)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-emerald-950/30 border-emerald-500/60 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-white">{acc.name}</p>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{acc.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-emerald-400 font-mono block">
                        +{formatCurrency(acc.price)}
                      </span>
                      <span className={`inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        isSelected ? 'bg-emerald-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {isSelected ? 'Agregado' : '+ Agregar'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-800 bg-slate-950/90 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            <span>¿Dudas sobre compatibilidad o instalación? </span>
            <span className="text-white font-medium">Nuestros asesores responden en menos de 2 minutos vía WhatsApp.</span>
          </div>

          <button
            onClick={() => setSelectedTvForDetail(null)}
            className="px-5 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors"
          >
            Cerrar ficha
          </button>
        </div>
      </div>
    </div>
  );
};
