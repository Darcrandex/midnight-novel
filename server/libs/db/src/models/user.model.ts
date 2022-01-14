import { Prop } from '@typegoose/typegoose'

export class User {
  @Prop()
  nickname: string
}
