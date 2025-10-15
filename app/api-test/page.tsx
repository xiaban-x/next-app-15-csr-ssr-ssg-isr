'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ApiTestPage() {
  const [url, setUrl] = useState('')
  const [method, setMethod] = useState('GET')
  const [headers, setHeaders] = useState([{ key: '', value: '' }])
  const [body, setBody] = useState('')
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }])
  }

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index))
  }

  const updateHeader = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...headers]
    newHeaders[index][field] = value
    setHeaders(newHeaders)
  }

  const sendRequest = async () => {
    if (!url) {
      setError('请输入 URL')
      return
    }

    setLoading(true)
    setError('')
    setResponse(null)

    try {
      const requestHeaders: Record<string, string> = {}
      headers.forEach(header => {
        if (header.key && header.value) {
          requestHeaders[header.key] = header.value
        }
      })

      const requestOptions: RequestInit = {
        method,
        headers: requestHeaders,
      }

      if (method !== 'GET' && method !== 'HEAD' && body) {
        requestOptions.body = body
      }

      const startTime = Date.now()
      const res = await fetch(url, requestOptions)
      const endTime = Date.now()

      const responseHeaders: Record<string, string> = {}
      res.headers.forEach((value, key) => {
        responseHeaders[key] = value
      })

      let responseBody = ''
      const contentType = res.headers.get('content-type')
      
      if (contentType?.includes('application/json')) {
        try {
          responseBody = await res.json()
        } catch {
          responseBody = await res.text()
        }
      } else {
        responseBody = await res.text()
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: responseHeaders,
        body: responseBody,
        time: endTime - startTime,
        url: res.url,
        ok: res.ok
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : '请求失败')
    } finally {
      setLoading(false)
    }
  }

  const loadPreset = (preset: string) => {
    switch (preset) {
      case 'jsonplaceholder':
        setUrl('https://jsonplaceholder.typicode.com/posts/1')
        setMethod('GET')
        setHeaders([{ key: 'Content-Type', value: 'application/json' }])
        setBody('')
        break
      case 'post-example':
        setUrl('https://jsonplaceholder.typicode.com/posts')
        setMethod('POST')
        setHeaders([{ key: 'Content-Type', value: 'application/json' }])
        setBody(JSON.stringify({
          title: 'foo',
          body: 'bar',
          userId: 1
        }, null, 2))
        break
      case 'local-api':
        setUrl('/api/test')
        setMethod('GET')
        setHeaders([{ key: 'Content-Type', value: 'application/json' }])
        setBody('')
        break
    }
  }

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">API 测试工具</h1>
        <p className="description">
          一个功能完整的 API 测试工具，支持多种 HTTP 方法和请求配置
        </p>

        <div className="card">
          <h2>快速开始</h2>
          <div className="preset-buttons">
            <button 
              className="preset-btn" 
              onClick={() => loadPreset('jsonplaceholder')}
            >
              JSONPlaceholder GET
            </button>
            <button 
              className="preset-btn" 
              onClick={() => loadPreset('post-example')}
            >
              JSONPlaceholder POST
            </button>
            <button 
              className="preset-btn" 
              onClick={() => loadPreset('local-api')}
            >
              本地 API 测试
            </button>
          </div>
        </div>

        <div className="card">
          <h2>请求配置</h2>
          
          <div className="form-group">
            <label htmlFor="method">HTTP 方法</label>
            <select 
              id="method" 
              value={method} 
              onChange={(e) => setMethod(e.target.value)}
              className="form-select"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
              <option value="HEAD">HEAD</option>
              <option value="OPTIONS">OPTIONS</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="url">请求 URL</label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://api.example.com/endpoint"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>请求头</label>
            {headers.map((header, index) => (
              <div key={index} className="header-row">
                <input
                  type="text"
                  placeholder="Header Name"
                  value={header.key}
                  onChange={(e) => updateHeader(index, 'key', e.target.value)}
                  className="form-input header-input"
                />
                <input
                  type="text"
                  placeholder="Header Value"
                  value={header.value}
                  onChange={(e) => updateHeader(index, 'value', e.target.value)}
                  className="form-input header-input"
                />
                <button 
                  type="button" 
                  onClick={() => removeHeader(index)}
                  className="remove-btn"
                >
                  ✕
                </button>
              </div>
            ))}
            <button type="button" onClick={addHeader} className="add-btn">
              + 添加请求头
            </button>
          </div>

          {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
            <div className="form-group">
              <label htmlFor="body">请求体</label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="请求体内容 (JSON, XML, 文本等)"
                className="form-textarea"
                rows={6}
              />
            </div>
          )}

          <button 
            onClick={sendRequest} 
            disabled={loading || !url}
            className="send-btn"
          >
            {loading ? '发送中...' : '发送请求'}
          </button>
        </div>

        {error && (
          <div className="card error-card">
            <h2>错误信息</h2>
            <div className="error-message">{error}</div>
          </div>
        )}

        {response && (
          <div className="card">
            <h2>响应结果</h2>
            
            <div className="response-info">
              <div className="status-info">
                <span className={`status-code ${response.ok ? 'success' : 'error'}`}>
                  {response.status} {response.statusText}
                </span>
                <span className="response-time">{response.time}ms</span>
              </div>
              <div className="response-url">{response.url}</div>
            </div>

            <div className="response-section">
              <h3>响应头</h3>
              <div className="code-block">
                {Object.entries(response.headers).map(([key, value]) => (
                  <div key={key} className="header-item">
                    <strong>{key}:</strong> {value as string}
                  </div>
                ))}
              </div>
            </div>

            <div className="response-section">
              <h3>响应体</h3>
              <div className="code-block">
                {typeof response.body === 'string' 
                  ? response.body 
                  : JSON.stringify(response.body, null, 2)
                }
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <h2>使用说明</h2>
          <ul>
            <li><strong>HTTP 方法:</strong> 选择对应的 HTTP 方法 (GET, POST, PUT, DELETE 等)</li>
            <li><strong>URL:</strong> 输入完整的 API 端点地址</li>
            <li><strong>请求头:</strong> 添加必要的请求头，如 Content-Type, Authorization 等</li>
            <li><strong>请求体:</strong> 对于 POST/PUT/PATCH 请求，可以添加请求体内容</li>
            <li><strong>响应信息:</strong> 查看状态码、响应头、响应体和请求耗时</li>
          </ul>
        </div>

        <Link href="/" className="backLink">
          ← 返回首页
        </Link>
      </main>
    </div>
  )
}
