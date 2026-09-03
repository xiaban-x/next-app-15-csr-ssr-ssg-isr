import { NextRequest, NextResponse } from 'next/server'
import { users } from '@/lib/data'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const role = searchParams.get('role')
  const limit = searchParams.get('limit')

  let filteredUsers = users

  if (role) {
    filteredUsers = users.filter((user) => user.role === role)
  }

  if (limit) {
    const limitNum = parseInt(limit)
    if (!isNaN(limitNum)) {
      filteredUsers = filteredUsers.slice(0, limitNum)
    }
  }

  return NextResponse.json({
    users: filteredUsers,
    total: filteredUsers.length,
    timestamp: new Date().toISOString(),
    filters: { role, limit },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 简单的验证
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 },
      )
    }

    // 模拟创建用户
    const newUser = {
      id: Math.floor(Math.random() * 1000) + 100,
      name: body.name,
      email: body.email,
      role: body.role || 'user',
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(
      { message: 'User created successfully', user: newUser },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 },
    )
  }
}
