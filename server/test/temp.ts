import { Prop } from '@typegoose/typegoose'

// 子分类
// 属于一个子节点
// 不会生成一个表
class SubCategory {
  @Prop()
  name: string
}

export class Category {
  @Prop({ required: true })
  name!: string

  @Prop({ type: () => SubCategory })
  children: SubCategory[]
}
