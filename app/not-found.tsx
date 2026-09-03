import Link from 'next/link'

// 全局 404 页面：notFound() 或未匹配路由都会渲染此文件
export default function NotFound() {
  return (
    <div className="container">
      <main className="main notfound-main">
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">页面不存在</h2>
        <p className="description">
          你访问的页面可能已被移除，或 URL 有误
        </p>
        <p className="card-tip">
          此页面由 <code>app/not-found.tsx</code> 提供 —— 试试从{' '}
          <code>/posts/999</code>（不存在的文章）触发的 404 效果
        </p>
        <div className="notfound-actions">
          <Link href="/" className="button">
            ← 返回首页
          </Link>
          <Link href="/posts" className="backLink">
            📰 查看文章列表
          </Link>
        </div>
      </main>
    </div>
  )
}
