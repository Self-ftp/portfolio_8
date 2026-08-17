'use client'

import { CubeViewport } from './CubeViewport'

/**
 * Малый куб в разделе Contact.
 *
 * Визуально замыкает сайт: тот же объект, что в hero, но тише —
 * меньше, спокойнее в движении, без контактной тени. Главным
 * остаётся один куб, на первом экране.
 */
export function ContactCube() {
  return <CubeViewport variant="contact" />
}
