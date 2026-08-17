import { NextResponse, type NextRequest } from 'next/server'
import { ADMIN_COOKIE } from '@/lib/admin/constants'

/**
 * Пускает в /admin только с корректной cookie-сессией.
 *
 * Простая парольная защита — этого достаточно для личного сайта
 * с одним администратором. Полноценная система пользователей
 * здесь была бы избыточной сложностью ради несуществующей задачи.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/admin/login') return NextResponse.next()

  if (pathname.startsWith('/admin')) {
    const session = request.cookies.get(ADMIN_COOKIE)?.value
    const expected = process.env.ADMIN_PASSWORD

    // Если пароль не задан в окружении — админка недоступна вообще,
    // а не открыта всем. Отсутствие настройки — это не «пропустить».
    if (!expected || session !== expected) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
