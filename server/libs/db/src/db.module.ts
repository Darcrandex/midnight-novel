import { Global, Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { DbService } from './db.service'
import configuration from 'configuration'

import { Kind } from './models/kind.model'
import { Category } from './models/category.model'
import { Novel } from './models/novel.model'
import { Chapter } from './models/chapter.model'
import { User } from './models/user.model'
import { Comment } from './models/comment.model'
import { Reply } from './models/reply.model'

const models = TypegooseModule.forFeature([
  User,
  Kind,
  Category,
  Novel,
  Chapter,
  Comment,
  Reply,
])

@Global()
@Module({
  imports: [
    configuration(),
    TypegooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DATA_BASE_URI,
      }),
    }),

    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
