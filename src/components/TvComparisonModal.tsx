import React from 'react';
import { X, Scale, Check, Minus } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency, buildSingleTvWhatsAppUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';
import { imgOptimizada } from '../lib/cloudinary';

export const TvComparisonModal: React.FC = () => {
  const {
    comparisonTvs,
    toggleCompareTv,
    clearComparison,
    isComparisonOpen,
    setIsComparisonOpen,
    whatsappPhone
  } = useStore();

  if (!isComparisonOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/50 backdrop-blur-md">
      <div 
        className="relative w-full max-w-5xl bg-slate-50 border border-slate-200 rounded-2xl shadow-2xl text-slate-900 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-slate-50/95 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900 font-display">
              Comparativa Técnica ({comparisonTvs.length} de 3 modelos)
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {comparisonTvs.length > 0 && (
              <button
                onClick={clearComparison}
                className="text-xs text-slate-500 hover:text-rose-600 transition-colors"
              >
                Limpiar todo
              </button>
            )}
            <button
              onClick={() => setIsComparisonOpen(false)}
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-x-auto overflow-y-auto flex-1">
          {comparisonTvs.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              <Scale className="w-10 h-10 mx-auto text-slate-400 mb-2" />
              <p>No has seleccionado ningún televisor para comparar.</p>
              <p className="text-xs text-slate-500 mt-1">
                Haz clic en "Añadir a comparar" en las tarjetas del catálogo.
              </p>
            </div>
          ) : (
            <div className="min-w-[600px] border border-slate-200 rounded-xl overflow-hidden bg-white">
              {/* Product Header Row */}
              <div className="grid grid-cols-4 border-b border-slate-200 bg-slate-50/60 p-4 gap-4 items-end">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Especificación
                </div>
                {comparisonTvs.map(tv => (
                  <div key={tv.id} className="space-y-2">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white border border-slate-200">
                      <img
                        src={imgOptimizada(tv.image, 400)}
                        loading="lazy"
                        alt={tv.modelName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => toggleCompareTv(tv)}
                        className="absolute top-1 right-1 p-1 bg-white/80 rounded-full text-slate-500 hover:text-slate-900"
                        title="Quitar de comparativa"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs font-bold text-slate-900 line-clamp-1">{tv.brand} {tv.modelName}</p>
                    <p className="text-base font-bold text-blue-600 font-mono tabular-nums">
                      {formatCurrency(tv.price)}
                    </p>

                    <a
                      href={buildSingleTvWhatsAppUrl(tv, whatsappPhone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-500 rounded transition-colors"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                      <span>Comprar por WhatsApp</span>
                    </a>
                  </div>
                ))}
              </div>

              {/* Rows */}
              <div className="divide-y divide-slate-200/80 text-xs">
                {/* Screen Size */}
                <div className="grid grid-cols-4 p-3 gap-4">
                  <span className="text-slate-500 font-medium">Tamaño de Pantalla:</span>
                  {comparisonTvs.map(tv => (
                    <span key={tv.id} className="text-slate-900 font-mono">{tv.screenSize} pulgadas</span>
                  ))}
                </div>

                {/* Panel Tech */}
                <div className="grid grid-cols-4 p-3 gap-4">
                  <span className="text-slate-500 font-medium">Tecnología de Panel:</span>
                  {comparisonTvs.map(tv => (
                    <span key={tv.id} className="text-slate-900 font-semibold">{tv.technology}</span>
                  ))}
                </div>

                {/* Resolution */}
                <div className="grid grid-cols-4 p-3 gap-4">
                  <span className="text-slate-500 font-medium">Resolución:</span>
                  {comparisonTvs.map(tv => (
                    <span key={tv.id} className="text-slate-900">{tv.resolution}</span>
                  ))}
                </div>

                {/* Refresh Rate */}
                <div className="grid grid-cols-4 p-3 gap-4">
                  <span className="text-slate-500 font-medium">Tasa de Refresco:</span>
                  {comparisonTvs.map(tv => (
                    <span key={tv.id} className={`font-mono font-semibold ${tv.refreshRate >= 120 ? 'text-blue-600' : 'text-slate-700'}`}>
                      {tv.refreshRate} Hz {tv.refreshRate >= 120 ? '· Gaming Pro' : ''}
                    </span>
                  ))}
                </div>

                {/* OS */}
                <div className="grid grid-cols-4 p-3 gap-4">
                  <span className="text-slate-500 font-medium">Sistema Smart TV:</span>
                  {comparisonTvs.map(tv => (
                    <span key={tv.id} className="text-slate-900">{tv.os}</span>
                  ))}
                </div>

                {/* HDMI 2.1 */}
                <div className="grid grid-cols-4 p-3 gap-4">
                  <span className="text-slate-500 font-medium">Puertos HDMI 2.1 (4K 120/144Hz):</span>
                  {comparisonTvs.map(tv => (
                    <span key={tv.id} className="text-slate-900 font-mono">
                      {tv.ports.hdmi21 > 0 ? `${tv.ports.hdmi21} puertos` : 'No nativo (HDMI 2.0)'}
                    </span>
                  ))}
                </div>

                {/* Audio */}
                <div className="grid grid-cols-4 p-3 gap-4">
                  <span className="text-slate-500 font-medium">Sistema de Audio:</span>
                  {comparisonTvs.map(tv => (
                    <span key={tv.id} className="text-slate-900">
                      {tv.audio.watts}W ({tv.audio.channels}) {tv.audio.atmos ? '· Dolby Atmos' : ''}
                    </span>
                  ))}
                </div>

                {/* Distance */}
                <div className="grid grid-cols-4 p-3 gap-4">
                  <span className="text-slate-500 font-medium">Distancia Recomendada:</span>
                  {comparisonTvs.map(tv => (
                    <span key={tv.id} className="text-slate-700">{tv.recommendedDistance}</span>
                  ))}
                </div>

                {/* Warranty */}
                <div className="grid grid-cols-4 p-3 gap-4">
                  <span className="text-slate-500 font-medium">Garantía Oficial:</span>
                  {comparisonTvs.map(tv => (
                    <span key={tv.id} className="text-blue-600 font-medium">{tv.warrantyYears} años de marca</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
