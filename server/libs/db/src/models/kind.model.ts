import { Prop, Ref, modelOptions } from '@typegoose/typegoose'
import { Category } from './category.model'

// 种类
@modelOptions({
  // 开启虚拟节点的查询
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class Kind {
  @Prop({ required: true })
  name!: string

  @Prop()
  description?: string

  // 关联虚拟节点
  // 找到当前种类下,关联的分类
  @Prop({
    ref: () => Category,
    foreignField: () => 'kind', // 种类在分类中的键
    localField: '_id', // 种类的键
    justOne: false, // 表示是一个数组
  })
  public categories?: Ref<Category>[]
}
