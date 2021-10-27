import { Prop, Ref } from '@typegoose/typegoose'
import { Novel } from './novel.model'

export class Chapter {
  // 关联的小说
  @Prop({ required: true, ref: () => Novel })
  novel: Ref<Novel>

  @Prop()
  title: string

  @Prop()
  content: string
}
