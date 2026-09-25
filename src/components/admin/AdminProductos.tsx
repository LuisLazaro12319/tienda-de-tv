import { useRef, useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { addProducto, updateProducto, deleteProducto, seedProductosSiVacio } from '../../lib/products';
import { subirImagenACloudinary } from '../../lib/cloudinary';
import { formatCurrency } from '../../utils/whatsapp';
import { ImageCropModal } from './ImageCropModal';
import type { TV } from '../../types/tv';

const MARCAS: TV['brand'][] = ['Samsung', 'LG', 'Sony', 'TCL', 'Hisense', 'Xiaomi'];
const TECNOLOGIAS: TV['technology'][] = ['OLED', 'QD-OLED', 'Neo QLED', 'QLED', 'Mini-LED', 'Crystal UHD'];
const RESOLUCIONES: TV['resolution'][] = ['4K UHD', '8K Ultra HD', 'Full HD'];
const REFRESH_RATES: TV['refreshRate'][] = [60, 120, 144];
const SISTEMAS: TV['os'][] = ['Google TV', 'webOS', 'Tizen', 'Android TV'];
const BADGES: NonNullable<TV['badge']>[] = ['Bestseller', 'Nuevo 2026', 'Gaming 144Hz', 'Cine en Casa', 'Oferta Destacada'];

// Misma proporcion que el recuadro de foto en el catalogo (aspect-[4/3])
const ASPECTO_FOTO = 4 / 3;
const ANCHO_SALIDA = 800;
const ALTO_SALIDA = 600;

const VACIO = {
  modelName: '',
  brand: 'Samsung' as TV['brand'],
  modelCode: '',
  screenSize: '55',
  technology: 'QLED' as TV['technology'],
  resolution: '4K UHD' as TV['resolution'],
  refreshRate: 60 as TV['refreshRate'],
  os: 'Google TV' as TV['os'],
  price: '',
  originalPrice: '',
  stockQuantity: '5',
  deliveryEstimate: 'Entrega Hoy o 24 hrs a nivel nacional',
  badge: '' as '' | NonNullable<TV['badge']>,
  description: '',
  image: '',
};

export function AdminProductos() {
  const { productos } = useStore();
  const [form, setForm] = useState(VACIO);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [subiendo, setSubiendo] = useState(false);
  const [sembrando, setSembrando] = useState(false);
  const [fotoParaRecortar, setFotoParaRecortar] = useState<string | null>(null);
  const inputArchivoRef = useRef<HTMLInputElement>(null);

  function editar(tv: TV) {
    setEditandoId(tv.id);
    setForm({
      modelName: tv.modelName,
      brand: tv.brand,
      modelCode: tv.modelCode,
      screenSize: String(tv.screenSize),
      technology: tv.technology,
      resolution: tv.resolution,
      refreshRate: tv.refreshRate,
      os: tv.os,
      price: String(tv.price),
      originalPrice: tv.originalPrice ? String(tv.originalPrice) : '',
      stockQuantity: String(tv.stockQuantity),
      deliveryEstimate: tv.deliveryEstimate,
      badge: tv.badge ?? '',
      description: tv.description,
      image: tv.image,
    });
  }

  function cancelar() {
    setEditandoId(null);
    setForm(VACIO);
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    if (!form.modelName.trim() || !form.price) return;
    setGuardando(true);

    const existente = editandoId ? productos.find((p) => p.id === editandoId) : undefined;
    const stockQuantity = Number(form.stockQuantity) || 0;

    const data: Omit<TV, 'id'> = {
      modelName: form.modelName.trim(),
      brand: form.brand,
      modelCode: form.modelCode.trim() || form.modelName.trim().toUpperCase().replace(/\s+/g, '-'),
      screenSize: Number(form.screenSize) || 55,
      technology: form.technology,
      resolution: form.resolution,
      refreshRate: form.refreshRate,
      os: form.os,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      rating: existente?.rating ?? 4.8,
      reviewsCount: existente?.reviewsCount ?? 0,
      image: form.image.trim() || '/img/promo.jpg',
      badge: form.badge || undefined,
      inStock: stockQuantity > 0,
      stockQuantity,
      deliveryEstimate: form.deliveryEstimate.trim(),
      description: form.description.trim(),
      highlights: existente?.highlights ?? [],
      ports: existente?.ports ?? { hdmi: 3, hdmi21: 0, usb: 2, optical: true, bluetooth: 'Bluetooth 5.0', wifi: 'Wi-Fi 5' },
      audio: existente?.audio ?? { watts: 20, channels: '2.0 canales', atmos: false },
      idealFor: existente?.idealFor ?? ['Cine & Series'],
      recommendedDistance: existente?.recommendedDistance ?? '2.0m - 2.8m',
      dimensionsWithStand: existente?.dimensionsWithStand ?? 'Consultar con el asesor',
      weightKg: existente?.weightKg ?? 15,
      warrantyYears: existente?.warrantyYears ?? 1,
    };

    try {
      if (editandoId) await updateProducto(editandoId, data);
      else await addProducto(data);
      cancelar();
    } finally {
      setGuardando(false);
    }
  }

  async function eliminar(id: string) {
    if (!confirm('¿Eliminar este televisor del catálogo?')) return;
    await deleteProducto(id);
  }

  async function cargarCatalogoInicial() {
    setSembrando(true);
    try {
      await seedProductosSiVacio();
    } finally {
      setSembrando(false);
    }
  }

  function onArchivoElegido(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const lector = new FileReader();
    lector.onload = () => setFotoParaRecortar(lector.result as string);
    lector.readAsDataURL(file);
  }

  async function onRecorteConfirmado(blob: Blob) {
    setFotoParaRecortar(null);
    setSubiendo(true);
    try {
      const url = await subirImagenACloudinary(blob);
      setForm((f) => ({ ...f, image: url }));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'No se pudo subir la foto. Probá de nuevo.');
    } finally {
      setSubiendo(false);
    }
  }

  return (
    <div className="space-y-6">
      {productos.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-slate-300">
            Todavía no hay televisores cargados. Podés arrancar con el catálogo de ejemplo y editarlo después.
          </p>
          <button
            onClick={cargarCatalogoInicial}
            disabled={sembrando}
            className="px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap"
          >
            {sembrando ? 'Cargando...' : 'Cargar catálogo de ejemplo'}
          </button>
        </div>
      )}

      <form onSubmit={guardar} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white font-display">
          {editandoId ? 'Editar televisor' : 'Nuevo televisor'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Nombre del modelo *</label>
            <input
              value={form.modelName}
              onChange={(e) => setForm({ ...form, modelName: e.target.value })}
              placeholder='Ej: OLED evo C4 65" 4K Smart TV'
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Marca</label>
            <select
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value as TV['brand'] })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
            >
              {MARCAS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Código de modelo</label>
            <input
              value={form.modelCode}
              onChange={(e) => setForm({ ...form, modelCode: e.target.value })}
              placeholder="Ej: OLED65C4PSA"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pulgadas</label>
            <input
              type="number"
              value={form.screenSize}
              onChange={(e) => setForm({ ...form, screenSize: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tecnología de panel</label>
            <select
              value={form.technology}
              onChange={(e) => setForm({ ...form, technology: e.target.value as TV['technology'] })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
            >
              {TECNOLOGIAS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Resolución</label>
            <select
              value={form.resolution}
              onChange={(e) => setForm({ ...form, resolution: e.target.value as TV['resolution'] })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
            >
              {RESOLUCIONES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tasa de refresco</label>
            <select
              value={form.refreshRate}
              onChange={(e) => setForm({ ...form, refreshRate: Number(e.target.value) as TV['refreshRate'] })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
            >
              {REFRESH_RATES.map((r) => (
                <option key={r} value={r}>{r}Hz</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sistema operativo</label>
            <select
              value={form.os}
              onChange={(e) => setForm({ ...form, os: e.target.value as TV['os'] })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
            >
              {SISTEMAS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Precio de venta (Bs) *</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Precio anterior (Bs, opcional)
            </label>
            <input
              type="number"
              value={form.originalPrice}
              onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
              placeholder="Para mostrar descuento"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Stock disponible</label>
            <input
              type="number"
              value={form.stockQuantity}
              onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Etiqueta destacada</label>
            <select
              value={form.badge}
              onChange={(e) => setForm({ ...form, badge: e.target.value as typeof form.badge })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="">Sin etiqueta</option>
              {BADGES.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tiempo de entrega</label>
            <input
              value={form.deliveryEstimate}
              onChange={(e) => setForm({ ...form, deliveryEstimate: e.target.value })}
              placeholder="Ej: Entrega Hoy en La Paz"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Descripción</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="sm:col-span-2 space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Foto del televisor</label>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="w-24 aspect-[4/3] rounded-lg overflow-hidden border border-slate-800 bg-black flex items-center justify-center shrink-0">
                {form.image ? (
                  <img src={form.image} alt="Vista previa" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] text-slate-500 text-center px-1">Sin foto</span>
                )}
              </div>
              <div>
                <input
                  ref={inputArchivoRef}
                  type="file"
                  accept="image/*"
                  onChange={onArchivoElegido}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => inputArchivoRef.current?.click()}
                  disabled={subiendo}
                  className="px-4 py-2 text-xs font-medium text-slate-300 bg-slate-950 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  {subiendo ? 'Subiendo...' : 'Subir foto desde mi dispositivo'}
                </button>
                <p className="text-[11px] text-slate-500 mt-1">Vas a poder mover y ajustar el zoom antes de guardarla.</p>
              </div>
            </div>
            <input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="o pegá una URL de imagen"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={guardando}
            className="px-5 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
          >
            {editandoId ? 'Guardar cambios' : 'Agregar televisor'}
          </button>
          {editandoId && (
            <button
              type="button"
              onClick={cancelar}
              className="px-5 py-2.5 text-sm font-medium text-slate-300 bg-slate-950 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-3 font-display">Televisores ({productos.length})</h3>
        <div className="space-y-2">
          {productos.map((tv) => (
            <div key={tv.id} className="flex items-center justify-between gap-3 py-2.5 border-b border-slate-800 last:border-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-14 aspect-[4/3] rounded-md overflow-hidden border border-slate-800 bg-black shrink-0">
                  <img src={tv.image} alt={tv.modelName} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{tv.brand} {tv.modelName}</p>
                  <p className="text-xs text-slate-400 font-mono">{formatCurrency(tv.price)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => editar(tv)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-950 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminar(tv.id)}
                  className="px-3 py-1.5 text-xs font-medium text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-lg hover:bg-rose-500/20 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          {productos.length === 0 && <p className="text-xs text-slate-500">Todavía no hay televisores cargados.</p>}
        </div>
      </div>

      {fotoParaRecortar && (
        <ImageCropModal
          imageSrc={fotoParaRecortar}
          aspect={ASPECTO_FOTO}
          outputWidth={ANCHO_SALIDA}
          outputHeight={ALTO_SALIDA}
          onCancel={() => setFotoParaRecortar(null)}
          onConfirm={onRecorteConfirmado}
        />
      )}
    </div>
  );
}
