import blurMap from '@/content/image-blur.json'
import type { Media } from './types'

const blur = blurMap as Record<string, string>

type Options = {
  ratio?: string
  ratioMobile?: string
  focus?: string
  caption?: string
}

/**
 * Хелпер для описания изображения.
 *
 * Подставляет blur-плейсхолдер автоматически: карта превью
 * генерируется скриптом из самих файлов, поэтому её не нужно
 * вести руками и она не может разойтись с ассетами.
 *
 * Если файла нет в карте — изображение просто отрисуется без
 * превью, ошибки не будет.
 */
export function img(src: string, alt: string, options: Options = {}): Media {
  return { src, alt, blurDataURL: blur[src], ...options }
}

/** Плейсхолдер: место зарезервировано, файла ещё нет. */
export function placeholder(alt: string, ratio: string, ratioMobile?: string): Media {
  return { src: null, alt, ratio, ratioMobile }
}
