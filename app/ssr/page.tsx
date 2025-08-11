import Link from 'next/link'

export const metadata = {
  title: 'SSR 测试页面 - App Router',
  description: '服务端渲染测试页面 - Next.js 13 App Router',
}

// 强制动态渲染
export const dynamic = 'force-dynamic'

// 模拟数据获取函数，每次请求都执行
async function getData() {
  // 在 App Router 中，通过 cache: 'no-store' 或 dynamic = 'force-dynamic' 实现 SSR
  const data = {
    randomNumber: Math.floor(Math.random() * 1000),
    fetchTime: new Date().toISOString(),
    message: "这是服务器端获取的数据 (App Router SSR)"
  }

  const serverTime = new Date().toISOString()
  const requestTime = new Date().toISOString()

  // 模拟 API 调用延迟
  await new Promise(resolve => setTimeout(resolve, 500))

  return {
    data,
    serverTime,
    requestTime
  }
}

export default async function SSRPage() {
  const { data, serverTime, requestTime } = await getData()

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
          SSR (Server Side Rendering) 测试页面
        </h1>
        <p className="pageInfo">
          App Router 版本
        </p>

        <div className="card">
          <h2>页面信息</h2>
          <p><strong>渲染模式:</strong> 服务端渲染 (SSR)</p>
          <p><strong>服务器时间:</strong> {serverTime}</p>
          <p><strong>请求时间:</strong> {requestTime}</p>
          <p><strong>数据获取时间:</strong> {data.fetchTime}</p>
          <p><strong>随机数据:</strong> {data.randomNumber}</p>
          <p><strong>说明:</strong> 此页面在每次请求时在服务器渲染</p>
        </div>

        <div className="card">
          <h2>SSR 特点</h2>
          <ul>
            <li>✅ SEO 友好</li>
            <li>✅ 首屏加载快</li>
            <li>✅ 每次请求都是最新数据</li>
            <li>✅ 不需要 JavaScript 就能显示内容</li>
            <li>❌ 服务器负载较高</li>
            <li>❌ 响应时间较慢</li>
            <li>❌ 不适合高并发场景</li>
          </ul>
        </div>

        <div className="card">
          <h2>App Router 中的 SSR</h2>
          <p>在 App Router 中，可以通过多种方式实现 SSR：</p>
          <ul>
            <li><strong>dynamic 配置:</strong> export const dynamic = 'force-dynamic'</li>
            <li><strong>fetch 选项:</strong> fetch(url, {`{ cache: 'no-store' }`})</li>
            <li><strong>请求对象:</strong> 使用 cookies()、headers() 等</li>
          </ul>
          <pre className="codeBlock">
{`// App Router SSR 示例方法1
export const dynamic = 'force-dynamic'

export default async function Page() {
  const data = await fetch('https://api.example.com/data')
  return <div>{/* 渲染数据 */}</div>
}

// 方法2：使用 no-store
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store'
  })
  return <div>{/* 渲染数据 */}</div>
}`}
          </pre>
        </div>

        <div className="card">
          <h2>测试说明</h2>
          <p>每次刷新页面，都会看到不同的随机数据和时间戳，因为页面在服务器端重新渲染。</p>
          <p>你可以尝试：</p>
          <ul>
            <li>刷新页面查看数据变化</li>
            <li>禁用 JavaScript 查看页面是否正常显示</li>
            <li>查看页面源码，确认内容已预渲染</li>
          </ul>
        </div>

        <Link href="/" className="backLink">
          ← 返回首页
        </Link>
      </main>
    </div>
  )
}