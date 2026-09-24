import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  MessageCircle, 
  Eye, 
  Plus, 
  Check, 
  Scale, 
  X, 
  Sparkles,
  Tv,
  ArrowUpDown,
  RotateCcw
} from 'lucide-react';
import { TV } from '../types/tv';
import { TV_CATALOG } from '../data/tvs';
import { useStore } from '../context/StoreContext';
import { formatCurrency, buildSingleTvWhatsAppUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

interface CatalogSectionProps {
  externalSizeFilter?: number | null;
  onClearExternalSizeFilter?: () => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  externalSizeFilter,
  onClearExternalSizeFilter
}) => {
  const {
    addToCart,
    setSelectedTvForDetail,
    toggleCompareTv,
    comparisonTvs,
    whatsappPhone
  } = useStore();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('Todas');
  const [selectedSize, setSelectedSize] = useState<string>(
    externalSizeFilter ? String(externalSizeFilter) : 'Todas'
  );
  const [selectedTech, setSelectedTech] = useState<string>('Todas');
  const [selectedHz, setSelectedHz] = useState<string>('Todas');
  const [selectedOs, setSelectedOs] = useState<string>('Todas');
  const [pricePreset, setPricePreset] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(40000);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Sync external size filter if passed from calculator
  React.useEffect(() => {
    if (externalSizeFilter) {
      setSelectedSize(String(externalSizeFilter));
    }
  }, [externalSizeFilter]);

  const brands = ['Todas', 'Samsung', 'LG', 'Sony', 'TCL', 'Hisense', 'Xiaomi'];
  const sizes = [
    { label: 'Todas las medidas', value: 'Todas' },
    { label: '43"', value: '43' },
    { label: '50"', value: '50' },
    { label: '55"', value: '55' },
    { label: '65"', value: '65' },
    { label: '75"', value: '75' },
    { label: '77" - 85"+', value: '80+' }
  ];
  const technologies = ['Todas', 'OLED', 'Neo QLED', 'Mini-LED', 'QLED', 'Crystal UHD'];
  const refreshRates = [
    { label: 'Todos', value: 'Todas' },
    { label: '60 Hz (Estándar)', value: '60' },
    { label: '120Hz / 144Hz (Gaming Pro)', value: '120+' }
  ];

  // Price preset handlers (Bolivia Bs)
  const handlePricePreset = (preset: string) => {
    setPricePreset(preset);
    if (preset === 'all') {
      setMinPrice(0);
      setMaxPrice(40000);
    } else if (preset === 'under3500') {
      setMinPrice(0);
      setMaxPrice(3500);
    } else if (preset === '3500to7000') {
      setMinPrice(3500);
      setMaxPrice(7000);
    } else if (preset === '7000to15000') {
      setMinPrice(7000);
      setMaxPrice(15000);
    } else if (preset === 'over15000') {
      setMinPrice(15000);
      setMaxPrice(40000);
    }
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedBrand('Todas');
    setSelectedSize('Todas');
    setSelectedTech('Todas');
    setSelectedHz('Todas');
    setSelectedOs('Todas');
    setPricePreset('all');
    setMinPrice(0);
    setMaxPrice(40000);
    setSortBy('featured');
    if (onClearExternalSizeFilter) onClearExternalSizeFilter();
  };

  // Filter and sort logic
  const filteredTvs = useMemo(() => {
    return TV_CATALOG.filter(tv => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesBrand = tv.brand.toLowerCase().includes(q);
        const matchesName = tv.modelName.toLowerCase().includes(q);
        const matchesCode = tv.modelCode.toLowerCase().includes(q);
        const matchesTech = tv.technology.toLowerCase().includes(q);
        const matchesOs = tv.os.toLowerCase().includes(q);
        const matchesResolution = tv.resolution.toLowerCase().includes(q);
        const matchesHz = `${tv.refreshRate}hz`.includes(q);
        if (!matchesBrand && !matchesName && !matchesCode && !matchesTech && !matchesOs && !matchesResolution && !matchesHz) {
          return false;
        }
      }

      // Brand
      if (selectedBrand !== 'Todas' && tv.brand !== selectedBrand) {
        return false;
      }

      // Size
      if (selectedSize !== 'Todas') {
        if (selectedSize === '80+') {
          if (tv.screenSize < 77) return false;
        } else {
          if (tv.screenSize !== parseInt(selectedSize, 10)) return false;
        }
      }

      // Technology
      if (selectedTech !== 'Todas' && tv.technology !== selectedTech) {
        return false;
      }

      // Refresh Rate
      if (selectedHz !== 'Todas') {
        if (selectedHz === '120+') {
          if (tv.refreshRate < 120) return false;
        } else if (selectedHz === '60') {
          if (tv.refreshRate !== 60) return false;
        }
      }

      // Smart OS
      if (selectedOs !== 'Todas' && tv.os !== selectedOs) {
        return false;
      }

      // Price range
      if (tv.price < minPrice || tv.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'size-desc') return b.screenSize - a.screenSize;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') {
        const discountA = a.originalPrice ? (a.originalPrice - a.price) : 0;
        const discountB = b.originalPrice ? (b.originalPrice - b.price) : 0;
        return discountB - discountA;
      }
      return 0; // featured original order
    });
  }, [
    searchQuery,
    selectedBrand,
    selectedSize,
    selectedTech,
    selectedHz,
    selectedOs,
    minPrice,
    maxPrice,
    sortBy
  ]);

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedBrand !== 'Todas' ||
    selectedSize !== 'Todas' ||
    selectedTech !== 'Todas' ||
    selectedHz !== 'Todas' ||
    selectedOs !== 'Todas' ||
    minPrice > 0 ||
    maxPrice < 40000;

  return (
    <section id="catalogo" className="py-12 md:py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
            <Tv className="w-4 h-4" />
            <span>Inventario 100% Original & Garantizado</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Catálogo Especializado de Televisores
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Filtra por marca, tamaño, tecnología y presupuesto. La compra se gestiona de inmediato por WhatsApp.
          </p>
        </div>

        {/* Live Counter & Reset */}
        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-400 font-medium">
            Mostrando <strong className="text-white font-mono">{filteredTvs.length}</strong> de {TV_CATALOG.length} modelos
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Filter & Search Control Panel */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-6 mb-8 space-y-5 shadow-xl">
        {/* Row 1: Search Input + Sorting */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
          {/* Instant Search Bar */}
          <div className="md:col-span-8 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por marca, modelo, 'OLED', '144Hz', 'Google TV', etc..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                aria-label="Borrar búsqueda"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-4 flex items-center gap-2">
            <div className="relative w-full">
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer appearance-none"
              >
                <option value="featured">Ordenar: Destacados</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="size-desc">Pulgadas: Mayor a Menor</option>
                <option value="rating">Mejor Calificados</option>
                <option value="discount">Mayor Descuento</option>
              </select>
            </div>

            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`p-2.5 rounded-xl border transition-colors shrink-0 flex items-center justify-center ${
                showAdvancedFilters
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
              title="Más filtros"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Row 2: Brand Segmented Control */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Marca:
          </span>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {brands.map(brand => {
              const isActive = selectedBrand === brand;
              return (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-400 text-slate-950 font-semibold shadow-sm'
                      : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {brand}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Screen Size Filter */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Tamaño de Pantalla:
          </span>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {sizes.map(size => {
              const isActive = selectedSize === size.value;
              return (
                <button
                  key={size.value}
                  onClick={() => setSelectedSize(size.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-400 text-slate-950 font-semibold'
                      : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {size.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 4: Price Filter Presets and Range Slider */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Filtro por Precio:
            </span>
            <span className="text-xs text-slate-300 font-mono">
              Rango actual: <strong className="text-cyan-400">{formatCurrency(minPrice)}</strong> — <strong className="text-cyan-400">{formatCurrency(maxPrice)}</strong>
            </span>
          </div>

          {/* Quick Price Buttons */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
            <button
              onClick={() => handlePricePreset('all')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                pricePreset === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Todos los precios
            </button>
            <button
              onClick={() => handlePricePreset('under3500')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                pricePreset === 'under3500'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Hasta Bs 3.500
            </button>
            <button
              onClick={() => handlePricePreset('3500to7000')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                pricePreset === '3500to7000'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Bs 3.500 a Bs 7.000
            </button>
            <button
              onClick={() => handlePricePreset('7000to15000')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                pricePreset === '7000to15000'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Bs 7.000 a Bs 15.000
            </button>
            <button
              onClick={() => handlePricePreset('over15000')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                pricePreset === 'over15000'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Más de Bs 15.000 (Alta Gama & 8K)
            </button>
          </div>

          {/* Slider for Max Price */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500 font-mono">Bs 0</span>
            <input
              type="range"
              min="2000"
              max="40000"
              step="500"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(parseInt(e.target.value, 10));
                setPricePreset('custom');
              }}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <span className="text-xs text-slate-300 font-mono whitespace-nowrap">
              Tope: {formatCurrency(maxPrice)}
            </span>
          </div>
        </div>

        {/* Row 5: Expandable Advanced Filters (Tech, Refresh Rate, OS) */}
        {showAdvancedFilters && (
          <div className="pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Tecnología de Panel:
              </label>
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {technologies.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Tasa de Refresco:
              </label>
              <select
                value={selectedHz}
                onChange={(e) => setSelectedHz(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {refreshRates.map(r => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Sistema Operativo:
              </label>
              <select
                value={selectedOs}
                onChange={(e) => setSelectedOs(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Todas">Todos los sistemas</option>
                <option value="Google TV">Google TV (Chromecast integrado)</option>
                <option value="webOS">webOS (LG)</option>
                <option value="Tizen">Tizen (Samsung)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Product Grid or Empty State */}
      {filteredTvs.length === 0 ? (
        <div className="text-center py-16 px-4 bg-slate-900/50 rounded-2xl border border-slate-800/80">
          <Tv className="w-12 h-12 mx-auto text-slate-600 mb-3" />
          <h3 className="text-lg font-bold text-white">No encontramos televisores con esos criterios</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
            Intenta ampliar el rango de precios o seleccionar otra combinación de filtros de marca y tamaño.
          </p>
          <button
            onClick={resetAllFilters}
            className="mt-5 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
          >
            Restablecer todos los filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTvs.map(tv => {
            const isComparing = comparisonTvs.some(item => item.id === tv.id);
            const discountPercentage = tv.originalPrice
              ? Math.round(((tv.originalPrice - tv.price) / tv.originalPrice) * 100)
              : null;

            return (
              <div
                key={tv.id}
                className="group flex flex-col justify-between bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-slate-700 hover:shadow-2xl hover:shadow-black/60 transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                  <img
                    src={tv.image}
                    alt={`${tv.brand} ${tv.modelName}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Scrim overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    {tv.badge && (
                      <span className="px-2.5 py-1 text-[11px] font-bold text-slate-950 bg-cyan-400 rounded-md tracking-wide">
                        {tv.badge}
                      </span>
                    )}
                    {discountPercentage && (
                      <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-rose-600 rounded-md">
                        -{discountPercentage}%
                      </span>
                    )}
                  </div>

                  {/* Stock tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-cyan-400 bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 rounded">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      {tv.deliveryEstimate}
                    </span>
                    <span className="text-[11px] font-mono text-slate-300 bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 rounded">
                      {tv.screenSize}"
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Unboxed clean metadata (Zero-Pill discipline) */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 font-medium">
                      <span className="text-cyan-400 font-semibold">{tv.brand}</span>
                      <span aria-hidden="true">·</span>
                      <span>{tv.technology}</span>
                      <span aria-hidden="true">·</span>
                      <span>{tv.refreshRate}Hz</span>
                      <span aria-hidden="true">·</span>
                      <span>{tv.os}</span>
                    </div>

                    {/* TV Title */}
                    <h3 className="text-base font-bold text-white line-clamp-1 group-hover:text-cyan-300 transition-colors">
                      {tv.modelName}
                    </h3>

                    {/* Short highlights */}
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {tv.description}
                    </p>
                  </div>

                  {/* Price & Rating Row */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-baseline justify-between">
                    <div>
                      {tv.originalPrice && (
                        <span className="text-xs line-through text-slate-500 mr-2 font-mono tabular-nums">
                          {formatCurrency(tv.originalPrice)}
                        </span>
                      )}
                      <span className="text-xl font-bold text-white font-mono tabular-nums">
                        {formatCurrency(tv.price)}
                      </span>
                    </div>

                    <div className="text-right text-xs text-slate-400">
                      <span className="text-amber-400">★ {tv.rating}</span>
                      <span className="text-slate-500 ml-1">({tv.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Actions & WhatsApp Closing Buttons */}
                  <div className="space-y-2 pt-1">
                    {/* Primary Action: Direct WhatsApp Purchase Link */}
                    <a
                      href={buildSingleTvWhatsAppUrl(tv, whatsappPhone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors shadow-sm"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-slate-950" />
                      <span>Comprar vía WhatsApp</span>
                    </a>

                    {/* Secondary Actions Row */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedTvForDetail(tv)}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ficha Técnica</span>
                      </button>

                      <button
                        onClick={() => addToCart(tv)}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
                        title="Agregar a cotización conjunta"
                      >
                        <Plus className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Cotizar</span>
                      </button>
                    </div>

                    {/* Subtle Compare Toggle */}
                    <div className="text-center pt-1">
                      <button
                        onClick={() => toggleCompareTv(tv)}
                        className={`text-[11px] font-medium inline-flex items-center gap-1 transition-colors ${
                          isComparing
                            ? 'text-cyan-400'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        <Scale className="w-3 h-3" />
                        <span>{isComparing ? 'En comparativa (quitar)' : 'Añadir a comparar'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
