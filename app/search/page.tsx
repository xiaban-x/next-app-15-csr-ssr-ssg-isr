import Link from 'next/link'
import { users } from '@/lib/data'

export const metadata = {
  title: 'URL 状态搜索演示',
  description: 'searchParams 驱动的用户搜索与角色过滤 - 链接即状态',
}

// searchParams 是异步的（Next.js 15）：await 后使用
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; role?: string }>
}) {
  const params = await searchParams
  const q = (params.q ?? '').trim().toLowerCase()
  const role = params.role ?? ''

  // 服务端过滤：支持关键词（姓名/邮箱）+ 角色
  const filtered = users.filter((user) => {
    const matchRole = !role || user.role === role
    const matchQ =
      !q ||
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q)
    return matchRole && matchQ
  })

  const buildQuery = (next: { q?: string; role?: string }) => {
    const sp = new URLSearchParams()
    const qq = next.q !== undefined ? next.q : q
    const rr = next.role !== undefined ? next.role : role
    if (qq) sp.set('q', qq)
    if (rr) sp.set('role', rr)
    const s = sp.toString()
    return `/search${s ? `?${s}` : ''}`
  }

  const roleTabs = [
    { value: '', label: '全部' },
    { value: 'admin', label: '管理员' },
    { value: 'moderator', label: '版主' },
    { value: 'user', label: '普通用户' },
  ]

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">URL 状态搜索</h1>
        <p className="description">
          关键词与角色筛选都编码在 URL 中，可分享、可收藏、无 JS 可用
        </p>

        <div className="card">
          <h2>过滤条件</h2>

          {/* GET 表单：提交后以 ?q=&role= 形式刷新页面（服务端重新过滤） */}
          <form action="/search" method="get" className="search-tools">
            <div className="form-group search-form-item">
              <label htmlFor="q">关键词</label>
              <input
                id="q"
                name="q"
                type="search"
                defaultValue={q}
                placeholder="搜索姓名或邮箱…"
                className="form-input"
              />
            </div>
            <div className="form-group search-form-item">
              <label htmlFor="role">角色</label>
              <select id="role" name="role" defaultValue={role} className="form-select">
                <option value="">全部角色</option>
                <option value="admin">admin</option>
                <option value="moderator">moderator</option>
                <option value="user">user</option>
              </select>
            </div>
            <button type="submit" className="preset-btn search-submit">
              搜索
            </button>
          </form>

          {/* 链接式角色 Tab：点击即改变 URL 并重新渲染 */}
          <div className="search-tabs">
            {roleTabs.map((tab) => (
              <Link
                key={tab.value}
                href={buildQuery({ role: tab.value })}
                className={`search-tab ${role === tab.value ? 'active' : ''}`}
              >
                {tab.label}
              </Link>
            ))}
            {q && (
              <Link href={buildQuery({ q: '' })} className="search-clear">
                ✕ 清除关键词「{q}」
              </Link>
            )}
          </div>
        </div>

        <div className="card">
          <h2>筛选结果（{filtered.length} / {users.length}）</h2>
          {filtered.length === 0 ? (
            <p className="card-tip">没有匹配的用户，换个条件试试</p>
          ) : (
            <ul className="result-list">
              {filtered.map((user) => (
                <li key={user.id} className="result-item">
                  <span className="result-name">{user.name}</span>
                  <span className="result-email">{user.email}</span>
                  <span className={`role-chip role-${user.role}`}>{user.role}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2>本页演示了什么</h2>
          <ul>
            <li>
              <strong>searchParams:</strong> 服务端组件 <code>await searchParams</code>{' '}
              读取 URL 状态并完成过滤（无客户端 fetch）
            </li>
            <li>
              <strong>GET 表单:</strong> 提交后 query 写入地址栏，刷新即重新过滤
            </li>
            <li>
              <strong>链接驱动 UI:</strong> 角色 Tab 是普通 <code>Link</code>，
              浏览器前进/后退都能正确还原筛选状态
            </li>
          </ul>
          <p className="card-tip">
            试试：<code>/search?q=张&amp;role=admin</code> 分享给同事打开，结果一致
          </p>
        </div>

        <Link href="/" className="backLink">
          ← 返回首页
        </Link>
      </main>
    </div>
  )
}
