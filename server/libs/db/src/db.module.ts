import { Global, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { DbService } from './db.service';
import { Category } from './models/Category.model';

const models = TypegooseModule.forFeature([Category]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://localhost:27017/midnight-novel-db',
      }),
    }),

    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
