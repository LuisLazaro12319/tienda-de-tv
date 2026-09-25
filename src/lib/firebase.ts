import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Firestore no valida la config de forma sincronica, asi que esto es seguro
// aunque las variables de entorno todavia no esten cargadas (la tienda publica
// solo necesita esto, nunca "auth").
export const db = getFirestore(app);

// getAuth() SI valida el apiKey al instante y tira una excepcion si esta mal
// configurado. Se deja como funcion (no como constante a nivel de modulo) para
// que un error de configuracion de Firebase solo rompa el panel admin, nunca
// la tienda publica que ven los clientes.
export function getFirebaseAuth() {
  return getAuth(app);
}
