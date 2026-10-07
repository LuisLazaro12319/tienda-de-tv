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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/50 backdrop-blur-md">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-slate-50 border border-slate-200 rounded-2xl shadow-2xl text-slate-900 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Top Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-slate-50/95 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              {tv.brand} · Ficha Técnica Oficial
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              title="Compartir enlace"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedTvForDetail(null)}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
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
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white border border-slate-200">
                <img
                  src={tv.image}
                  alt={`${tv.brand} ${tv.modelName}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-white/80 backdrop-blur-md rounded text-xs font-mono text-blue-600 border border-slate-200">
                  {tv.screenSize}" · {tv.resolution}
                </div>
              </div>

              {/* Delivery & Warranty Trust Callouts */}
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-500">
                <div className="p-3 rounded-lg bg-white/60 border border-slate-200/80 flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{tv.deliveryEstimate}</span>
                </div>
                <div className="p-3 rounded-lg bg-white/60 border border-slate-200/80 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{tv.warrantyYears} años de garantía oficial</span>
                </div>
              </div>
            </div>

            {/* Contiguous Purchase Module */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <p className="text-xs font-semibold text-blue-600 tracking-wider uppercase">
                  {tv.brand} · Código: {tv.modelCode}
                </p>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1 font-display">
                  {tv.modelName}
                </h2>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                  <span className="text-amber-500">★ {tv.rating} ({tv.reviewsCount} opiniones verificadas)</span>
                  <span>·</span>
                  <span className="text-blue-600 font-medium">{tv.stockQuantity} unidades en inventario</span>
                </div>
                <p className="text-sm text-slate-700 mt-3 leading-relaxed">
                  {tv.description}
                </p>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-500 block mb-0.5">Precio promocional web:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
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
                  <span className="inline-block px-2 py-0.5 rounded bg-blue-600/10 text-blue-600 font-semibold border border-blue-500/20">
                    Ahorras {tv.originalPrice ? formatCurrency(tv.originalPrice - tv.price) : ''}
                  </span>
                </div>
              </div>

              {/* Custom WhatsApp Inquiry Note */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  ¿Tienes alguna pregunta específica para el asesor por WhatsApp?
                </label>
                <input
                  type="text"
                  value={customInquiry}
                  onChange={(e) => setCustomInquiry(e.target.value)}
                  placeholder="Ej: ¿Tienen servicio de instalación a pared hoy? ¿Aceptan tarjeta?"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Primary Direct WhatsApp Action */}
              <a
                href={buildSingleTvWhatsAppUrl(tv, whatsappPhone, customInquiry)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 px-5 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors shadow-lg shadow-blue-600/30"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                <span>Comprar este Televisor por WhatsApp</span>
              </a>

              <button
                onClick={handleAddToCartWithAddons}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4 text-blue-600" />
                <span>Añadir a Cotización / Carrito</span>
              </button>
            </div>
          </div>

          {/* Key Highlights Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Puntos Destacados & Tecnologías
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tv.highlights.map((h, i) => (
                <div key={i} className="p-3 rounded-lg bg-white/80 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Especificaciones Técnicas Detalladas
            </h3>
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden divide-y divide-slate-200/80 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 p-3 gap-2">
                <span className="text-slate-500">Tecnología de Pantalla:</span>
                <span className="text-slate-900 font-medium">{tv.technology}</span>
                <span className="text-slate-500">Resolución:</span>
                <span className="text-slate-900 font-medium">{tv.resolution}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 p-3 gap-2">
                <span className="text-slate-500">Tasa de Refresco:</span>
                <span className="text-blue-600 font-semibold">{tv.refreshRate} Hz nativo</span>
                <span className="text-slate-500">Sistema Operativo:</span>
                <span className="text-slate-900 font-medium">{tv.os}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 p-3 gap-2">
                <span className="text-slate-500">Puertos HDMI:</span>
                <span className="text-slate-900 font-medium">
                  {tv.ports.hdmi} puertos ({tv.ports.hdmi21}x HDMI 2.1 a 120/144Hz)
                </span>
                <span className="text-slate-500">Puertos USB:</span>
                <span className="text-slate-900 font-medium">{tv.ports.usb} entradas</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 p-3 gap-2">
                <span className="text-slate-500">Potencia de Audio:</span>
                <span className="text-slate-900 font-medium">
                  {tv.audio.watts}W ({tv.audio.channels}) {tv.audio.atmos ? '· Dolby Atmos' : ''}
                </span>
                <span className="text-slate-500">Conectividad:</span>
                <span className="text-slate-900 font-medium">{tv.ports.wifi} · {tv.ports.bluetooth}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 p-3 gap-2">
                <span className="text-slate-500">Distancia Óptima:</span>
                <span className="text-blue-600 font-medium">{tv.recommendedDistance}</span>
                <span className="text-slate-500">Medidas con Base:</span>
                <span className="text-slate-900 font-medium">{tv.dimensionsWithStand}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 p-3 gap-2">
                <span className="text-slate-500">Peso Total:</span>
                <span className="text-slate-900 font-medium">{tv.weightKg} kg</span>
                <span className="text-slate-500">Garantía Fabricante:</span>
                <span className="text-slate-900 font-medium">{tv.warrantyYears} años oficial</span>
              </div>
            </div>
          </div>

          {/* Optional Accessories Upsell */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Complementa tu Televisor (Opcional)
              </h3>
              <span className="text-xs text-slate-500">Añádelos a tu cotización</span>
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
                        ? 'bg-blue-50 border-blue-500/60 text-slate-900'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{acc.name}</p>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{acc.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-blue-600 font-mono block">
                        +{formatCurrency(acc.price)}
                      </span>
                      <span className={`inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        isSelected ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-500'
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
        <div className="border-t border-slate-200 bg-white/90 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            <span>¿Dudas sobre compatibilidad o instalación? </span>
            <span className="text-slate-900 font-medium">Nuestros asesores responden en menos de 2 minutos vía WhatsApp.</span>
          </div>

          <button
            onClick={() => setSelectedTvForDetail(null)}
            className="px-5 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
          >
            Cerrar ficha
          </button>
        </div>
      </div>
    </div>
  );
};
