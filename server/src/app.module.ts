import { Module } from '@nestjs/common'
import { DbModule } from '@app/db'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AdminModule } from './admin/admin.module'
import { WebModule } from './web/web.module'
import configuration from 'configuration'

@Module({
  imports: [configuration(), DbModule, AdminModule, WebModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
