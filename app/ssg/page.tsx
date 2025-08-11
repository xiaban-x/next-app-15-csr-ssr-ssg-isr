import Link from 'next/link'

export const metadata = {
  title: 'SSG 测试页面 - App Router',
  description: '静态站点生成测试页面 - Next.js 13 App Router',
}

// 模拟数据获取函数
async function getData() {
  // 在 App Router 中，默认情况下 fetch 会被缓存（类似于 SSG）
  const data = {
    randomNumber: Math.floor(Math.random() * 1000),
    fetchTime: new Date().toISOString(),
    message: "这是构建时获取的数据 (App Router SSG)"
  }

  const buildTime = new Date().toISOString()

  return {
    data,
    buildTime
  }
}

export default async function SSGPage() {
  const { data, buildTime } = await getData()

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
          SSG (Static Site Generation) 测试页面
        </h1>
        <p className="pageInfo">
          App Router 版本
        </p>

        <div className="card">
          <h2>页面信息</h2>
          <p><strong>渲染模式:</strong> 静态站点生成 (SSG)</p>
          <p><strong>构建时间:</strong> {buildTime}</p>
          <p><strong>数据获取时间:</strong> {data.fetchTime}</p>
          <p><strong>随机数据:</strong> {data.randomNumber}</p>
          <p><strong>说明:</strong> 此页面在构建时预渲染，访问速度最快</p>
        </div>

        <div className="card">
          <h2>SSG 特点</h2>
          <ul>
            <li>✅ 构建时预渲染，访问速度最快</li>
            <li>✅ 可以部署到 CDN</li>
            <li>✅ SEO 友好</li>
            <li>❌ 数据在构建时固定</li>
            <li>❌ 不适合频繁变化的内容</li>
          </ul>
        </div>

        <div className="card">
          <h2>App Router 中的 SSG</h2>
          <p>在 App Router 中，SSG 是默认行为：</p>
          <ul>
            <li>组件默认在服务器端渲染</li>
            <li>fetch 请求默认被缓存</li>
            <li>页面在构建时生成静态 HTML</li>
            <li>不需要特殊的 API（如 getStaticProps）</li>
          </ul>
          <pre className="codeBlock">
{`// App Router SSG 示例
export default async function Page() {
  // 默认情况下，这个 fetch 会被缓存
  const data = await fetch('https://api.example.com/data')
  return <div>{/* 渲染数据 */}</div>
}`}
          </pre>
        </div>

        <Link href="/" className="backLink">
          ← 返回首页
        </Link>
      </main>
    </div>
  )
}