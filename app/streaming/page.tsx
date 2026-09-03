import Link from 'next/link'
import { Suspense } from 'react'

export const metadata = {
  title: '流式渲染演示 - Streaming SSR',
  description: 'Next.js 15 Streaming SSR - loading.tsx + Suspense',
}

// force-dynamic 使每次访问都实时渲染，
// 从而能观察到 loading.tsx 与 Suspense 分块的流式呈现过程
export const dynamic = 'force-dynamic'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// 模拟一个 2 秒后才返回数据的慢组件
async function SlowBanner() {
  await sleep(2000)
  return (
    <div className="stream-block stream-banner">
      <h3>🐌 Banner 区块（2s）</h3>
      <p>
        本区块用 <code>Suspense</code> 包裹，页面先显示骨架屏，
        数据就绪后以流式方式「插入」到已展示的内容中
      </p>
      <p>
        <strong>渲染完成时间:</strong> {new Date().toLocaleTimeString('zh-CN')}
      </p>
    </div>
  )
}

// 模拟一个 4 秒后才返回数据的慢列表
async function SlowList() {
  await sleep(4000)
  const items = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    name: `慢速数据项 ${i + 1}`,
    note: `服务端延迟 ${(i + 1) * 1000}ms 后生成`,
  }))
  return (
    <div className="stream-block stream-list">
      <h3>📋 列表区块（4s）</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> — {item.note}
          </li>
        ))}
      </ul>
      <p>
        <strong>渲染完成时间:</strong> {new Date().toLocaleTimeString('zh-CN')}
      </p>
    </div>
  )
}

// 即时返回的快组件，不套 Suspense
function FastBlock() {
  return (
    <div className="stream-block stream-fast">
      <h3>⚡ 即时区块（0s）</h3>
      <p>不依赖慢数据，随首屏 HTML 一起返回，先于慢区块展示。</p>
    </div>
  )
}

export default function StreamingPage() {
  return (
    <div className="container">
      <main className="main">
        <h1 className="title">流式渲染 (Streaming SSR)</h1>
        <p className="description">
          页面先返回可交互骨架，慢数据区块完成后逐块「流式」注入
        </p>

        <div className="card">
          <h2>观察要点</h2>
          <ul>
            <li>
              <strong>loading.tsx:</strong> 页面级加载态（目录内{' '}
              <code>app/streaming/loading.tsx</code>），首次渲染时先展示
            </li>
            <li>
              <strong>Suspense:</strong> 两个慢组件各自被 <code>Suspense</code>{' '}
              包裹并独立回退；2s 区块先于 4s 区块出现
            </li>
            <li>
              <strong>即时区块:</strong> 未套 Suspense 的内容随首屏一起到达
            </li>
          </ul>
          <p className="card-tip">
            💡 打开 DevTools → Network 查看响应内容，刷新页面可看到区块分阶段到达
          </p>
        </div>

        <FastBlock />
        <Suspense
          fallback={<div className="stream-skeleton">🕐 Banner 区块加载中…</div>}
        >
          <SlowBanner />
        </Suspense>
        <Suspense
          fallback={<div className="stream-skeleton">🕐 列表区块加载中…</div>}
        >
          <SlowList />
        </Suspense>

        <Link href="/" className="backLink">
          ← 返回首页
        </Link>
      </main>
    </div>
  )
}
