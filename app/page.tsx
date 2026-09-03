import Link from 'next/link'

export const metadata = {
  title: 'App Router 示例首页',
  description: 'Next.js 15 App Router 不同渲染模式示例导航',
}

export default function HomePage() {
  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
          Next.js 15 App Router 渲染模式示例
        </h1>

        <p className="description">
          这个项目演示了 Next.js 15 App Router 中的四种不同渲染模式
          以及布局、流式渲染、Server Actions、错误处理等进阶能力
        </p>

        <div className="card">
          <h2>四种渲染模式对比</h2>
          <ul>
            <li><strong>SSG (Static Site Generation)</strong> - 构建时生成静态页面</li>
            <li><strong>ISR (Incremental Static Regeneration)</strong> - 静态生成 + 定时更新</li>
            <li><strong>SSR (Server Side Rendering)</strong> - 每次请求时服务器渲染</li>
            <li><strong>CSR (Client Side Rendering)</strong> - 客户端动态渲染</li>
          </ul>
        </div>

        <h2 className="nav-section-title">渲染模式与数据请求</h2>
        <nav className="nav">
          <Link href="/ssg" className="navItem">🏗️ SSG 示例</Link>
          <Link href="/isr" className="navItem">🔄 ISR 示例</Link>
          <Link href="/ssr" className="navItem">⚡ SSR 示例</Link>
          <Link href="/csr" className="navItem">🖥️ CSR 示例</Link>
          <Link href="/api-test" className="navItem">🔧 API 测试工具</Link>
        </nav>

        <h2 className="nav-section-title">App Router 进阶功能演示</h2>
        <nav className="nav">
          <Link href="/posts" className="navItem">📰 文章频道<br /><small>动态路由 + 嵌套布局</small></Link>
          <Link href="/streaming" className="navItem">🖨️ 流式渲染<br /><small>loading + Suspense</small></Link>
          <Link href="/form" className="navItem">📝 Server Actions<br /><small>表单直写服务端</small></Link>
          <Link href="/search" className="navItem">🔍 URL 状态搜索<br /><small>searchParams 过滤</small></Link>
          <Link href="/error-demo" className="navItem">💥 错误边界<br /><small>error.tsx 演示</small></Link>
          <Link href="/utm" className="navItem">📈 UTM 归因<br /><small>Analytics 渠道追踪</small></Link>
        </nav>

        <div className="card">
          <h2>Vercel 数据分析与性能监控</h2>
          <p>本项目已集成 <strong>@vercel/analytics</strong>，包括：</p>
          <ul>
            <li>
              <strong>页面浏览统计:</strong> 根布局中的 <code>&lt;Analytics /&gt;</code>{' '}
              自动上报每次页面访问（含 App Router 客户端路由跳转）
            </li>
            <li>
              <strong>自定义事件上报:</strong>{' '}
              <Link href="/api-test">API 测试工具</Link>
              页面演示了 <code>track()</code> 用法（按钮点击、请求成功 / 失败等）
            </li>
            <li>
              <strong>UTM 归因:</strong> <code>middleware.ts</code> 将落地页的 UTM
              参数固化到 cookie，站内跳转后归因不丢失，详见{' '}
              <Link href="/utm">UTM 归因演示</Link>
            </li>
          </ul>
          <p>项目同时集成了 <strong>@vercel/speed-insights</strong>（性能监控）：</p>
          <ul>
            <li>
              <strong>Speed Insights:</strong> 根布局中的{' '}
              <code>&lt;SpeedInsights /&gt;</code> 自动采集真实用户访问时的 Core Web
              Vitals（LCP / CLS / INP 等），并在 Vercel 控制台的 Speed
              Insights 页可视化
            </li>
          </ul>
        </div>

        <div className="card">
          <h2>App Router vs Pages Router 主要区别</h2>
          <ul>
            <li><strong>目录结构:</strong> 使用 app/ 目录替代 pages/ 目录</li>
            <li><strong>Metadata:</strong> 使用 metadata 对象替代 Head 组件</li>
            <li><strong>数据获取:</strong> 直接在组件中使用 fetch，而不是 getStaticProps/getServerSideProps</li>
            <li><strong>缓存控制:</strong> 通过 fetch 选项控制缓存行为</li>
            <li><strong>客户端组件:</strong> 需要显式声明 'use client'</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
