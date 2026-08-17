import type { NavItem } from '@/lib/types'

/** Пункты в шапке и в fullscreen-меню. */
export const navigation: NavItem[] = [
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
]

/** Полные названия для fullscreen-меню. */
export const menuNavigation: NavItem[] = [
  { label: 'About me', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
]

/** Разделы главной. Номера отражают порядок прохождения сайта. */
export const sections = [
  { index: '01', id: 'home', label: 'Home' },
  { index: '02', id: 'about', label: 'About me' },
  { index: '03', id: 'projects', label: 'My projects' },
  { index: '04', id: 'what-i-do', label: 'What I do' },
  { index: '05', id: 'experience', label: 'Experience' },
  { index: '06', id: 'contact', label: 'Contact' },
] as const
