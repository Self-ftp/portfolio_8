import { img } from '@/lib/media'
import type { Service } from '@/lib/types'

/* =========================================================
   AREAS I WORK IN
   Правило языка: название направления — английский (интерфейс),
   описание — русский (голос автора). Не «услуги агентства»,
   а направления собственной работы.
   ========================================================= */

export const services: Service[] = [
  {
    index: '01',
    title: 'Digital Design',
    description: 'Создание интерфейсов, визуальных систем и digital experiences.',
    // Реальных скриншотов Dream Life/Ascend Club пока нет — та же
    // авторская concept-иллюстрация, что уже стоит в кейсе Dream Life
    // (не новая картинка ради заполнения, а переиспользование того,
    // что уже есть и подходит по смыслу — личный digital experience).
    visual: img('/images/projects/dream-life/concept.jpg', 'Concept-иллюстрация DREAM LIFE', { ratio: '4/3' }),
  },
  {
    index: '02',
    title: 'Development',
    description: 'Разработка сайтов, интерактивных проектов и цифровых продуктов.',
    // Та же логика — concept-иллюстрация NutriSnap (реального
    // цифрового продукта), а не случайная картинка.
    visual: img('/images/projects/nutrisnap/concept.jpg', 'Concept-иллюстрация NUTRISNAP', { ratio: '4/3' }),
  },
  {
    index: '03',
    title: 'Visual Design',
    description: 'Айдентика, графический дизайн и визуальные концепции.',
    visual: img('/images/projects/identities/monogram-03.jpg', 'Монограмма — геометрический знак', { ratio: '4/3' }),
  },
  {
    index: '04',
    title: 'Media & Content',
    description: 'Создание визуального контента, работа с медиа и визуальное повествование.',
    visual: img('/images/projects/visual-work/mertes-wide.jpg', 'Промо-макет услуг видеомонтажа', { ratio: '4/3' }),
  },
]

export const servicesMeta = {
  title: ['Areas', 'I work in.'],
}
