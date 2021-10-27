import { Prop, Ref } from '@typegoose/typegoose'
import { Chapter } from './chapter.model'

export class Novel {
  @Prop({ required: true })
  name!: string

  @Prop()
  author: string

  @Prop()
  cover: string

  @Prop({ type: () => [String] })
  categories: string[]

  // 章节
  // 这里不需要设置 关联的外键
  @Prop({ ref: () => Chapter })
  chapters: Ref<Chapter>[]
}
