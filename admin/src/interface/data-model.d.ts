// 种类
export interface Kind {
  _id?: string
  name: string
  description?: string
  categories?: Category[]
}

// 分类
export interface Category {
  _id?: string
  name: string
  description?: string
  kind?: Kind['_id'] | Kind
}

export interface Novel {
  name: string
  author: string
  categories: string[]
  cover?: string
}

export interface Chapter {
  _id?: string
  title: string
}
