'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addPost } from '@/lib/data'

/**
 * Server Action：在服务器上执行表单逻辑（校验、写入、缓存刷新、跳转）
 * 不会把业务代码与数据访问逻辑暴露到客户端
 */
export async function createPost(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim()
  const content = String(formData.get('content') ?? '').trim()
  const author = String(formData.get('author') ?? '').trim()
  const tagsRaw = String(formData.get('tags') ?? '').trim()

  // 服务端校验
  if (!title || !content) {
    redirect('/form?error=1')
  }

  const tags = tagsRaw
    ? tagsRaw
        .split(/[,，]/)
        .map((tag) => tag.trim())
        .filter(Boolean)
    : []

  // 写入共享数据（内存演示；生产项目请替换为数据库写入）
  addPost({ title, content, author: author || '匿名', tags })

  // 使 /posts 列表页缓存失效，下次访问重新生成
  revalidatePath('/posts')
  redirect('/posts')
}
