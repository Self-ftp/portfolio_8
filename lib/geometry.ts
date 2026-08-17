import * as THREE from 'three'

/**
 * Переворачивает геометрию по оси Y.
 *
 * Простой scale(1, -1, 1) инвертирует направление обхода треугольников,
 * из-за чего нормали смотрят внутрь и модель освещается неправильно.
 * Поэтому после отражения мы разворачиваем обмотку и пересчитываем
 * нормали — без этого стекло и фаски выглядят «плоско».
 */
export function flipGeometryY(geometry: THREE.BufferGeometry) {
  geometry.applyMatrix4(new THREE.Matrix4().makeScale(1, -1, 1))

  const index = geometry.getIndex()
  if (index) {
    const a = index.array as ArrayLike<number>
    for (let i = 0; i < a.length; i += 3) {
      const tmp = index.getX(i + 1)
      index.setX(i + 1, index.getX(i + 2))
      index.setX(i + 2, tmp)
    }
    index.needsUpdate = true
  } else {
    // Неиндексированная геометрия (ExtrudeGeometry): меняем местами
    // вторую и третью вершину каждого треугольника.
    for (const name of Object.keys(geometry.attributes)) {
      const attr = geometry.attributes[name] as THREE.BufferAttribute
      const itemSize = attr.itemSize
      const arr = attr.array as Float32Array
      for (let i = 0; i < arr.length; i += itemSize * 3) {
        for (let k = 0; k < itemSize; k++) {
          const b = i + itemSize + k
          const c = i + itemSize * 2 + k
          const tmp = arr[b]
          arr[b] = arr[c]
          arr[c] = tmp
        }
      }
      attr.needsUpdate = true
    }
  }

  geometry.computeVertexNormals()
  return geometry
}

/** Центрирует геометрию и приводит её высоту к заданной. */
export function normalizeToHeight(geometry: THREE.BufferGeometry, height: number) {
  geometry.center()
  geometry.computeBoundingBox()
  const size = new THREE.Vector3()
  geometry.boundingBox?.getSize(size)
  if (size.y > 0) {
    const scale = height / size.y
    geometry.scale(scale, scale, scale)
  }
  geometry.computeBoundingSphere()
  return geometry
}
