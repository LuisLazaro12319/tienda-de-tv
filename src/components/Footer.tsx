import React from 'react';
import { Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { STORE_NAME, STORE_DISPLAY_PHONE } from '../data/tvs';
import { buildSupportWhatsAppUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Footer: React.FC = () => {
  const { whatsappPhone, setIsPhoneSettingsOpen } = useStore();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-8 border-b border-slate-900">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-3">
            <span className="text-lg font-bold text-white font-display">
              <span className="text-emerald-400">Nexus</span>TV
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tienda especializada en venta y asesoría de televisores Smart TV de alta gama. Venta directa y personalizada por WhatsApp con garantía oficial de marca.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Distribuidores Autorizados</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-200 block">
              Explorar
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Catálogo con Filtros
                </a>
              </li>
              <li>
                <a href="#calculador" className="hover:text-white transition-colors">
                  Calculador de Distancia y Pulgadas
                </a>
              </li>
              <li>
                <a href="#como-comprar" className="hover:text-white transition-colors">
                  Cómo Comprar por WhatsApp
                </a>
              </li>
              <li>
                <a href="#garantia" className="hover:text-white transition-colors">
                  Políticas de Garantía
                </a>
              </li>
              <li>
                <a href="#preguntas" className="hover:text-white transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Brands Available */}
          <div className="space-y-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-200 block">
              Marcas en Stock
            </span>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  LG Electronics (OLED evo & QNED)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Samsung (Neo QLED & The Frame)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Sony Bravia (XR OLED & Mini-LED)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  TCL (QM8 Flagship Mini-LED)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Hisense & Xiaomi (ULED & QLED)
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Store & WhatsApp Contact */}
          <div className="space-y-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-200 block">
              Atención & Ventas
            </span>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Lunes a Domingo: 8:00 AM – 10:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Showroom Santa Cruz (Equipetrol) & La Paz (Calacoto)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-mono text-slate-300">{whatsappPhone}</span>
              </div>

              <div className="pt-2">
                <a
                  href={buildSupportWhatsAppUrl(whatsappPhone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 rounded-lg hover:bg-emerald-900/50 transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                  <span>Chatear con Ventas</span>
                </a>
              </div>

              <button
                onClick={() => setIsPhoneSettingsOpen(true)}
                className="text-[11px] text-slate-500 hover:text-slate-400 underline block pt-1"
              >
                Editar número WhatsApp de recepción
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© 2026 NexusTV Inc. Todos los derechos reservados. Venta directa por WhatsApp.</p>
          <div className="flex items-center gap-4">
            <span>Garantía Oficial de Fábrica</span>
            <span>·</span>
            <span>Factura con Código QR (SIN Bolivia)</span>
            <span>·</span>
            <span>Envíos Asegurados Nacionales</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
