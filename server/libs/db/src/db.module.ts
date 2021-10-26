import { Global, Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { DbService } from './db.service'
import configuration from 'configuration'

import { Category } from './models/category.model'

const models = TypegooseModule.forFeature([Category])

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
