import { Controller, Post, Body } from '@nestjs/common'
import { Chapter } from '@app/db/models/chapter.model'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { Novel } from '@app/db/models/novel.model'

@Controller('chapter')
export class ChapterController {
  constructor(
    @InjectModel(Chapter)
    private readonly chapterModel: ReturnModelType<typeof Chapter>,
    @InjectModel(Novel)
    private readonly novelModel: ReturnModelType<typeof Novel>,
  ) {}

  @Post()
  async create(@Body() dto: Partial<Chapter>) {
    // 先创建章节
    const record = await this.chapterModel.create(dto)

    // 然后把这个章节关联到章节目录中
    await this.novelModel.findByIdAndUpdate(dto.novel, {
      $set: { chapters: record._id },
    })
    return { code: 2000, record }
  }
}
