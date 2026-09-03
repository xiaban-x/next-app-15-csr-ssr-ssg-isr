import Link from 'next/link'
import { getAllPosts } from '@/lib/data'

export const metadata = {
  title: '文章列表 - 动态路由演示',
  description: 'App Router SSG 文章列表 + 动态路由 /posts/[id]',
}

// 数据来自 lib/data.ts（共享模块），页面在构建时静态生成（SSG）
export default async function PostsPage() {
  const posts = getAllPosts()
  const buildTime = new Date().toISOString()

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">文章列表</h1>
        <p className="description">
          点击文章进入 <code>/posts/[id]</code> 动态路由详情页
        </p>

        <div className="card">
          <h2>本页演示了什么</h2>
          <ul>
            <li>
              <strong>SSG 列表页:</strong> 构建时静态生成，无需客户端请求
            </li>
            <li>
              <strong>嵌套布局:</strong> 顶部「文章频道」栏来自{' '}
              <code>app/posts/layout.tsx</code>，路由切换时不重新渲染
            </li>
            <li>
              <strong>动态路由:</strong> 详情页使用 <code>generateStaticParams</code>{' '}
              预生成全部文章页
            </li>
            <li>
              <strong>提交入口:</strong> 通过{' '}
              <Link href="/form">Server Actions 表单</Link> 可以新增文章
            </li>
          </ul>
          <p className="card-tip">
            页面构建时间: <code>{buildTime}</code>（刷新不变化，直到重新构建）
          </p>
        </div>

        <div className="post-list">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`} className="post-item">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-meta">
                ✍️ {post.author} · 🕒{' '}
                {new Date(post.createdAt).toLocaleDateString('zh-CN')}
              </p>
              <p className="post-excerpt">
                {post.content.length > 80
                  ? `${post.content.slice(0, 80)}…`
                  : post.content}
              </p>
              <div className="post-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <Link href="/" className="backLink">
          ← 返回首页
        </Link>
      </main>
    </div>
  )
}
