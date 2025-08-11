import Link from 'next/link'

export const metadata = {
  title: 'ISR 测试页面 - App Router',
  description: '增量静态再生测试页面 - Next.js 13 App Router',
}

// 模拟数据获取函数，使用 revalidate
async function getData() {
  // 在 App Router 中，通过 next 选项设置 revalidate 来实现 ISR
  const data = {
    randomNumber: Math.floor(Math.random() * 1000),
    fetchTime: new Date().toISOString(),
    message: "这是 ISR 获取的数据 (App Router)"
  }

  const buildTime = new Date().toISOString()
  const revalidateTime = new Date().toISOString()

  return {
    data,
    buildTime,
    revalidateTime
  }
}

// 设置页面级别的 revalidate
export const revalidate = 10 // 10秒后重新验证

export default async function ISRPage() {
  const { data, buildTime, revalidateTime } = await getData()

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
          ISR (Incremental Static Regeneration) 测试页面
        </h1>
        <p className="pageInfo">
          App Router 版本
        </p>

        <div className="card">
          <h2>页面信息</h2>
          <p><strong>渲染模式:</strong> 增量静态再生 (ISR)</p>
          <p><strong>构建时间:</strong> {buildTime}</p>
          <p><strong>重新验证时间:</strong> {revalidateTime}</p>
          <p><strong>数据获取时间:</strong> {data.fetchTime}</p>
          <p><strong>随机数据:</strong> {data.randomNumber}</p>
          <p><strong>重新生成间隔:</strong> 10 秒</p>
          <p><strong>说明:</strong> 此页面静态生成，但会定时更新</p>
        </div>

        <div className="card">
          <h2>ISR 特点</h2>
          <ul>
            <li>✅ 静态生成，访问速度快</li>
            <li>✅ 可以部署到 CDN</li>
            <li>✅ SEO 友好</li>
            <li>✅ 数据会定时更新</li>
            <li>✅ 平衡了性能和新鲜度</li>
            <li>❌ 更新有延迟（取决于 revalidate 时间）</li>
          </ul>
        </div>

        <div className="card">
          <h2>App Router 中的 ISR</h2>
          <p>在 App Router 中，ISR 可以通过多种方式实现：</p>
          <ul>
            <li><strong>页面级别:</strong> export const revalidate = 60</li>
            <li><strong>请求级别:</strong> fetch(url, {`{ next: { revalidate: 60 } }`})</li>
            <li><strong>路由段级别:</strong> 在 layout 或 page 中设置</li>
          </ul>
          <pre className="codeBlock">
{`// App Router ISR 示例
export const revalidate = 60 // 60秒重新验证

export default async function Page() {
  // 或者在 fetch 中设置
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 }
  })
  return <div>{/* 渲染数据 */}</div>
}`}
          </pre>
        </div>

        <div className="card">
          <h2>测试说明</h2>
          <p>这个页面使用 ISR 模式，具有以下特点：</p>
          <ul>
            <li>首次访问时静态生成页面</li>
            <li>10秒后再次访问会触发重新生成</li>
            <li>重新生成期间，用户仍能看到旧版本</li>
            <li>生成完成后，新用户会看到更新后的内容</li>
          </ul>
          <p><strong>测试方法：</strong></p>
          <ol>
            <li>访问页面并记录随机数据</li>
            <li>等待 10 秒后刷新页面</li>
            <li>观察数据是否更新</li>
            <li>如果数据没有立即更新，再等待几秒后刷新</li>
          </ol>
        </div>

        <Link href="/" className="backLink">
          ← 返回首页
        </Link>
      </main>
    </div>
  )
}