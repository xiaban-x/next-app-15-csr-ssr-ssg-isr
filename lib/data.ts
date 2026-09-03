// 共享 mock 数据：API 路由与页面（SSG/动态路由等）共用，便于演示

export type Post = {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
  tags: string[]
}

export type User = {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'moderator'
}

// posts 使用 let：Server Actions 演示页 /form 会向数组追加新文章
//（开发环境内存演示；真实项目中请替换为数据库写入）
export let posts: Post[] = [
  {
    id: 1,
    title: 'Next.js 15 新特性介绍',
    content:
      'Next.js 15 带来了许多令人兴奋的新特性：Async Request APIs（params、searchParams、cookies 均为异步）、Caching Semantics 更新（fetch 默认不再缓存）、Turbopack 默认用于开发、React 19 支持等。对于从 Pages Router 迁移的开发者来说，App Router 的统一数据获取与缓存模型值得深入学习。',
    author: '张三',
    createdAt: '2024-01-15T10:00:00Z',
    tags: ['Next.js', 'React', 'JavaScript'],
  },
  {
    id: 2,
    title: 'App Router vs Pages Router',
    content:
      'App Router 是 Next.js 13+ 引入的新路由系统，基于 React Server Components。Pages Router 使用 pages/ 目录与 getStaticProps/getServerSideProps，而 App Router 在组件内直接 fetch 数据，配合缓存指令控制渲染方式，并原生支持布局（layout）、加载态（loading）、错误边界（error）等文件约定。',
    author: '李四',
    createdAt: '2024-01-14T15:30:00Z',
    tags: ['Next.js', 'Routing', 'Tutorial'],
  },
  {
    id: 3,
    title: 'React Server Components 详解',
    content:
      'React Server Components 允许在服务器上渲染组件，将数据获取逻辑留在服务端，显著减少发送到浏览器的 JavaScript。客户端组件通过 "use client" 声明，可以管理状态与交互。理解 Server / Client 组件的边界，是掌握 App Router 的关键一步。',
    author: '王五',
    createdAt: '2024-01-13T09:15:00Z',
    tags: ['React', 'Server Components', 'Performance'],
  },
]

// users 保持只读常量（/search 演示页使用）
export const users: User[] = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: 'user' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: 'user' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: 'moderator' },
]

export const getAllPosts = () => posts

export const getPostById = (id: number) => posts.find((post) => post.id === id)

/** 供 /form 的 Server Action 使用：追加文章并返回新文章 */
export const addPost = (post: Omit<Post, 'id' | 'createdAt'>) => {
  const newPost: Post = {
    ...post,
    id: Math.max(...posts.map((p) => p.id), 0) + 1,
    createdAt: new Date().toISOString(),
  }
  posts = [newPost, ...posts]
  return newPost
}

export const getUserByRole = (role?: string) =>
  role ? users.filter((user) => user.role === role) : users
