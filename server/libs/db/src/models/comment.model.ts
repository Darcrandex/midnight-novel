import { Prop, Ref, modelOptions } from '@typegoose/typegoose'
import { Novel } from './novel.model'
import { Reply } from './reply.model'
import { User } from './user.model'

@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class Comment {
  @Prop({ required: true, ref: () => Novel })
  novel: Ref<Novel>

  @Prop({ required: true, ref: () => User })
  user: Ref<User>

  @Prop()
  content: string

  @Prop({
    ref: () => Reply,
    foreignField: () => 'comment',
    localField: '_id',
    justOne: false,
  })
  public replies?: Ref<Reply>[]
}
