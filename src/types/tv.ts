export interface TV {
  id: string;
  brand: 'Samsung' | 'LG' | 'Sony' | 'TCL' | 'Hisense' | 'Xiaomi';
  modelName: string;
  modelCode: string;
  screenSize: number; // in inches: 43, 50, 55, 65, 75, 77, 85
  technology: 'OLED' | 'QD-OLED' | 'Neo QLED' | 'QLED' | 'Mini-LED' | 'Crystal UHD';
  resolution: '4K UHD' | '8K Ultra HD' | 'Full HD';
  refreshRate: 60 | 120 | 144;
  os: 'Google TV' | 'webOS' | 'Tizen' | 'Android TV';
  price: number; // in USD or standard store currency
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: 'Bestseller' | 'Nuevo 2026' | 'Gaming 144Hz' | 'Cine en Casa' | 'Oferta Destacada';
  inStock: boolean;
  stockQuantity: number;
  deliveryEstimate: string;
  description: string;
  highlights: string[];
  ports: {
    hdmi: number;
    hdmi21: number;
    usb: number;
    optical: boolean;
    bluetooth: string;
    wifi: string;
  };
  audio: {
    watts: number;
    channels: string;
    atmos: boolean;
  };
  idealFor: ('Cine & Series' | 'Gaming PS5 / PC' | 'Deportes' | 'Salón Iluminado' | 'Dormitorio')[];
  recommendedDistance: string; // e.g., "2.0m - 2.8m"
  dimensionsWithStand: string; // e.g. "144.1 x 88.2 x 23.0 cm"
  weightKg: number;
  warrantyYears: number;
}

export interface Accessory {
  id: string;
  name: string;
  category: 'Soporte' | 'Audio' | 'Cable' | 'Protección';
  price: number;
  description: string;
  imageIcon: string;
}

export interface CartItem {
  tv: TV;
  quantity: number;
  selectedAccessories: Accessory[];
}

export interface CheckoutCustomerData {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  paymentMethod: 'Pago QR Simple / Transferencia (BCP, BNB, Mercantil, Unión)' | 'Contra Entrega (Efectivo o QR al recibir)' | 'Tarjeta de Crédito / Débito (POS o Link)' | 'Tigo Money';
  deliveryType: 'Envío a Domicilio Express' | 'Retiro en Showroom / Almacén' | 'Envío Interdepartamental Asegurado';
  notes: string;
}
