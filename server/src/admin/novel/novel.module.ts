import { Module } from '@nestjs/common'
import { NovelController } from './novel.controller'

@Module({
  controllers: [NovelController],
})
export class NovelModule {}
