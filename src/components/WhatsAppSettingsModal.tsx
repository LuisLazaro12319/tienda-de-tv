import React, { useState } from 'react';
import { X, Phone, Check, Info } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { STORE_DEFAULT_PHONE, STORE_NAME } from '../data/tvs';
import { buildSupportWhatsAppUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

export const WhatsAppSettingsModal: React.FC = () => {
  const {
    whatsappPhone,
    setWhatsappPhone,
    isPhoneSettingsOpen,
    setIsPhoneSettingsOpen,
    showToast
  } = useStore();

  const [phoneInput, setPhoneInput] = useState(whatsappPhone);

  if (!isPhoneSettingsOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput.trim()) {
      showToast('Por favor introduce un número válido');
      return;
    }
    setWhatsappPhone(phoneInput.trim());
    showToast(`Número de WhatsApp actualizado a ${phoneInput.trim()}`);
    setIsPhoneSettingsOpen(false);
  };

  const handleReset = () => {
    setPhoneInput(STORE_DEFAULT_PHONE);
    setWhatsappPhone(STORE_DEFAULT_PHONE);
    showToast('Número restaurado al valor por defecto.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div 
        className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-2xl p-6 text-slate-900 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900 font-display">
              Configurar WhatsApp de Ventas
            </h3>
          </div>
          <button
            onClick={() => setIsPhoneSettingsOpen(false)}
            className="p-1 text-slate-500 hover:text-slate-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed">
          Todos los botones de compra y cotización de la tienda enviarán las órdenes a este número telefónico.
          Puedes colocar tu propio número de WhatsApp con código de país (ej. +591 para Bolivia, o cualquier celular de 8 dígitos) para recibir pedidos de clientes.
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Número de WhatsApp (con prefijo de país Bolivia +591):
            </label>
            <input
              type="text"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="Ej: +59178012345 o +59171234567"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-mono text-blue-600 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Este número se almacena de forma persistente en tu navegador.</span>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Guardar Número</span>
            </button>

            <a
              href={buildSupportWhatsAppUrl(phoneInput, `Prueba de mensaje desde ${STORE_NAME}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-medium text-blue-700 bg-blue-50/60 border border-blue-200/80 rounded-xl hover:bg-blue-100/50"
              title="Probar en WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>Probar</span>
            </a>
          </div>

          <div className="text-center pt-1">
            <button
              type="button"
              onClick={handleReset}
              className="text-[11px] text-slate-500 hover:text-slate-700"
            >
              Restaurar número predeterminado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
