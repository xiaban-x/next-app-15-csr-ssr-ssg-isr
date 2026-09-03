import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostById } from '@/lib/data'

// 动态路由 /posts/[id]

export async function generateStaticParams() {
  // 构建时预生成这些 id 的静态页面（对应 SSG）
  return getAllPosts().map((post) => ({ id: String(post.id) }))
}

// 动态生成页面标题（metadata）
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = getPostById(Number(id))
  return {
    title: post ? `${post.title} - 文章详情` : '文章不存在',
    description: post?.content.slice(0, 100) ?? '404',
  }
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = getPostById(Number(id))

  // 不存在的 id 触发 notFound()，渲染 app/not-found.tsx
  if (!post) {
    notFound()
  }

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">{post.title}</h1>
        <p className="pageInfo">
          动态路由 /posts/{id} · 详情数据在构建时静态生成
        </p>

        <div className="card">
          <p className="post-meta">
            ✍️ <strong>{post.author}</strong> · 🕒{' '}
            {new Date(post.createdAt).toLocaleString('zh-CN')}
          </p>
          <div className="post-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>
          <p className="post-content">{post.content}</p>
        </div>

        <div className="card">
          <h2>尝试这些玩法</h2>
          <ul>
            <li>
              访问不存在的文章（如{' '}
              <Link href="/posts/999">/posts/999</Link>），会命中{' '}
              <code>notFound()</code> 并展示全局 <code>app/not-found.tsx</code>
            </li>
            <li>
              刷新页面，头部导航与页面均保持静态（构建时生成，缓存于 CDN）
            </li>
            <li>
              浏览器查看源代码：整篇文章已包含在 HTML 中，SEO 友好
            </li>
          </ul>
        </div>

        <Link href="/posts" className="backLink">
          ← 返回文章列表
        </Link>
      </main>
    </div>
  )
}
