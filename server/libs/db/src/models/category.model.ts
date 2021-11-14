import { Prop, Ref } from '@typegoose/typegoose'
import { Kind } from './kind.model'

// 分类
export class Category {
  @Prop({ required: true })
  name!: string

  @Prop()
  description?: string

  @Prop({ ref: () => Kind })
  kind: Ref<Kind>
}
