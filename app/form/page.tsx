import Link from 'next/link'
import { createPost } from './actions'

export const metadata = {
  title: 'Server Actions 表单演示',
  description: 'Next.js 15 Server Actions 表单 - 服务端校验与数据写入',
}

export default async function FormPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">Server Actions 表单</h1>
        <p className="description">
          无需手写 API，表单直接调用服务端函数写数据、刷新缓存并跳转
        </p>

        <div className="card">
          <h2>发表一篇文章</h2>

          {error === '1' && (
            <div className="error-message">标题与正文为必填项，请补充后再提交</div>
          )}

          <form action={createPost} className="server-form">
            <div className="form-group">
              <label htmlFor="title">标题 *</label>
              <input
                id="title"
                name="title"
                type="text"
                required
                placeholder="文章标题"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">正文 *</label>
              <textarea
                id="content"
                name="content"
                required
                rows={6}
                placeholder="文章正文内容"
                className="form-textarea"
              />
            </div>

            <div className="form-row">
              <div className="form-group form-row-item">
                <label htmlFor="author">作者</label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  placeholder="留空则为「匿名」"
                  className="form-input"
                />
              </div>
              <div className="form-group form-row-item">
                <label htmlFor="tags">标签（逗号分隔）</label>
                <input
                  id="tags"
                  name="tags"
                  type="text"
                  placeholder="如：Next.js, React"
                  className="form-input"
                />
              </div>
            </div>

            <button type="submit" className="send-btn">
              提交（服务端写入）
            </button>
          </form>
        </div>

        <div className="card">
          <h2>这个表单演示了什么</h2>
          <ul>
            <li>
              <strong>Server Action:</strong> <code>app/form/actions.ts</code>{' '}
              里的 <code>createPost</code> 在服务器执行：取值、校验、写入{' '}
              <code>lib/data.ts</code>
            </li>
            <li>
              <strong>缓存刷新:</strong> 写入后调用 <code>revalidatePath(&apos;/posts&apos;)</code>{' '}
              让文章列表页下次访问时重新生成
            </li>
            <li>
              <strong>提交后跳转:</strong> <code>redirect(&apos;/posts&apos;)</code>{' '}
              直接进入新发布的文章列表
            </li>
            <li>
              <strong>无 JS 可用:</strong> 即使禁用浏览器 JavaScript，表单也能正常提交
            </li>
          </ul>
          <p className="card-tip">
            💡 若提交失败时想保留已填写内容，可改用客户端{' '}
            <code>useActionState</code> 组合模式（本页为最小演示）
          </p>
        </div>

        <Link href="/" className="backLink">
          ← 返回首页
        </Link>
      </main>
    </div>
  )
}
