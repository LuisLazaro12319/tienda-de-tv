import React, { useState } from 'react';
import { Eye, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface TvSizeCalculatorProps {
  onSelectSizeFilter: (size: number) => void;
}

export const TvSizeCalculator: React.FC<TvSizeCalculatorProps> = ({ onSelectSizeFilter }) => {
  const [distanceMeters, setDistanceMeters] = useState<number>(2.5);

  // Calculate recommended TV size range based on SMPTE (30°) and THX (40°) FOV for 4K UHD
  const calculateRecommendation = (meters: number) => {
    // SMPTE approx: diagonal inches = meters * 21.5
    // THX cinematic approx: diagonal inches = meters * 28.5
    if (meters <= 1.8) {
      return {
        idealSize: 43,
        sizeRange: '43" a 50"',
        title: 'Habitaciones o espacios compactos',
        detail: 'A menos de 2 metros, un televisor de 43" o 50" 4K ofrece nitidez absoluta sin cansar la vista.'
      };
    } else if (meters <= 2.5) {
      return {
        idealSize: 55,
        sizeRange: '55" a 65"',
        title: 'Salas estándar y dormitorios principales',
        detail: 'La distancia ideal para paneles 4K UHD de 55" a 65". Los píxeles son imperceptibles y la inmersión es cinematográfica.'
      };
    } else if (meters <= 3.2) {
      return {
        idealSize: 65,
        sizeRange: '65" a 75"',
        title: 'Salas amplias y cine en casa',
        detail: 'Un formato de 65" a 75" llena tu campo de visión a 30°-40° para películas y deportes con máxima emoción.'
      };
    } else {
      return {
        idealSize: 75,
        sizeRange: '75" a 85"+',
        title: 'Salones grandes y suites de entretenimiento',
        detail: 'Para más de 3.2 metros necesitas mínimo 75" o 85" para mantener la experiencia de sala de cine sin perder detalle.'
      };
    }
  };

  const rec = calculateRecommendation(distanceMeters);

  return (
    <section id="calculador" className="border-b border-slate-800 bg-slate-900/60 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <Eye className="w-4 h-4" />
            <span>Guía de Compra Inteligente</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            ¿Qué tamaño de televisor necesitas según tu distancia?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Ajusta los metros que hay entre tu sofá y la pared para descubrir el tamaño óptimo según los estándares cinematográficos 4K SMPTE y THX.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800">
          {/* Slider and Interactive controls */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label htmlFor="distance-slider" className="text-sm font-medium text-slate-300">
                  Distancia de visualización (Sofá a Televisor):
                </label>
                <span className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">
                  {distanceMeters.toFixed(1)} metros
                </span>
              </div>

              <input
                id="distance-slider"
                type="range"
                min="1.2"
                max="4.5"
                step="0.1"
                value={distanceMeters}
                onChange={(e) => setDistanceMeters(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />

              <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                <span>1.2m (Cerca)</span>
                <span>2.5m (Promedio)</span>
                <span>4.5m (Lejos)</span>
              </div>
            </div>

            {/* Visual Screen Size representation */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="text-lg font-bold font-mono">{rec.idealSize}"</span>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Tamaño recomendado:</p>
                  <p className="text-base font-bold text-white">{rec.sizeRange}</p>
                </div>
              </div>

              <a
                href="#catalogo"
                onClick={() => onSelectSizeFilter(rec.idealSize)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Filtrar catálogo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Educational / Explanatory Advice */}
          <div className="lg:col-span-6 space-y-4 border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8">
            <div className="flex items-center gap-2 text-white font-semibold text-base">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{rec.title}</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {rec.detail}
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>En resolución 4K puedes sentarte más cerca sin percibir grano ni píxeles.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Si tienes dudas entre dos tamaños, el 92% de los clientes prefiere elegir el más grande.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
