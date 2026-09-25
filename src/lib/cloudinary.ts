const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Sube una imagen (ya recortada) a Cloudinary usando un upload preset sin firma
 * (no requiere backend ni credenciales secretas: el preset es publico a proposito).
 * Devuelve la URL segura (https) de la imagen ya alojada.
 */
export async function subirImagenACloudinary(blob: Blob): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error('Cloudinary no esta configurado (faltan VITE_CLOUDINARY_* en .env.local).');
  }

  const formData = new FormData();
  formData.append('file', blob);
  formData.append('upload_preset', UPLOAD_PRESET);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Cloudinary rechazo la subida de la imagen.');
  }

  const data = await res.json();
  return data.secure_url as string;
}
