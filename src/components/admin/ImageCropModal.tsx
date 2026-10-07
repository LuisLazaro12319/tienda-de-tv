import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';
import { getCroppedImageBlob } from '../../lib/cropImage';

type Props = {
  imageSrc: string;
  aspect: number;
  outputWidth: number;
  outputHeight: number;
  onCancel: () => void;
  onConfirm: (blob: Blob) => void;
};

export function ImageCropModal({ imageSrc, aspect, outputWidth, outputHeight, onCancel, onConfirm }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [procesando, setProcesando] = useState(false);

  const onCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  async function confirmar() {
    if (!croppedAreaPixels) return;
    setProcesando(true);
    try {
      const blob = await getCroppedImageBlob(imageSrc, croppedAreaPixels, outputWidth, outputHeight);
      onConfirm(blob);
    } finally {
      setProcesando(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4" onClick={onCancel}>
      <div
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-bold text-slate-900 mb-2 font-display">Encuadrá la foto</h3>
        <p className="text-xs text-slate-500 mb-4">
          Arrastrá para mover la foto y usá la barra para acercar o alejar. Lo que quede dentro del recuadro es
          exactamente lo que va a mostrarse en la web.
        </p>

        <div className="relative w-full aspect-[4/3] bg-black rounded-lg overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="flex items-center gap-3 mt-4">
          <span className="text-xs text-slate-500 shrink-0">Zoom</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button
            type="button"
            onClick={onCancel}
            disabled={procesando}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={confirmar}
            disabled={procesando}
            className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
          >
            {procesando ? 'Procesando...' : 'Usar esta foto'}
          </button>
        </div>
      </div>
    </div>
  );
}
