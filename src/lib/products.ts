import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';
import { TV_CATALOG } from '../data/tvs';
import type { TV } from '../types/tv';

const PRODUCTOS_COL = 'productos';

export function subscribeProductos(callback: (productos: TV[]) => void): () => void {
  return onSnapshot(collection(db, PRODUCTOS_COL), (snap) => {
    const productos = snap.docs.map((d) => ({ ...(d.data() as Omit<TV, 'id'>), id: d.id }));
    callback(productos);
  });
}

export async function addProducto(data: Omit<TV, 'id'>) {
  await addDoc(collection(db, PRODUCTOS_COL), data);
}

export async function updateProducto(id: string, data: Partial<Omit<TV, 'id'>>) {
  await updateDoc(doc(db, PRODUCTOS_COL, id), data);
}

export async function deleteProducto(id: string) {
  await deleteDoc(doc(db, PRODUCTOS_COL, id));
}

/** Carga el catalogo original como datos de partida, solo si la coleccion esta vacia. */
export async function seedProductosSiVacio() {
  const snap = await getDocs(collection(db, PRODUCTOS_COL));
  if (!snap.empty) return;

  const batch = writeBatch(db);
  TV_CATALOG.forEach((tv) => {
    const { id, ...data } = tv;
    const ref = doc(collection(db, PRODUCTOS_COL));
    batch.set(ref, data);
  });
  await batch.commit();
}
