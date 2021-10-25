import { Prop, Severity, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
    customName: 'notification',
  },
})
export class Category {
  @Prop({ required: true })
  name: string;

  children: string[];
}
