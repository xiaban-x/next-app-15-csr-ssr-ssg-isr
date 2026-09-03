'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const UTM_PARAMS = [
  { key: 'utm_source', label: '来源 source', example: 'google' },
  { key: 'utm_medium', label: '媒介 medium', example: 'cpc' },
  { key: 'utm_campaign', label: '活动 campaign', example: 'summer_sale' },
  { key: 'utm_term', label: '关键词 term', example: 'nextjs' },
  { key: 'utm_content', label: '内容 content', example: 'banner_top' },
]

/** URL 查询参数 → cookie 名，如 utm_source → vercel-utm-source */
const cookieNameOf = (key: string) => `vercel-utm-${key.replace('utm_', '')}`

function readCookies() {
  if (typeof document === 'undefined') return {} as Record<string, string>
  const result: Record<string, string> = {}
  for (const { key } of UTM_PARAMS) {
    const name = cookieNameOf(key)
    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`))
    if (match) result[key] = decodeURIComponent(match.split('=')[1])
  }
  return result
}

function readQuery() {
  if (typeof window === 'undefined') return {} as Record<string, string>
  const params = new URLSearchParams(window.location.search)
  const result: Record<string, string> = {}
  for (const { key } of UTM_PARAMS) {
    const value = params.get(key)
    if (value) result[key] = value
  }
  return result
}

export default function UtmPage() {
  const [queryUtms, setQueryUtms] = useState<Record<string, string>>({})
  const [cookieUtms, setCookieUtms] = useState<Record<string, string>>({})

  useEffect(() => {
    setQueryUtms(readQuery())
    setCookieUtms(readCookies())
  }, [])

  const go = (utm: string) => {
    // 使用整页跳转模拟"从广告落地页进入"，确保中间件执行并写入 cookie
    window.location.href = `/utm${utm}`
  }

  const rows = (utms: Record<string, string>) =>
    UTM_PARAMS.map(({ key, label }) => (
      <tr key={key}>
        <td>
          <code>{key}</code>
        </td>
        <td>{label}</td>
        <td>
          {utms[key] ? (
            <span className="utm-value">{utms[key]}</span>
          ) : (
            <span className="utm-empty">— 未检测到</span>
          )}
        </td>
      </tr>
    ))

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">UTM 归因演示</h1>
        <p className="description">
          模拟广告渠道访问 → <code>middleware.ts</code> 把 UTM 参数写入 cookie，
          保证站内跳转后归因不丢失
        </p>

        <div className="card">
          <h2>模拟渠道访问</h2>
          <p className="card-tip">
            点击下面的链接会像从外部广告落地一样打开本页并携带 UTM 参数
            （当前地址：<code>/utm?utm_source=google&amp;utm_medium=cpc&amp;utm_campaign=launch</code>）
          </p>
          <div className="preset-buttons">
            <button className="preset-btn" onClick={() => go('?utm_source=google&utm_medium=cpc&utm_campaign=launch')}>
              Google 搜索广告
            </button>
            <button className="preset-btn" onClick={() => go('?utm_source=wechat&utm_medium=social&utm_campaign=article')}>
              微信公众号文章
            </button>
            <button className="preset-btn" onClick={() => go('?utm_source=newsletter&utm_medium=email&utm_campaign=q3_update')}>
              邮件营销
            </button>
            <button className="preset-btn" onClick={() => go('')}>
              不带 UTM 直接访问
            </button>
          </div>
        </div>

        <div className="card">
          <h2>① URL 中的 UTM 参数</h2>
          <p className="card-tip">仅当落地页地址自带 UTM 时存在，站内跳转后即消失</p>
          <table className="utm-table">
            <thead>
              <tr>
                <th>参数</th>
                <th>含义</th>
                <th>当前值</th>
              </tr>
            </thead>
            <tbody>{rows(queryUtms)}</tbody>
          </table>
        </div>

        <div className="card">
          <h2>② Cookie 中已固化的 UTM（中间件写入）</h2>
          <p className="card-tip">
            由 <code>middleware.ts</code> 写入 <code>vercel-utm-*</code> cookie（30
            天有效），跳转到站内任何页面仍可归因到首次来源
          </p>
          <table className="utm-table">
            <thead>
              <tr>
                <th>参数</th>
                <th>含义</th>
                <th>Cookie 值</th>
              </tr>
            </thead>
            <tbody>{rows(cookieUtms)}</tbody>
          </table>
        </div>

        <div className="card">
          <h2>验证步骤</h2>
          <ol className="verify-steps">
            <li>点击上方「Google 搜索广告」按钮进入带 UTM 的落地页</li>
            <li>观察「① URL 参数」与「② Cookie」都已记录 UTM</li>
            <li>跳转到站内其他页面（如 <Link href="/csr">CSR 示例</Link>），URL 中的 UTM 已消失</li>
            <li>再回到本页（不带 UTM 访问），「② Cookie」仍保留归因信息</li>
            <li>打开浏览器 DevTools → Application → Cookies，可见 <code>vercel-utm-*</code> 项</li>
          </ol>
        </div>

        <Link href="/" className="backLink">
          ← 返回首页
        </Link>
      </main>
    </div>
  )
}
