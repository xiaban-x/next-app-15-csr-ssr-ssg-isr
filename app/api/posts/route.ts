import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts, addPost } from '@/lib/data'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const delay = searchParams.get('delay')

  // 模拟延迟
  if (delay) {
    const delayMs = parseInt(delay)
    if (!isNaN(delayMs) && delayMs > 0 && delayMs <= 5000) {
      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }

  const posts = getAllPosts()

  return NextResponse.json({
    posts,
    total: posts.length,
    timestamp: new Date().toISOString(),
    delay: delay ? `${delay}ms` : 'none',
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 简单的验证
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 },
      )
    }

    // 写入共享数据（开发环境内存演示）
    const newPost = addPost({
      title: body.title,
      content: body.content,
      author: body.author || 'Anonymous',
      tags: body.tags || [],
    })

    return NextResponse.json(
      { message: 'Post created successfully', post: newPost },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 },
    )
  }
}
