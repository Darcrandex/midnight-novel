import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import * as MAO from 'multer-aliyun-oss'

import { DbModule } from '@app/db'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AdminModule } from './admin/admin.module'
import { WebModule } from './web/web.module'
import configuration from 'configuration'

@Module({
  imports: [
    // env 环境变量配置
    configuration(),

    // 阿里云 oss 配置
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: MAO({
            config: {
              region: process.env.OSS_REGION,
              accessKeyId: process.env.OSS_ACCESS_KEY_ID,
              accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
              bucket: process.env.OSS_BUCKET,
            },
          }),
        }
      },
    }),

    DbModule,
    AdminModule,
    WebModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
