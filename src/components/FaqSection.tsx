import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { buildSupportWhatsAppUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FaqSection: React.FC = () => {
  const { whatsappPhone } = useStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Por qué la venta se concreta directamente por WhatsApp?',
      a: 'Comprar un televisor requiere asegurar que el tamaño sea el ideal para tu espacio, verificar la disponibilidad física inmediata en almacén y coordinar un envío delicado y seguro. A través de WhatsApp un asesor humano te atiende al instante, resuelve dudas de compatibilidad (PS5, consolas, barras de sonido) y te envía fotos o números de serie antes del despacho.'
    },
    {
      q: '¿Cuáles son las formas de pago disponibles en Bolivia?',
      a: 'Aceptamos pagos por QR Simple (sin comisiones entre bancos: BCP Bolivia, Banco Unión, Banco Mercantil Santa Cruz BMSC, Banco Nacional de Bolivia BNB, Banco FIE, Banco Bisa), transferencias bancarias directas, Tigo Money, tarjetas de débito/crédito mediante POS inalámbrico en entrega o link de pago, y pago contra entrega (efectivo o QR) al momento de recibir tu televisor en Santa Cruz, La Paz y Cochabamba.'
    },
    {
      q: '¿Los televisores son nuevos de paquete y con garantía oficial en Bolivia?',
      a: 'Absolutamente. Todos nuestros equipos son 100% nuevos, sellados de fábrica en su caja original con precintos intactos. Incluyen garantía oficial de marca válida a nivel nacional en Bolivia (de 1 a 5 años según la gama) respaldada directamente por el servicio técnico oficial de LG, Samsung, Sony o TCL, además de factura con código QR emitida según normativa del SIN.'
    },
    {
      q: '¿Cuánto tiempo tarda la entrega y a qué ciudades llegan?',
      a: 'En Santa Cruz de la Sierra, La Paz y Cochabamba ofrecemos entrega express en el mismo día para compras coordinadas antes de las 4:00 PM (en 2 a 4 horas promedio). Para el resto del país (Sucre, Tarija, Oruro, Potosí, Trinidad, Cobija y provincias) enviamos en 24 a 48 horas mediante transporte expreso asegurado contra roturas.'
    },
    {
      q: '¿Ofrecen servicio de instalación de soporte a la pared?',
      a: 'Sí. Contamos con técnicos certificados que pueden llevar el soporte móvil o fijo de alta resistencia e instalarlo en tu pared de concreto, drywall o madera al momento de la entrega, calibrando la altura y conectando tus cables para dejar el televisor completamente operativo.'
    }
  ];

  return (
    <section id="preguntas" className="border-t border-slate-800 bg-slate-900/50 py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>Respuestas Rápidas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Preguntas Frecuentes
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Todo lo que necesitas saber antes de solicitar tu cotización o compra por WhatsApp.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-900/40 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-900">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
          <p className="text-sm text-slate-300">
            ¿Tienes alguna consulta que no figure aquí?
          </p>
          <a
            href={buildSupportWhatsAppUrl(whatsappPhone, 'Tengo una consulta general sobre compras')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4 fill-slate-950" />
            <span>Escribir al WhatsApp de Atención</span>
          </a>
        </div>
      </div>
    </section>
  );
};
