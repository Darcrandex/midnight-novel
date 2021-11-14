// 种类
export interface Kind {
  _id?: string
  name: string
  description?: string
}

// 分类
export interface Category {
  _id?: string
  name: string
  description?: string
  kind?: Kind['_id'] | Kind
}
