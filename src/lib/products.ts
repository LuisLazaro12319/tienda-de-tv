import { doc, getDoc, runTransaction } from 'firebase/firestore';
import { db } from './firebase';
import { TV_CATALOG } from '../data/tvs';
import { subirImagenACloudinary } from './cloudinary';
import {
  LIMITE_BYTES,
  agregar,
  bytesDe,
  cacheVigente,
  limpiar,
  quitar,
  reemplazar,
  type CacheCatalogo,
} from './catalogoUtils';
import type { TV } from '../types/tv';

/**
 * Todo el catalogo vive en UN solo documento (catalogo/principal, campo "productos").
 * Asi cada visita a la tienda cuesta 1 lectura de Firestore sin importar cuantos
 * productos haya (plan gratis: 50.000 lecturas por dia).
 */
const CACHE_KEY = 'tvlp_catalogo_v1';
const catalogoRef = () => doc(db, 'catalogo', 'principal');

function leerCache(): CacheCatalogo | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as CacheCatalogo) : null;
  } catch {
    return null;
  }
}

function guardarCache(productos: TV[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), productos }));
  } catch {
    // sin espacio o modo privado: simplemente no se guarda
  }
}

/** Lo ultimo que este navegador conoce (puede estar vencido), para pintar la tienda al instante. */
export function catalogoEnCache(): TV[] {
  return leerCache()?.productos ?? [];
}

/**
 * Devuelve el catalogo. Si el navegador ya lo leyo hace menos de 5 minutos no toca la base (0 lecturas).
 * Si la base falla (sin internet o sin cuota), devuelve lo ultimo guardado en vez de dejar la tienda vacia.
 */
export async function cargarCatalogo(forzar = false): Promise<TV[]> {
  const cache = leerCache();
  if (!forzar && cache && cacheVigente(cache)) return cache.productos;

  try {
    const snap = await getDoc(catalogoRef());
    const productos = snap.exists() ? ((snap.data().productos as TV[] | undefined) ?? []) : [];
    guardarCache(productos);
    return productos;
  } catch (err) {
    if (cache) return cache.productos;
    throw err;
  }
}

/** Lee, modifica y escribe el documento dentro de una transaccion (1 lectura + 1 escritura). */
async function modificar(cambiar: (actual: TV[]) => TV[]): Promise<TV[]> {
  const resultado = await runTransaction(db, async (tx) => {
    const snap = await tx.get(catalogoRef());
    const actual = snap.exists() ? ((snap.data().productos as TV[] | undefined) ?? []) : [];
    const siguiente = limpiar(cambiar(actual));
    if (bytesDe(siguiente) > LIMITE_BYTES) {
      throw new Error('El catálogo llegó al límite de tamaño. Eliminá algún producto antes de agregar más.');
    }
    tx.set(catalogoRef(), { productos: siguiente });
    return siguiente;
  });
  guardarCache(resultado);
  return resultado;
}

export const addProducto = (datos: Omit<TV, 'id'>) => modificar((actual) => agregar(actual, datos));

export const updateProducto = (id: string, datos: Omit<TV, 'id'>) =>
  modificar((actual) => reemplazar(actual, id, datos));

export const deleteProducto = (id: string) => modificar((actual) => quitar(actual, id));

/**
 * Las fotos del catalogo de ejemplo vienen empaquetadas con la web (su URL depende de donde este
 * publicada). Se suben a Cloudinary una sola vez para que no se rompan si la web cambia de lugar.
 */
async function prepararEjemplos(): Promise<TV[]> {
  const urls = [...new Set(TV_CATALOG.map((tv) => tv.image))];
  const nuevas = new Map<string, string>();

  await Promise.all(
    urls.map(async (url) => {
      const absoluta = new URL(url, window.location.href).href;
      try {
        const blob = await (await fetch(absoluta)).blob();
        nuevas.set(url, await subirImagenACloudinary(blob));
      } catch {
        nuevas.set(url, absoluta);
      }
    })
  );

  return TV_CATALOG.map((tv) => ({ ...tv, image: nuevas.get(tv.image) ?? tv.image }));
}

/** Carga los televisores de ejemplo, solo si el catalogo esta vacio. Devuelve el catalogo resultante. */
export async function seedProductosSiVacio(): Promise<TV[]> {
  const actual = await cargarCatalogo(true);
  if (actual.length > 0) return actual;

  const ejemplos = await prepararEjemplos();
  return modificar((enBase) => (enBase.length > 0 ? enBase : ejemplos));
}
