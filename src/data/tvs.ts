import { TV, Accessory } from '../types/tv';

import oledImage from '../assets/images/tv_oled_evo_display_1790262645463.jpg';
import qledImage from '../assets/images/tv_qled_gaming_setup_1790262655355.jpg';
import miniLedImage from '../assets/images/tv_mini_led_cinema_1790262665687.jpg';
import heroImage from '../assets/images/hero_smart_tv_living_room_1790262634121.jpg';

export { heroImage };

export const TV_CATALOG: TV[] = [
  {
    id: 'lg-oled-c4-65',
    brand: 'LG',
    modelName: 'OLED evo C4 65" 4K Smart TV',
    modelCode: 'OLED65C4PSA',
    screenSize: 65,
    technology: 'OLED',
    resolution: '4K UHD',
    refreshRate: 144,
    os: 'webOS',
    price: 11990,
    originalPrice: 14500,
    rating: 4.9,
    reviewsCount: 142,
    image: oledImage,
    badge: 'Bestseller',
    inStock: true,
    stockQuantity: 6,
    deliveryEstimate: 'Entrega Hoy en Santa Cruz y La Paz',
    description: 'El referente absoluto de calidad de imagen. Píxeles autoiluminados con negros puros absolutos y contraste infinito, impulsado por el nuevo procesador α9 Gen7 AI 4K. Tasa de refresco nativa de 144Hz perfecta para PlayStation 5, Xbox y PC Gaming.',
    highlights: [
      'Negros puros y brillo aumentado Brightness Booster',
      '4 puertos HDMI 2.1 con 144Hz, VRR, G-Sync y FreeSync',
      'Dolby Vision & Dolby Atmos inmersivo',
      'Control Magic Remote con puntero y comandos de voz'
    ],
    ports: {
      hdmi: 4,
      hdmi21: 4,
      usb: 3,
      optical: true,
      bluetooth: 'Bluetooth 5.2',
      wifi: 'Wi-Fi 6 (802.11ax)'
    },
    audio: {
      watts: 40,
      channels: '2.2 canales',
      atmos: true
    },
    idealFor: ['Cine & Series', 'Gaming PS5 / PC', 'Deportes'],
    recommendedDistance: '2.2m - 2.8m',
    dimensionsWithStand: '144.1 x 88.0 x 23.0 cm',
    weightKg: 18.5,
    warrantyYears: 2
  },
  {
    id: 'samsung-neo-qled-qn90d-65',
    brand: 'Samsung',
    modelName: 'Neo QLED 65" QN90D 4K Mini-LED',
    modelCode: 'QN65QN90DAFXZA',
    screenSize: 65,
    technology: 'Neo QLED',
    resolution: '4K UHD',
    refreshRate: 144,
    os: 'Tizen',
    price: 10890,
    originalPrice: 13200,
    rating: 4.8,
    reviewsCount: 98,
    image: qledImage,
    badge: 'Gaming 144Hz',
    inStock: true,
    stockQuantity: 4,
    deliveryEstimate: 'Entrega Hoy o 24 hrs a nivel nacional',
    description: 'Tecnología Quantum Matrix con Mini LEDs de ultra precisión. Brillo colosal ideal para salas muy iluminadas y luz diurna directa. Procesador NQ4 AI Gen2 con reescalado 4K inteligente y Gaming Hub integrado.',
    highlights: [
      'Quantum Mini LED con contraste ultra nítido y sin reflejos',
      'Brillo deslumbrante de hasta 2000 nits',
      'Motion Xcelerator 144Hz y panel antirreflejos de élite',
      'Control remoto solar ecológico SolarCell'
    ],
    ports: {
      hdmi: 4,
      hdmi21: 4,
      usb: 2,
      optical: true,
      bluetooth: 'Bluetooth 5.2',
      wifi: 'Wi-Fi 5'
    },
    audio: {
      watts: 60,
      channels: '4.2.2 canales',
      atmos: true
    },
    idealFor: ['Salón Iluminado', 'Gaming PS5 / PC', 'Deportes'],
    recommendedDistance: '2.2m - 2.8m',
    dimensionsWithStand: '144.6 x 89.1 x 27.0 cm',
    weightKg: 27.5,
    warrantyYears: 2
  },
  {
    id: 'tcl-qm8-75-mini-led',
    brand: 'TCL',
    modelName: 'QM8 Pro 75" Flagship 4K Mini-LED',
    modelCode: '75QM851G',
    screenSize: 75,
    technology: 'Mini-LED',
    resolution: '4K UHD',
    refreshRate: 144,
    os: 'Google TV',
    price: 10490,
    originalPrice: 12800,
    rating: 4.9,
    reviewsCount: 76,
    image: miniLedImage,
    badge: 'Cine en Casa',
    inStock: true,
    stockQuantity: 3,
    deliveryEstimate: 'Entrega Hoy en Cochabamba, LP y SCZ',
    description: 'Un espectáculo cinematográfico en pantalla gigante de 75 pulgadas con hasta 5000 zonas de atenuación local (local dimming) y 5000 nits de pico de brillo. Equipado con sonido Onkyo 2.1.2 integrado y Google TV con Chromecast.',
    highlights: [
      '5000+ zonas de atenuación local Mini-LED de última generación',
      'Google TV con todas las apps de streaming y control por voz',
      'Sistema de sonido envolvente Onkyo con subwoofer integrado',
      'Panel nativo de 144Hz y Game Accelerator a 240Hz en 1080p'
    ],
    ports: {
      hdmi: 4,
      hdmi21: 2,
      usb: 2,
      optical: true,
      bluetooth: 'Bluetooth 5.2',
      wifi: 'Wi-Fi 6'
    },
    audio: {
      watts: 80,
      channels: '2.1.2 Onkyo',
      atmos: true
    },
    idealFor: ['Cine & Series', 'Salón Iluminado', 'Deportes'],
    recommendedDistance: '2.8m - 3.8m',
    dimensionsWithStand: '166.7 x 102.5 x 34.0 cm',
    weightKg: 36.2,
    warrantyYears: 2
  },
  {
    id: 'sony-bravia-xr-a80l-55',
    brand: 'Sony',
    modelName: 'Bravia XR 55" OLED Cognitive Processor',
    modelCode: 'XR-55A80L',
    screenSize: 55,
    technology: 'OLED',
    resolution: '4K UHD',
    refreshRate: 120,
    os: 'Google TV',
    price: 9290,
    originalPrice: 11400,
    rating: 4.9,
    reviewsCount: 114,
    image: oledImage,
    badge: 'Nuevo 2026',
    inStock: true,
    stockQuantity: 5,
    deliveryEstimate: 'Entrega Hoy en 3 horas',
    description: 'El galardonado Cognitive Processor XR entiende cómo ven y escuchan los humanos para recrear un realismo sin precedentes. La pantalla vibra acústicamente para producir el sonido directamente desde la acción con Acoustic Surface Audio+.',
    highlights: [
      'Cognitive Processor XR con colores puros y texturas hiperrealistas',
      'Acoustic Surface Audio+: el sonido emana de la pantalla misma',
      'Perfecto para PlayStation 5 con Auto HDR Tone Mapping',
      'Google TV fluido con acceso a Bravia Core IMAX Enhanced'
    ],
    ports: {
      hdmi: 4,
      hdmi21: 2,
      usb: 2,
      optical: true,
      bluetooth: 'Bluetooth 5.2',
      wifi: 'Wi-Fi 5'
    },
    audio: {
      watts: 50,
      channels: '3.2 canales Acoustic',
      atmos: true
    },
    idealFor: ['Cine & Series', 'Gaming PS5 / PC'],
    recommendedDistance: '1.9m - 2.5m',
    dimensionsWithStand: '122.7 x 73.8 x 33.0 cm',
    weightKg: 18.8,
    warrantyYears: 2
  },
  {
    id: 'hisense-u7n-55-uled',
    brand: 'Hisense',
    modelName: 'U7N 55" Mini-LED ULED Pro 144Hz',
    modelCode: '55U7N',
    screenSize: 55,
    technology: 'Mini-LED',
    resolution: '4K UHD',
    refreshRate: 144,
    os: 'Google TV',
    price: 5290,
    originalPrice: 6600,
    rating: 4.7,
    reviewsCount: 65,
    image: qledImage,
    badge: 'Oferta Destacada',
    inStock: true,
    stockQuantity: 8,
    deliveryEstimate: 'Despacho Express Bolivia',
    description: 'La mejor relación calidad-precio en Bolivia para tecnología Mini-LED. Panel de 144Hz, tecnología de color Quantum Dot, Dolby Vision IQ y Game Mode Pro para exprimir al máximo tu consola o PC sin gastar una fortuna.',
    highlights: [
      'Mini-LED con cientos de zonas de atenuación y 1500 nits',
      '144Hz Game Mode Pro con barra de ajustes para videojuegos',
      'Dolby Vision IQ, HDR10+ Adaptive y Filmmaker Mode',
      'Audio 2.1 con subwoofer integrado en la parte trasera'
    ],
    ports: {
      hdmi: 4,
      hdmi21: 2,
      usb: 2,
      optical: true,
      bluetooth: 'Bluetooth 5.0',
      wifi: 'Wi-Fi 6E'
    },
    audio: {
      watts: 40,
      channels: '2.1 canales',
      atmos: true
    },
    idealFor: ['Gaming PS5 / PC', 'Deportes', 'Dormitorio'],
    recommendedDistance: '1.9m - 2.5m',
    dimensionsWithStand: '123.1 x 76.8 x 30.0 cm',
    weightKg: 15.3,
    warrantyYears: 1
  },
  {
    id: 'samsung-crystal-uhd-55-du8000',
    brand: 'Samsung',
    modelName: 'Crystal UHD 55" DU8000 4K Smart TV',
    modelCode: 'UN55DU8000FXZA',
    screenSize: 55,
    technology: 'Crystal UHD',
    resolution: '4K UHD',
    refreshRate: 60,
    os: 'Tizen',
    price: 3490,
    originalPrice: 4200,
    rating: 4.6,
    reviewsCount: 89,
    image: qledImage,
    badge: undefined,
    inStock: true,
    stockQuantity: 12,
    deliveryEstimate: 'Entrega Hoy en tu domicilio',
    description: 'Diseño ultrafino AirSlim de solo 26mm de grosor que se funde perfectamente en cualquier pared. Colores vivos y duraderos con Dynamic Crystal Color y procesador Crystal 4K para una definición cristalina en tus series favoritas.',
    highlights: [
      'Diseño ultra delgado AirSlim con bordes imperceptibles',
      'Dynamic Crystal Color con mil millones de tonalidades',
      'Gaming Hub de Samsung: juega sin consola vía Xbox Cloud',
      'Compatible con SmartThings, Alexa y Google Assistant'
    ],
    ports: {
      hdmi: 3,
      hdmi21: 0,
      usb: 2,
      optical: true,
      bluetooth: 'Bluetooth 5.2',
      wifi: 'Wi-Fi 5'
    },
    audio: {
      watts: 20,
      channels: '2.0 canales',
      atmos: false
    },
    idealFor: ['Dormitorio', 'Cine & Series'],
    recommendedDistance: '1.9m - 2.5m',
    dimensionsWithStand: '123.2 x 74.8 x 22.8 cm',
    weightKg: 15.8,
    warrantyYears: 1
  },
  {
    id: 'lg-oled-g4-77-flagship',
    brand: 'LG',
    modelName: 'OLED evo G4 77" Gallery Edition 144Hz',
    modelCode: 'OLED77G4SUB',
    screenSize: 77,
    technology: 'OLED',
    resolution: '4K UHD',
    refreshRate: 144,
    os: 'webOS',
    price: 25900,
    originalPrice: 31000,
    rating: 5.0,
    reviewsCount: 39,
    image: heroImage,
    badge: 'Nuevo 2026',
    inStock: true,
    stockQuantity: 2,
    deliveryEstimate: 'Entrega VIP con Instalación Especializada',
    description: 'La cúspide de la ingeniería de imagen mundial disponible en Bolivia. Incluye tecnología Micro Lens Array (MLA+) de segunda generación para un brillo 150% superior a los OLED convencionales, procesador α11 AI y diseño de galería para colgar a ras de pared.',
    highlights: [
      'Micro Lens Array (MLA+) con disipador térmico de grafeno',
      '5 años de garantía oficial en panel LG contra quemados',
      'Montaje de pared al ras incluido de fábrica (Zero Gap)',
      '144Hz en los 4 puertos HDMI 2.1 con ancho de banda completo de 48Gbps'
    ],
    ports: {
      hdmi: 4,
      hdmi21: 4,
      usb: 3,
      optical: true,
      bluetooth: 'Bluetooth 5.3',
      wifi: 'Wi-Fi 6E'
    },
    audio: {
      watts: 60,
      channels: '4.2 canales',
      atmos: true
    },
    idealFor: ['Cine & Series', 'Gaming PS5 / PC', 'Salón Iluminado'],
    recommendedDistance: '3.0m - 4.2m',
    dimensionsWithStand: '171.1 x 98.2 x 2.4 cm (a ras)',
    weightKg: 37.4,
    warrantyYears: 5
  },
  {
    id: 'samsung-the-frame-65-art',
    brand: 'Samsung',
    modelName: 'The Frame 65" QLED 4K Modo Arte',
    modelCode: 'QN65LS03DAFXZA',
    screenSize: 65,
    technology: 'QLED',
    resolution: '4K UHD',
    refreshRate: 120,
    os: 'Tizen',
    price: 10490,
    originalPrice: 12700,
    rating: 4.8,
    reviewsCount: 52,
    image: heroImage,
    badge: 'Cine en Casa',
    inStock: true,
    stockQuantity: 5,
    deliveryEstimate: 'Entrega Hoy o 24 hrs a nivel nacional',
    description: 'Cuando está encendido es un televisor QLED 4K de 120Hz con colores certificados PANTONE. Cuando está apagado, se transforma en un cuadro de arte de museo gracias a su pantalla mate antirreflejos revolucionaria con sensor de presencia.',
    highlights: [
      'Pantalla Matte Display 100% libre de reflejos molestos',
      'Marcos magnéticos intercambiables personalizables en madera o metal',
      'Conexión invisible One Connect: un solo cable transparente',
      'Acceso a más de 2500 obras de museos internacionales'
    ],
    ports: {
      hdmi: 4,
      hdmi21: 1,
      usb: 2,
      optical: true,
      bluetooth: 'Bluetooth 5.2',
      wifi: 'Wi-Fi 5'
    },
    audio: {
      watts: 40,
      channels: '2.0.2 canales',
      atmos: true
    },
    idealFor: ['Cine & Series', 'Salón Iluminado'],
    recommendedDistance: '2.2m - 2.8m',
    dimensionsWithStand: '145.6 x 86.9 x 24.9 cm',
    weightKg: 22.8,
    warrantyYears: 2
  },
  {
    id: 'xiaomi-tv-a-pro-43',
    brand: 'Xiaomi',
    modelName: 'TV A Pro 43" 4K HDR Google TV',
    modelCode: 'L43M8-A2ME',
    screenSize: 43,
    technology: 'QLED',
    resolution: '4K UHD',
    refreshRate: 60,
    os: 'Google TV',
    price: 2190,
    originalPrice: 2750,
    rating: 4.7,
    reviewsCount: 168,
    image: miniLedImage,
    badge: 'Oferta Destacada',
    inStock: true,
    stockQuantity: 15,
    deliveryEstimate: 'Entrega Inmediata en 3 horas',
    description: 'El Smart TV 4K más vendido en Bolivia para dormitorios o departamentos. Marco metálico unibody premium sin biseles, panel Quantum Dot 4K UHD y Google TV integrado con comando de voz Hey Google.',
    highlights: [
      'Panel QLED 4K con tecnología Dolby Vision y HDR10',
      'Estructura metálica premium con acabado biselado fino',
      'Doble altavoz estéreo con DTS:X y Dolby Audio',
      'Google TV con Chromecast built-in'
    ],
    ports: {
      hdmi: 3,
      hdmi21: 0,
      usb: 2,
      optical: true,
      bluetooth: 'Bluetooth 5.0',
      wifi: 'Wi-Fi Dual Band'
    },
    audio: {
      watts: 24,
      channels: '2.0 estéreo',
      atmos: false
    },
    idealFor: ['Dormitorio', 'Cine & Series'],
    recommendedDistance: '1.5m - 2.0m',
    dimensionsWithStand: '95.7 x 60.9 x 24.4 cm',
    weightKg: 6.9,
    warrantyYears: 1
  },
  {
    id: 'sony-bravia-7-75-mini-led',
    brand: 'Sony',
    modelName: 'Bravia 7 75" XR Mini-LED QLED 4K',
    modelCode: 'K-75XR70',
    screenSize: 75,
    technology: 'Mini-LED',
    resolution: '4K UHD',
    refreshRate: 120,
    os: 'Google TV',
    price: 14990,
    originalPrice: 18500,
    rating: 4.9,
    reviewsCount: 44,
    image: miniLedImage,
    badge: 'Nuevo 2026',
    inStock: true,
    stockQuantity: 3,
    deliveryEstimate: 'Envío Asegurado a toda Bolivia',
    description: 'La tecnología de control de retroiluminación XR Backlight Master Drive de Sony, heredada directamente de los monitores de masterización de cine de Hollywood. Máxima precisión de contraste y color cinema en gran formato.',
    highlights: [
      'XR Backlight Master Drive para negros de precisión milimétrica',
      'XR Triluminos Pro con más de mil millones de colores reales',
      'Dolby Vision, Dolby Atmos y calibración Studio Calibrated',
      'Soporte multi-posición de 4 vías para barras de sonido'
    ],
    ports: {
      hdmi: 4,
      hdmi21: 2,
      usb: 2,
      optical: true,
      bluetooth: 'Bluetooth 5.3',
      wifi: 'Wi-Fi 6'
    },
    audio: {
      watts: 50,
      channels: 'Acoustic Multi-Audio',
      atmos: true
    },
    idealFor: ['Cine & Series', 'Salón Iluminado', 'Deportes'],
    recommendedDistance: '2.8m - 3.8m',
    dimensionsWithStand: '166.8 x 98.4 x 39.5 cm',
    weightKg: 39.1,
    warrantyYears: 2
  },
  {
    id: 'samsung-neo-qled-8k-qn900d-85',
    brand: 'Samsung',
    modelName: 'Neo QLED 8K 85" QN900D Infinity Air',
    modelCode: 'QN85QN900DFXZA',
    screenSize: 85,
    technology: 'Neo QLED',
    resolution: '8K Ultra HD',
    refreshRate: 144,
    os: 'Tizen',
    price: 37900,
    originalPrice: 45000,
    rating: 5.0,
    reviewsCount: 19,
    image: heroImage,
    badge: undefined,
    inStock: true,
    stockQuantity: 1,
    deliveryEstimate: 'Entrega Especial & Montaje VIP Bolivia',
    description: 'La experiencia definitiva sin compromisos. Resolución 8K nativa (7680 x 4320) con procesador NQ8 AI Gen3 con 512 redes neuronales. Pantalla Infinity Screen con bordes de 0.8mm que parece flotar en el espacio.',
    highlights: [
      'Resolución 8K real con 33 millones de píxeles',
      'Infinity Air Design con soporte de espejo flotante y marco casi invisible',
      'Procesador NQ8 AI Gen3: reescala cualquier contenido a 8K',
      'Sonido multidireccional de 90W en 6.2.4 canales'
    ],
    ports: {
      hdmi: 4,
      hdmi21: 4,
      usb: 3,
      optical: true,
      bluetooth: 'Bluetooth 5.3',
      wifi: 'Wi-Fi 6E'
    },
    audio: {
      watts: 90,
      channels: '6.2.4 canales',
      atmos: true
    },
    idealFor: ['Cine & Series', 'Salón Iluminado', 'Gaming PS5 / PC'],
    recommendedDistance: '3.2m - 4.5m',
    dimensionsWithStand: '189.3 x 114.7 x 30.5 cm',
    weightKg: 54.0,
    warrantyYears: 3
  },
  {
    id: 'tcl-50-q6-qled',
    brand: 'TCL',
    modelName: 'Q6 50" 4K QLED Dolby Atmos',
    modelCode: '50Q651G',
    screenSize: 50,
    technology: 'QLED',
    resolution: '4K UHD',
    refreshRate: 60,
    os: 'Google TV',
    price: 2790,
    originalPrice: 3400,
    rating: 4.6,
    reviewsCount: 78,
    image: qledImage,
    badge: undefined,
    inStock: true,
    stockQuantity: 9,
    deliveryEstimate: 'Entrega Hoy en Santa Cruz, LP y Cbba',
    description: 'Gran calidad y colores vibrantes en tamaño versátil de 50". Con tecnología Quantum Dot y retroiluminación HighBright PRO Direct LED. Ideal para habitaciones, oficinas o salas medianas.',
    highlights: [
      'Panel QLED Quantum Dot con amplio espectro de color',
      'Google TV con control de voz manos libres',
      'Game Accelerator para latencia ultrabaja en consola',
      'Soporte para Dolby Vision, HDR10+ y Dolby Atmos'
    ],
    ports: {
      hdmi: 3,
      hdmi21: 0,
      usb: 1,
      optical: true,
      bluetooth: 'Bluetooth 5.0',
      wifi: 'Wi-Fi 5'
    },
    audio: {
      watts: 20,
      channels: '2.0 estéreo',
      atmos: true
    },
    idealFor: ['Dormitorio', 'Cine & Series'],
    recommendedDistance: '1.8m - 2.3m',
    dimensionsWithStand: '111.2 x 70.1 x 25.8 cm',
    weightKg: 10.4,
    warrantyYears: 1
  }
];

