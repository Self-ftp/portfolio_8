import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Next.js иногда путает корень workspace, если рядом с проектом
  // (например, в родительских папках на Windows) случайно оказался
  // ещё один package-lock.json — тогда он выводит предупреждение
  // "inferred your workspace root... may not be correct". Явно
  // фиксируем корень как папку самого проекта, чтобы Next.js не
  // гадал по посторонним lock-файлам на диске.
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ['image/avif', 'image/webp'],
    // Фото, загруженные через /admin, лежат в Vercel Blob —
    // next/image должен уметь их оптимизировать, а не только
    // локальные файлы из public/.
    remotePatterns: [
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
}

export default nextConfig
