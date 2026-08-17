/**
 * Адрес сайта.
 *
 * Берётся из переменной окружения NEXT_PUBLIC_SITE_URL. Пока она
 * не задана, используется домен в зоне .invalid — она
 * зарезервирована стандартом и не может принадлежать никому,
 * поэтому подставить его в продакшене по ошибке невозможно:
 * canonical и Open Graph сразу окажутся заметно сломаны.
 *
 * Перед деплоем задайте переменную:
 *   NEXT_PUBLIC_SITE_URL=https://ваш-домен
 */
const FALLBACK = 'https://set-your-domain.invalid'

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK).replace(/\/$/, '')

export const siteUrlIsPlaceholder = siteUrl === FALLBACK
