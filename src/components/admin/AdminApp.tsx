import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { getFirebaseAuth } from '../../lib/firebase';
import { STORE_NAME } from '../../data/tvs';
import { AdminLogin } from './AdminLogin';
import { AdminProductos } from './AdminProductos';

export function AdminApp() {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [cargando, setCargando] = useState(true);
  const [errorConfig, setErrorConfig] = useState(false);

  useEffect(() => {
    try {
      return onAuthStateChanged(getFirebaseAuth(), (u) => {
        setUsuario(u);
        setCargando(false);
      });
    } catch {
      setErrorConfig(true);
      setCargando(false);
    }
  }, []);

  if (cargando) {
    return <div className="min-h-screen bg-slate-950" />;
  }

  if (errorConfig) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-sm text-center space-y-2">
          <h1 className="text-lg font-bold text-white font-display">Panel admin no configurado</h1>
          <p className="text-sm text-slate-400">
            Todavía falta cargar la configuración de Firebase para este sitio. La tienda pública funciona igual,
            este mensaje solo aparece acá en /admin.
          </p>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-white font-display">Panel Admin</h1>
            <p className="text-sm text-slate-400">{STORE_NAME}</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-xs text-slate-400 hover:text-white transition-colors">
              Ver la tienda
            </a>
            <button
              onClick={() => signOut(getFirebaseAuth())}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        <AdminProductos />
      </div>
    </div>
  );
}
