import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  ShoppingBag,
  CreditCard,
  MapPin,
  User,
  Phone
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency, buildCartWhatsAppUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotalCount,
    cartTotalPrice,
    isCartOpen,
    setIsCartOpen,
    whatsappPhone,
    customerData,
    setCustomerData,
    showToast
  } = useStore();

  if (!isCartOpen) return null;

  const handleSendOrderToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Tu cotización está vacía.');
      return;
    }

    const whatsappUrl = buildCartWhatsAppUrl(
      cart,
      customerData,
      cartTotalPrice,
      whatsappPhone
    );

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    showToast('Abriendo WhatsApp con tu pedido...');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end">
      <div 
        className="w-full max-w-lg bg-slate-900 border-l border-slate-800 text-slate-100 flex flex-col h-full shadow-2xl animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white font-display">
              Cotización & Pedido ({cartTotalCount})
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-slate-400 hover:text-rose-400 transition-colors px-2 py-1"
                title="Vaciar todo"
              >
                Vaciar
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-16 px-4">
              <ShoppingBag className="w-12 h-12 mx-auto text-slate-600 mb-3" />
              <p className="text-base font-bold text-white">Tu lista de cotización está vacía</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Explora nuestro catálogo de Smart TVs y añade los modelos o accesorios que desees comprar.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 transition-colors"
              >
                Ver televisores disponibles
              </button>
            </div>
          ) : (
            <>
              {/* Itemized List */}
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                  Televisores en tu orden:
                </span>

                {cart.map(item => (
                  <div
                    key={item.tv.id}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                  >
                    <div className="flex gap-3 items-start">
                      <img
                        src={item.tv.image}
                        alt={item.tv.modelName}
                        referrerPolicy="no-referrer"
                        className="w-16 h-12 object-cover rounded-lg bg-slate-900 border border-slate-800 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-emerald-400 font-semibold">{item.tv.brand}</p>
                        <h4 className="text-xs font-bold text-white truncate">{item.tv.modelName}</h4>
                        <p className="text-[11px] text-slate-400 font-mono">
                          {formatCurrency(item.tv.price)} c/u
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.tv.id)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Accessories attached */}
                    {item.selectedAccessories && item.selectedAccessories.length > 0 && (
                      <div className="pl-2 border-l-2 border-slate-800 space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                          Accesorios adicionales:
                        </span>
                        {item.selectedAccessories.map(acc => (
                          <div key={acc.id} className="flex justify-between text-xs text-slate-300">
                            <span className="truncate pr-2">• {acc.name}</span>
                            <span className="font-mono text-emerald-400 shrink-0">
                              +{formatCurrency(acc.price)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Quantity controls & Subtotal */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <div className="flex items-center gap-2 bg-slate-900 rounded-lg p-1 border border-slate-800">
                        <button
                          onClick={() => updateQuantity(item.tv.id, item.quantity - 1)}
                          className="p-1 hover:text-white text-slate-400"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold px-2 font-mono tabular-nums text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.tv.id, item.quantity + 1)}
                          className="p-1 hover:text-white text-slate-400"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-white font-mono tabular-nums">
                        {formatCurrency(
                          item.tv.price * item.quantity +
                          (item.selectedAccessories || []).reduce((sum, a) => sum + a.price, 0)
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Contact & Delivery Form */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
                  Datos de Entrega (se enviarán por WhatsApp):
                </span>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Nombre Completo:</label>
                    <input
                      type="text"
                      value={customerData.fullName}
                      onChange={(e) => setCustomerData({ ...customerData, fullName: e.target.value })}
                      placeholder="Ej: Carlos Mendoza"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-400 block mb-1">Ciudad / Departamento:</label>
                      <input
                        type="text"
                        value={customerData.city}
                        onChange={(e) => setCustomerData({ ...customerData, city: e.target.value })}
                        placeholder="Ej: Santa Cruz, La Paz, Cbba..."
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Celular WhatsApp:</label>
                      <input
                        type="tel"
                        value={customerData.phone}
                        onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                        placeholder="Ej: 78012345"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Dirección / Zona de Entrega:</label>
                    <input
                      type="text"
                      value={customerData.address}
                      onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                      placeholder="Calle, anillo/zona, edificio o referencia"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Método de Pago en Bolivia:</label>
                    <select
                      value={customerData.paymentMethod}
                      onChange={(e: any) => setCustomerData({ ...customerData, paymentMethod: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500 cursor-pointer text-xs"
                    >
                      <option value="Pago QR Simple / Transferencia (BCP, BNB, Mercantil, Unión)">Pago QR Simple / Transferencia (BCP, BNB, BMSC, Unión)</option>
                      <option value="Contra Entrega (Efectivo o QR al recibir)">Contra Entrega (Efectivo o QR al recibir en casa)</option>
                      <option value="Tarjeta de Crédito / Débito (POS o Link)">Tarjeta de Crédito / Débito (POS inalámbrico o Link)</option>
                      <option value="Tigo Money">Tigo Money</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Notas u Horario preferido:</label>
                    <input
                      type="text"
                      value={customerData.notes}
                      onChange={(e) => setCustomerData({ ...customerData, notes: e.target.value })}
                      placeholder="Ej: Entregar a partir de las 3pm / Requiere instalación"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer with WhatsApp Action */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-800 bg-slate-950 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal ({cartTotalCount} unidades):</span>
                <span className="font-mono text-white">{formatCurrency(cartTotalPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Envío asegurado:</span>
                <span className="text-emerald-400 font-semibold">Gratis en Santa Cruz, La Paz y Cbba</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
                <span>Total a Pagar:</span>
                <span className="font-mono text-emerald-400 text-lg tabular-nums">
                  {formatCurrency(cartTotalPrice)}
                </span>
              </div>
            </div>

            <button
              onClick={handleSendOrderToWhatsApp}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors shadow-lg shadow-emerald-950/50"
            >
              <WhatsAppIcon className="w-5 h-5 fill-slate-950" />
              <span>Enviar Pedido a WhatsApp</span>
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Garantía oficial
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                Coordinación directa
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
