'use client'

import Link from 'next/link'

// 路由段错误边界：app/error-demo/ 目录内渲染出错时展示此 UI
export default function ErrorDemoError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container">
      <main className="main">
        <h1 className="title">出错了 😅</h1>
        <p className="description">
          错误已被 <code>app/error-demo/error.tsx</code> 边界捕获，页面没有白屏
        </p>

        <div className="card error-card">
          <h2>错误详情</h2>
          <div className="error-message">
            {error.message || '发生未知错误'}
            {error.digest && (
              <p className="card-tip">
                错误摘要 (digest): <code>{error.digest}</code>（可在服务端日志中检索）
              </p>
            )}
          </div>
          <div className="error-actions">
            <button type="button" onClick={() => reset()} className="preset-btn">
              🔄 重试（reset 重新渲染）
            </button>
            <Link href="/" className="backLink">
              ← 返回首页
            </Link>
          </div>
        </div>

        <div className="card">
          <h2>注意</h2>
          <p>
            <code>error.tsx</code> 必须是客户端组件（<code>&apos;use client&apos;</code>
            ），错误边界只包裹其所在目录的页面；根布局的错误需要用{' '}
            <code>app/global-error.tsx</code> 兜底。
          </p>
        </div>
      </main>
    </div>
  )
}
