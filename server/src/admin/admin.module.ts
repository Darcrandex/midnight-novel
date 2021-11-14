import { Module } from '@nestjs/common'
import { CategoryModule } from './category/category.module'
import { NovelModule } from './novel/novel.module'
import { ChapterModule } from './chapter/chapter.module'
import { KindModule } from './kind/kind.module'

@Module({
  imports: [CategoryModule, NovelModule, ChapterModule, KindModule],
})
export class AdminModule {}
