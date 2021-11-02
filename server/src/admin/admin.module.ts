import { Module } from '@nestjs/common'
import { CategoryModule } from './category/category.module'
import { NovelModule } from './novel/novel.module'
import { ChapterModule } from './chapter/chapter.module'

@Module({
  imports: [CategoryModule, NovelModule, ChapterModule],
})
export class AdminModule {}
