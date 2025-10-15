import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const delay = searchParams.get('delay')
  
  // 模拟延迟
  if (delay) {
    const delayMs = parseInt(delay)
    if (!isNaN(delayMs) && delayMs > 0 && delayMs <= 5000) {
      await new Promise(resolve => setTimeout(resolve, delayMs))
    }
  }

  const posts = [
    {
      id: 1,
      title: 'Next.js 15 新特性介绍',
      content: 'Next.js 15 带来了许多令人兴奋的新特性...',
      author: '张三',
      createdAt: '2024-01-15T10:00:00Z',
      tags: ['Next.js', 'React', 'JavaScript']
    },
    {
      id: 2,
      title: 'App Router vs Pages Router',
      content: 'App Router 是 Next.js 13+ 引入的新路由系统...',
      author: '李四',
      createdAt: '2024-01-14T15:30:00Z',
      tags: ['Next.js', 'Routing', 'Tutorial']
    },
    {
      id: 3,
      title: 'React Server Components 详解',
      content: 'React Server Components 允许在服务器上渲染组件...',
      author: '王五',
      createdAt: '2024-01-13T09:15:00Z',
      tags: ['React', 'Server Components', 'Performance']
    }
  ]

  return NextResponse.json({
    posts,
    total: posts.length,
    timestamp: new Date().toISOString(),
    delay: delay ? `${delay}ms` : 'none'
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 简单的验证
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // 模拟创建文章
    const newPost = {
      id: Math.floor(Math.random() * 1000) + 100,
      title: body.title,
      content: body.content,
      author: body.author || 'Anonymous',
      createdAt: new Date().toISOString(),
      tags: body.tags || []
    }

    return NextResponse.json({
      message: 'Post created successfully',
      post: newPost
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 }
    )
  }
}
