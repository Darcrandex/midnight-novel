import { Global, Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { DbService } from './db.service'
import configuration from 'configuration'

import { Novel } from './models/novel.model'
import { Chapter } from './models/chapter.model'

const models = TypegooseModule.forFeature([Novel, Chapter])

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
