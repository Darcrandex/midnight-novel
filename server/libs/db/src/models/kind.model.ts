import { Prop } from '@typegoose/typegoose'

// 种类
export class Kind {
  @Prop({ required: true })
  name!: string

  @Prop()
  description?: string
}
