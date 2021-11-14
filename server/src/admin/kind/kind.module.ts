import { Module } from '@nestjs/common'
import { KindController } from './kind.controller'

@Module({
  controllers: [KindController],
})
export class KindModule {}
