import { Prop, Ref } from '@typegoose/typegoose'
import { User } from './user.model'

// 基于评论的回复
export class Reply {
  @Prop({ required: true, ref: () => Comment })
  comment: Ref<Comment>

  // 回复的回复
  @Prop({ required: false, ref: () => Reply })
  reply?: Ref<Reply>

  @Prop({ required: true, ref: () => User })
  user: Ref<User>

  @Prop()
  content: string
}
