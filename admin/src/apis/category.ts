import http from '@/utils/http'
import { Kind, Category } from '@/interface/data-model'

// 种类
// 创建/更新 种类
export async function apiUpdateKind(params: Kind): Promise<void> {
  const { _id, name, description } = params
  if (_id) {
    return await http.patch(`/kind/${_id}`, { name, description })
  } else {
    return await http.post('/kind', { name, description })
  }
}

// 删除种类
export async function apiRemoveKind(id: string): Promise<string> {
  return await http.delete(`/kind/${id}`)
}

// 获取种类列表
export async function apiGetKinds(): Promise<{ list: Kind[] }> {
  const url = '/kind'
  return await http.get(url)
}

// 分类
// 获取分类列表
export async function apiGetCategories(params?: { page?: number; pageSize?: number }): Promise<{ list: Category[]; total: number }> {
  const url = '/category'
  return await http.get(url, { params })
}

export async function apiCreateCategory(params: Category): Promise<string> {
  const url = '/category'
  return await http.post(url, params)
}

export async function apiUpdateCategory(params: Category): Promise<unknown> {
  const { _id, ...rest } = params
  const url = `/category/${_id}`
  return await http.patch(url, { ...rest })
}

export async function apiRemoveCategory(id: string): Promise<void> {
  const url = `/category/${id}`
  return await http.delete(url)
}
