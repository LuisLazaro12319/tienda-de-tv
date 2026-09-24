import { TV, CartItem, CheckoutCustomerData } from '../types/tv';
import { STORE_NAME } from '../data/tvs';

export function formatCurrency(amount: number): string {
  // Bolivian standard format: Bs 11.490
  const formatted = new Intl.NumberFormat('es-BO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
  return `Bs ${formatted}`;
}

export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}

/**
 * Sends an already-complete message as-is (no greeting wrapping, unlike
 * buildSupportWhatsAppUrl which is for a bare topic string).
 */
export function buildDirectWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = cleanPhoneNumber(phone);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Creates a WhatsApp link for direct single TV purchase / consultation
 */
export function buildSingleTvWhatsAppUrl(tv: TV, phone: string, customMessage?: string): string {
  const cleanPhone = cleanPhoneNumber(phone);
  const discountText = tv.originalPrice ? ` (Antes: ${formatCurrency(tv.originalPrice)})` : '';
  
  let text = `👋 *¡Hola ${STORE_NAME}! Vengo de su página web y quiero comprar este televisor:*\n\n`;
  text += `📺 *Modelo:* ${tv.brand} ${tv.modelName}\n`;
  text += `📐 *Pulgadas:* ${tv.screenSize}" | *Tecnología:* ${tv.technology}\n`;
  text += `💰 *Precio Web:* ${formatCurrency(tv.price)}${discountText}\n`;
  text += `🏷️ *Código:* ${tv.modelCode}\n`;
  text += `⚡ *Tasa de Refresco:* ${tv.refreshRate}Hz | *OS:* ${tv.os}\n\n`;
  
  if (customMessage && customMessage.trim()) {
    text += `💬 *Consulta del cliente:* ${customMessage.trim()}\n\n`;
  } else {
    text += `📦 ¿Tienen stock disponible para coordinar el envío hoy y la forma de pago? Gracias.\n`;
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Creates a WhatsApp link for full cart checkout with delivery details
 */
export function buildCartWhatsAppUrl(
  items: CartItem[],
  customer: CheckoutCustomerData,
  totalAmount: number,
  phone: string
): string {
  const cleanPhone = cleanPhoneNumber(phone);
  
  let text = `👋 *¡HOLA! DESEO CONCRETAR MI PEDIDO EN ${STORE_NAME.toUpperCase()}*\n\n`;
  text += `🧾 *DETALLE DEL PEDIDO:*\n`;
  
  items.forEach((item, index) => {
    const itemSubtotal = item.tv.price * item.quantity;
    text += `\n${index + 1}. *${item.tv.brand} ${item.tv.modelName}* (${item.tv.screenSize}")\n`;
    text += `   • Cantidad: ${item.quantity} und.\n`;
    text += `   • Precio Unit: ${formatCurrency(item.tv.price)} | Subtotal: ${formatCurrency(itemSubtotal)}\n`;
    
    if (item.selectedAccessories && item.selectedAccessories.length > 0) {
      text += `   • *Accesorios incluidos:*\n`;
      item.selectedAccessories.forEach(acc => {
        text += `     + ${acc.name} (${formatCurrency(acc.price)})\n`;
      });
    }
  });

  text += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `💵 *TOTAL A PAGAR: ${formatCurrency(totalAmount)}*\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  text += `📋 *DATOS DE ENTREGA & CONTACTO:*\n`;
  text += `👤 *Nombre Completo:* ${customer.fullName || 'No especificado'}\n`;
  text += `📱 *Teléfono:* ${customer.phone || 'El de este chat'}\n`;
  text += `📍 *Ciudad / Zona:* ${customer.city || 'Por coordinar'}\n`;
  text += `🏠 *Dirección de Entrega:* ${customer.address || 'Por coordinar'}\n`;
  text += `🚚 *Modalidad:* ${customer.deliveryType}\n`;
  text += `💳 *Método de Pago Preferido:* ${customer.paymentMethod}\n`;

  if (customer.notes && customer.notes.trim()) {
    text += `📝 *Observaciones / Horario:* ${customer.notes.trim()}\n`;
  }

  text += `\nQuedo a la espera de sus datos bancarios o confirmación para recibir mi televisor. ¡Muchas gracias!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Creates general advice / support link
 */
export function buildSupportWhatsAppUrl(phone: string, topic?: string): string {
  const cleanPhone = cleanPhoneNumber(phone);
  const text = topic
    ? `👋 Hola ${STORE_NAME}, deseo asesoría técnica sobre: ${topic}`
    : `👋 Hola ${STORE_NAME}, quisiera asesoría personalizada para elegir el mejor televisor para mi sala y presupuesto.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
