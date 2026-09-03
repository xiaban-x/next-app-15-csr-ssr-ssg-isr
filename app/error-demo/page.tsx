'use client'

import { useState } from 'react'
import Link from 'next/link'

// 注意：'use client' 组件不能导出 metadata（metadata 仅支持 Server Component）
export default function ErrorDemoPage() {
  const [boom, setBoom] = useState(false)

  // 在渲染阶段抛错，才能被 error.tsx（route segment 错误边界）捕获
  if (boom) {
    throw new Error('演示错误：这是点击按钮后在渲染阶段抛出的异常')
  }

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">错误边界 (error.tsx)</h1>
        <p className="description">
          路由段内抛出的错误由最近的 error.tsx 捕获，并支持「重试」恢复
        </p>

        <div className="card">
          <h2>触发错误</h2>
          <p>
            点击下面的按钮会让组件在渲染阶段抛出一个异常，随后本页被{' '}
            <code>app/error-demo/error.tsx</code> 的 UI 替换（不会白屏）。
          </p>
          <button type="button" onClick={() => setBoom(true)} className="send-btn demo-error-btn">
            💥 触发一个渲染错误
          </button>
        </div>

        <div className="card">
          <h2>工作原理</h2>
          <ul>
            <li>
              <strong>渲染错误:</strong> 服务端/客户端组件渲染抛错时，Next.js
              向上寻找最近的 <code>error.tsx</code> 边界
            </li>
            <li>
              <strong>作用范围:</strong> 只影响当前 route segment（本目录），
              布局与其他页面不受影响
            </li>
            <li>
              <strong>恢复:</strong> 边界内的「重试」按钮调用 <code>reset()</code>{' '}
              重新渲染出错段（本例重挂载后状态归零，页面恢复）
            </li>
            <li>
              <strong>区别 not-found:</strong> 404 用 <code>notFound()</code>，
              运行时异常才走 error 边界
            </li>
          </ul>
        </div>

        <Link href="/" className="backLink">
          ← 返回首页
        </Link>
      </main>
    </div>
  )
}