export const ACCESSORIES: Accessory[] = [
  {
    id: 'acc-soporte-movil-articulado',
    name: 'Soporte de Pared Móvil Brazo Articulado (37" a 85")',
    category: 'Soporte',
    price: 290,
    description: 'Acero reforzado de alta resistencia, giro de 180° e inclinación de 15°. Incluye pernos Fischer y nivelador.',
    imageIcon: 'Move3d'
  },
  {
    id: 'acc-soporte-fijo-ultraslim',
    name: 'Soporte Fijo Ultra Delgado al Ras (40" a 75")',
    category: 'Soporte',
    price: 180,
    description: 'Distancia de tan solo 19mm a la pared para efecto cuadro galería. Soporta hasta 55kg.',
    imageIcon: 'Square'
  },
  {
    id: 'acc-cable-hdmi-21-8k',
    name: 'Cable HDMI 2.1 Ultra High Speed 48Gbps Certificado (2 metros)',
    category: 'Cable',
    price: 130,
    description: 'Malla trenzada de nylon, conectores dorados 24k, soporte 4K a 144Hz y eARC sin pérdida.',
    imageIcon: 'Cable'
  },
  {
    id: 'acc-soundbar-dolby-atmos',
    name: 'Barra de Sonido Inalámbrica 3.1 con Subwoofer Dolby Atmos 360W',
    category: 'Audio',
    price: 1390,
    description: 'Conexión HDMI eARC y Bluetooth. Diálogos ultra nítidos y bajos profundos para cine en casa.',
    imageIcon: 'Speaker'
  },
  {
    id: 'acc-garantia-vip',
    name: 'Extensión de Garantía VIP +1 Año con Cobertura por Picos de Tensión',
    category: 'Protección',
    price: 350,
    description: 'Reemplazo inmediato a domicilio y protección contra descargas eléctricas atmosféricas.',
    imageIcon: 'ShieldCheck'
  }
];

export const STORE_DEFAULT_PHONE = '+59177788817'; // Bolivia WhatsApp
export const STORE_DISPLAY_PHONE = '+591 777 88817';
export const STORE_NAME = 'Alienn La Paz';
export const STORE_CITY = 'La Paz';
export const STORE_MAPS_URL = 'https://maps.app.goo.gl/kgaFB32GJxmD9q818';
