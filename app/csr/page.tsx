'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// CSR - 客户端渲染，使用 'use client' 指令
export default function CSRPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [clientTime, setClientTime] = useState<string | null>(null)

  useEffect(() => {
    // 模拟客户端数据获取
    const fetchData = async () => {
      setLoading(true)
      
      // 模拟 API 调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockData = {
        randomNumber: Math.floor(Math.random() * 1000),
        fetchTime: new Date().toISOString(),
        message: "这是客户端获取的数据 (App Router CSR)"
      }
      
      setData(mockData)
      setClientTime(new Date().toISOString())
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
          CSR (Client Side Rendering) 测试页面
        </h1>
        <p className="pageInfo">
          App Router 版本
        </p>

        <div className="card">
          <h2>页面信息</h2>
          <p><strong>渲染模式:</strong> 客户端渲染 (CSR)</p>
          <p><strong>客户端时间:</strong> {clientTime || '加载中...'}</p>
          {loading ? (
            <p><strong>状态:</strong> 正在加载数据...</p>
          ) : (
            <>
              <p><strong>数据获取时间:</strong> {data?.fetchTime}</p>
              <p><strong>随机数据:</strong> {data?.randomNumber}</p>
              <p><strong>说明:</strong> 此页面在客户端动态渲染</p>
            </>
          )}
        </div>

        <div className="card">
          <h2>CSR 特点</h2>
          <ul>
            <li>✅ 高度交互性</li>
            <li>✅ 实时数据更新</li>
            <li>✅ 减少服务器负载</li>
            <li>❌ 首屏加载较慢</li>
            <li>❌ SEO 不友好</li>
            <li>❌ 需要 JavaScript 才能显示内容</li>
          </ul>
        </div>

        <div className="card">
          <h2>App Router 中的 CSR</h2>
          <p>在 App Router 中，客户端渲染需要使用 'use client' 指令：</p>
          <ul>
            <li><strong>'use client' 指令:</strong> 标记组件为客户端组件</li>
            <li><strong>React Hooks:</strong> 可以使用 useState, useEffect 等</li>
            <li><strong>浏览器 API:</strong> 可以访问 window, document 等</li>
            <li><strong>事件处理:</strong> 可以处理用户交互事件</li>
          </ul>
          <pre className="codeBlock">
{`// App Router CSR 示例
'use client'

import { useState, useEffect } from 'react'

export default function Page() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    // 客户端数据获取
    fetch('/api/data').then(res => res.json()).then(setData)
  }, [])
  
  return <div>{/* 渲染数据 */}</div>
}`}
          </pre>
        </div>

        <div className="card">
          <h2>交互测试</h2>
          <button 
            onClick={() => {
              setData({
                randomNumber: Math.floor(Math.random() * 1000),
                fetchTime: new Date().toISOString(),
                message: "这是重新获取的数据 (App Router)"
              })
            }}
            className="button"
          >
            重新获取数据
          </button>
        </div>

        <div className="card">
          <h2>服务端组件 vs 客户端组件</h2>
          <table className="table">
            <thead>
              <tr>
                <th>特性</th>
                <th>服务端组件</th>
                <th>客户端组件</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>渲染位置</td>
                <td>服务器</td>
                <td>客户端</td>
              </tr>
              <tr>
                <td>React Hooks</td>
                <td>❌</td>
                <td>✅</td>
              </tr>
              <tr>
                <td>事件处理</td>
                <td>❌</td>
                <td>✅</td>
              </tr>
              <tr>
                <td>浏览器API</td>
                <td>❌</td>
                <td>✅</td>
              </tr>
              <tr>
                <td>JavaScript包大小</td>
                <td>不增加</td>
                <td>增加</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Link href="/" className="backLink">
          ← 返回首页
        </Link>
      </main>
    </div>
  )
}