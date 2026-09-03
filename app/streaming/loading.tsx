// 页面级加载态：目录下的页面在服务端渲染完成前，先展示此 UI
export default function StreamingLoading() {
  return (
    <div className="container">
      <main className="main">
        <h1 className="title">流式渲染 (Streaming SSR)</h1>
        <p className="description">
          正在等待服务端渲染页面内容…
        </p>

        <div className="card">
          <h2>loading.tsx 加载态</h2>
          <p>
            这是 <code>app/streaming/loading.tsx</code>。页面 HTML 真正就绪后会被
            替换为完整内容。
          </p>
        </div>

        <div className="stream-block stream-fast">
          <h3>⚡ 骨架内容</h3>
          <p>以下为占位骨架，实际内容将流式呈现…</p>
        </div>
        <div className="stream-skeleton">🕐 加载中…</div>
        <div className="stream-skeleton">🕐 加载中…</div>
      </main>
    </div>
  )
}
