import Link from 'next/link'

// 嵌套布局：/posts 目录下的所有页面共享此头部
// App Router 布局在路由切换时不会重新渲染，只更新 children 部分
export default function PostsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="posts-topbar">
        <Link href="/posts" className="posts-logo">
          📰 文章频道
        </Link>
        <span className="posts-hint">
          嵌套布局 <code>app/posts/layout.tsx</code> — 路由切换时头部保持不刷新
        </span>
        <Link href="/" className="posts-home">
          首页
        </Link>
      </div>
      {children}
    </>
  )
}
