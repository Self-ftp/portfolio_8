/** Отдельный файл, а не middleware.ts или actions.ts: обе стороны
 *  (middleware и server actions) импортируют это значение, а
 *  сам middleware.ts выполняется в Edge Runtime — держать общие
 *  константы отдельно от его кода избавляет от лишней связанности. */
export const ADMIN_COOKIE = 'admin_session'
