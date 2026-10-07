import type { TV } from '../types/tv';

/** Firestore limita cada documento a 1 MiB; dejamos margen. */
export const LIMITE_BYTES = 900_000;

/** Tiempo que un visitante reutiliza el catalogo guardado antes de volver a leer la base. */
export const TTL_MS = 5 * 60 * 1000;

export interface CacheCatalogo {
  t: number;
  productos: TV[];
}

/** Firestore rechaza `undefined`; JSON lo descarta, que es justo lo que queremos. */
export function limpiar<T>(valor: T): T {
  return JSON.parse(JSON.stringify(valor)) as T;
}

export function bytesDe(productos: TV[]): number {
  return new TextEncoder().encode(JSON.stringify(productos)).length;
}

export function nuevoId(): string {
  return `tv-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function cacheVigente(cache: CacheCatalogo | null, ahora: number = Date.now()): boolean {
  return !!cache && ahora - cache.t < TTL_MS;
}

export function agregar(actual: TV[], datos: Omit<TV, 'id'>): TV[] {
  return [...actual, { ...datos, id: nuevoId() } as TV];
}

export function reemplazar(actual: TV[], id: string, datos: Omit<TV, 'id'>): TV[] {
  return actual.map((p) => (p.id === id ? ({ ...datos, id } as TV) : p));
}

export function quitar(actual: TV[], id: string): TV[] {
  return actual.filter((p) => p.id !== id);
}
