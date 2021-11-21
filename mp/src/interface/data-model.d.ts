// 种类
export interface Kind {
  _id: string;
  name: string;
  description?: string;
  categories?: Category[];
}

// 分类
export interface Category {
  _id: string;
  name: string;
  description?: string;
  kind?: Kind["_id"] | Kind;
}

export interface Novel {
  _id: string;
  name: string;
  author: string;
  description?: string;
  categories: Category[];
  cover?: string;
  score?: number;
  rank?: number;
  readingCount?: number; // 在读人数
}

export interface Chapter {
  _id: string;
  title: string;
}
