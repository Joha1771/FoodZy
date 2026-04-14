import axiosClient from './axiosClient'
import { buildSupabaseUrl } from '../utils/buildSupabaseQuery'

/**
 * Запросы к таблице blogs.
 * Схема: id, title, content, excerpt, image_url, author, category,
 *        tags, comment_count, created_at
 */

export async function fetchBlogs({ limit = 10, offset = 0, category } = {}) {
  const url = buildSupabaseUrl('blogs', {
    select: 'id,title,excerpt,image_url,author,category,comment_count,created_at',
    filters: category ? { category } : {},
    order: 'created_at.desc',
    limit,
    offset,
  })
  const response = await axiosClient.get(url)
  const contentRange = response.headers['content-range']
  const total = contentRange ? parseInt(contentRange.split('/')[1]) : 0
  return { data: response.data, total }
}

export async function fetchBlogById(id) {
  const url = buildSupabaseUrl('blogs', {
    select: '*',
    filters: { id },
    limit: 1,
  })
  const response = await axiosClient.get(url)
  return response.data[0] ?? null
}
