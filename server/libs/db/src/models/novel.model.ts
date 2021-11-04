import { Prop, Ref } from '@typegoose/typegoose'
import { Chapter } from './chapter.model'
import { SubCategory } from './category.model'

export class Novel {
  @Prop({ required: true })
  name!: string

  @Prop()
  author: string

  @Prop()
  cover: string

  @Prop({ type: () => [SubCategory], ref: () => SubCategory })
  categories: Ref<SubCategory>[]

  // 章节
  // 这里不需要设置 关联的外键
  @Prop({ ref: () => Chapter })
  chapters: Ref<Chapter>[]
}
