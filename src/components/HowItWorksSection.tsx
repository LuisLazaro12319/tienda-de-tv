import React from 'react';
import { Search, MessageSquare, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { buildSupportWhatsAppUrl } from '../utils/whatsapp';
import { STORE_NAME } from '../data/tvs';

export const HowItWorksSection: React.FC = () => {
  const { whatsappPhone } = useStore();

  const steps = [
    {
      num: '01',
      title: 'Explora y Elige',
      desc: 'Navega por nuestro catálogo con filtros de tamaño, tecnología (OLED, QLED, Mini-LED) y rango de presupuesto.',
      icon: Search
    },
    {
      num: '02',
      title: 'Contacta por WhatsApp',
      desc: 'Haz clic en "Comprar vía WhatsApp". Tu mensaje se preconfigura con el modelo exacto, código y precio.',
      icon: MessageSquare
    },
    {
      num: '03',
      title: 'Confirmación & Pago Seguro',
      desc: 'Un asesor verifica stock en tiempo real en almacén, te envía la orden formal y acuerdan el método de pago.',
      icon: ShieldCheck
    },
    {
      num: '04',
      title: 'Entrega en tu Domicilio',
      desc: 'Recibe tu televisor nuevo en caja sellada con boleta o factura, garantía de marca y opción de soporte instalado.',
      icon: Truck
    }
  ];

  return (
    <section id="como-comprar" className="border-t border-slate-800 bg-slate-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Proceso Simple y Seguro
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-display">
            ¿Cómo se concreta la compra por WhatsApp?
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Comprar un televisor es una decisión importante. En {STORE_NAME} eliminamos la frialdad de los carritos automáticos y te atendemos con un asesor técnico personal que cuida cada detalle de tu envío.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-700 font-mono">
                      {step.num}
                    </span>
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner (Claim to proof adjacency) */}
        <div id="garantia" className="mt-12 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white font-display">
              Garantía Oficial en Bolivia & Envíos Asegurados a los 9 Departamentos
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Todos nuestros televisores provienen de importadores oficiales autorizados con número de serie verificable. Cuentan con soporte técnico directo en Bolivia de Samsung, LG, Sony y TCL, con opción de reemplazo por falla de fábrica durante los primeros 7 días.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Factura Electrónica con código QR (SIN Bolivia)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Despacho express en Santa Cruz, La Paz y Cochabamba
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Instalación a pared profesional disponible
              </span>
            </div>
          </div>

          <a
            href={buildSupportWhatsAppUrl(whatsappPhone, 'Consulta sobre garantías y envíos en Bolivia')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-3 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors whitespace-nowrap"
          >
            Consultar con Soporte Técnico
          </a>
        </div>
      </div>
    </section>
  );
};
