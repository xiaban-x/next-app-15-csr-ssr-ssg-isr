import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * UTM 归因中间件
 *
 * Vercel Web Analytics 会从"页面浏览请求"的 URL 查询参数中提取 UTM 归因信息。
 * 但用户从广告链接（如 /utm?utm_source=google&utm_campaign=launch）进入站点后，
 * 一旦发生站内跳转（尤其 App Router 客户端路由），URL 中的 UTM 参数就会丢失，
 * 导致后续页面的浏览无法归因到原始广告渠道。
 *
 * 本中间件在请求到达页面时，把 URL 中的 5 个标准 UTM 参数写入 cookie
 * （vercel-utm-*，有效期 30 天），Web Analytics 与自定义代码均可基于
 * 该 cookie 做跨页面、跨会话的归因。
 */

const UTM_PARAMS = ['source', 'medium', 'campaign', 'term', 'content'] as const

const COOKIE_PREFIX = 'vercel-utm-'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 天

export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const response = NextResponse.next()

  for (const param of UTM_PARAMS) {
    const value = searchParams.get(`utm_${param}`)
    if (value) {
      response.cookies.set(`${COOKIE_PREFIX}${param}`, value, {
        path: '/',
        maxAge: COOKIE_MAX_AGE,
        sameSite: 'lax',
      })
    }
  }

  return response
}

export const config = {
  // 仅匹配页面请求，跳过 Next.js 内部路由与静态资源
  matcher: ['/((?!_next|_vercel|favicon.ico|.*\\..*).*)'],
}
