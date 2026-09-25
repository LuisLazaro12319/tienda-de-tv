import React, { createContext, useContext, useState, useEffect } from 'react';
import { TV, CartItem, Accessory, CheckoutCustomerData } from '../types/tv';
import { STORE_DEFAULT_PHONE } from '../data/tvs';
import { subscribeProductos } from '../lib/products';

interface StoreContextType {
  // Catalog (vive en Firestore; el admin lo carga/edita)
  productos: TV[];

  // Cart
  cart: CartItem[];
  addToCart: (tv: TV, accessories?: Accessory[]) => void;
  removeFromCart: (tvId: string) => void;
  updateQuantity: (tvId: string, quantity: number) => void;
  toggleAccessoryInCart: (tvId: string, accessory: Accessory) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartTotalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Modals & Panels
  selectedTvForDetail: TV | null;
  setSelectedTvForDetail: (tv: TV | null) => void;
  comparisonTvs: TV[];
  toggleCompareTv: (tv: TV) => void;
  clearComparison: () => void;
  isComparisonOpen: boolean;
  setIsComparisonOpen: (open: boolean) => void;

  // Store WhatsApp Phone Number (editable)
  whatsappPhone: string;
  setWhatsappPhone: (phone: string) => void;
  isPhoneSettingsOpen: boolean;
  setIsPhoneSettingsOpen: (open: boolean) => void;

  // Checkout Customer state
  customerData: CheckoutCustomerData;
  setCustomerData: React.Dispatch<React.SetStateAction<CheckoutCustomerData>>;

  // Quick Notification / Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productos, setProductos] = useState<TV[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeProductos(setProductos);
    return unsubscribe;
  }, []);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nexustv_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [whatsappPhone, setWhatsappPhoneState] = useState<string>(() => {
    try {
      return localStorage.getItem('nexustv_phone') || STORE_DEFAULT_PHONE;
    } catch {
      return STORE_DEFAULT_PHONE;
    }
  });

  const [selectedTvForDetail, setSelectedTvForDetail] = useState<TV | null>(null);
  const [comparisonTvs, setComparisonTvs] = useState<TV[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPhoneSettingsOpen, setIsPhoneSettingsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [customerData, setCustomerData] = useState<CheckoutCustomerData>({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    paymentMethod: 'Pago QR Simple / Transferencia (BCP, BNB, Mercantil, Unión)',
    deliveryType: 'Envío a Domicilio Express',
    notes: ''
  });

  useEffect(() => {
    try {
      localStorage.setItem('nexustv_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const setWhatsappPhone = (phone: string) => {
    setWhatsappPhoneState(phone);
    try {
      localStorage.setItem('nexustv_phone', phone);
    } catch {
      // ignore
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (tv: TV, accessories: Accessory[] = []) => {
    setCart(prev => {
      const existing = prev.find(item => item.tv.id === tv.id);
      if (existing) {
        return prev.map(item =>
          item.tv.id === tv.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { tv, quantity: 1, selectedAccessories: accessories }];
    });
    showToast(`"${tv.brand} ${tv.modelName}" añadido a tu cotización.`);
  };

  const removeFromCart = (tvId: string) => {
    setCart(prev => prev.filter(item => item.tv.id !== tvId));
  };

  const updateQuantity = (tvId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(tvId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.tv.id === tvId ? { ...item, quantity } : item
      )
    );
  };

  const toggleAccessoryInCart = (tvId: string, accessory: Accessory) => {
    setCart(prev =>
      prev.map(item => {
        if (item.tv.id !== tvId) return item;
        const exists = item.selectedAccessories.some(a => a.id === accessory.id);
        const nextAccessories = exists
          ? item.selectedAccessories.filter(a => a.id !== accessory.id)
          : [...item.selectedAccessories, accessory];
        return { ...item, selectedAccessories: nextAccessories };
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCompareTv = (tv: TV) => {
    setComparisonTvs(prev => {
      const exists = prev.some(item => item.id === tv.id);
      if (exists) {
        return prev.filter(item => item.id !== tv.id);
      }
      if (prev.length >= 3) {
        showToast('Puedes comparar hasta un máximo de 3 televisores simultáneamente.');
        return prev;
      }
      showToast(`Añadido "${tv.brand} ${tv.modelName}" a la tabla comparativa.`);
      return [...prev, tv];
    });
  };

  const clearComparison = () => {
    setComparisonTvs([]);
  };

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartTotalPrice = cart.reduce((acc, item) => {
    const tvPrice = item.tv.price * item.quantity;
    const accPrice = (item.selectedAccessories || []).reduce((a, accItem) => a + accItem.price, 0);
    return acc + tvPrice + accPrice;
  }, 0);

  return (
    <StoreContext.Provider
      value={{
        productos,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleAccessoryInCart,
        clearCart,
        cartTotalCount,
        cartTotalPrice,
        isCartOpen,
        setIsCartOpen,
        selectedTvForDetail,
        setSelectedTvForDetail,
        comparisonTvs,
        toggleCompareTv,
        clearComparison,
        isComparisonOpen,
        setIsComparisonOpen,
        whatsappPhone,
        setWhatsappPhone,
        isPhoneSettingsOpen,
        setIsPhoneSettingsOpen,
        customerData,
        setCustomerData,
        toastMessage,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
