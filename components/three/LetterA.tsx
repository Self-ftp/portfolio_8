'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import { letterA } from './assets/letterA'
import { flipGeometryY, normalizeToHeight } from '@/lib/geometry'

type Props = {
  /** Уровень качества влияет на детализацию фаски. */
  tier: 'high' | 'mid'
}

/**
 * Буква A как самостоятельный 3D-объект.
 *
 * Контур берётся из assets/letterA.ts и разбирается синхронно —
 * SVGLoader.parse работает со строкой, поэтому ни сетевых запросов,
 * ни ожидания загрузки здесь нет, и буква готова к первому кадру.
 *
 * Материал намеренно НЕ transmission: второй прозрачный материал
 * потребовал бы второй render target и обошёлся бы дороже, чем
 * выглядел бы. Полированный диэлектрик с clearcoat даёт внутри
 * стекла нужный хромовый характер и остаётся читаемым силуэтом.
 */
export function LetterA({ tier }: Props) {
  const geometry = useMemo(() => {
    const { paths } = new SVGLoader().parse(letterA.svg)

    const shapes: THREE.Shape[] = []
    for (const path of paths) {
      shapes.push(...SVGLoader.createShapes(path))
    }

    // Глубина и фаска задаются в долях от высоты буквы, поэтому
    // сначала измеряем плоский контур. Иначе пропорции объёма
    // зависели бы от случайного размера viewBox в исходном SVG.
    const flat = new THREE.ShapeGeometry(shapes)
    flat.computeBoundingBox()
    const unit = flat.boundingBox ? flat.boundingBox.max.y - flat.boundingBox.min.y : 100
    flat.dispose()

    const raw = new THREE.ExtrudeGeometry(shapes, {
      depth: unit * letterA.depth,
      bevelEnabled: true,
      bevelThickness: unit * letterA.bevel.thickness,
      bevelSize: unit * letterA.bevel.size,
      bevelOffset: 0,
      bevelSegments: tier === 'high' ? letterA.bevel.segments : 1,
      curveSegments: tier === 'high' ? 12 : 6,
    })

    flipGeometryY(raw)
    normalizeToHeight(raw, letterA.height)
    return raw
  }, [tier])

  return (
    <mesh geometry={geometry} castShadow={false} receiveShadow={false}>
      <meshPhysicalMaterial
        color="#f2f2f0"
        metalness={0.15}
        roughness={0.06}
        clearcoat={1}
        clearcoatRoughness={0.04}
        reflectivity={0.6}
        envMapIntensity={1.35}
      />
    </mesh>
  )
}
