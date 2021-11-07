import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Query,
  Patch,
  Get,
} from '@nestjs/common'
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
      $addToSet: { chapters: record._id },
    })
    return { code: 2000, data: record._id }
  }

  @Delete()
  async remove(@Query('id') id: string) {
    try {
      const removed = await this.chapterModel.findByIdAndRemove(id)
      // 关联的小说删除对应的章节
      await this.novelModel.findByIdAndUpdate(removed.novel, {
        $pull: { chapters: removed._id },
      })
      return { code: 2000, msg: 'ok', removed: removed }
    } catch (error) {
      return { code: 5000, msg: 'fail' }
    }
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    const record = await this.chapterModel.findById(id)
    return { data: record, code: 2000 }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: Partial<Chapter>) {
    await this.chapterModel.findByIdAndUpdate(id, dto)
    return { code: 2000, msg: 'ok' }
  }

  @Get()
  async findByNovel(
    @Query() dto: { nid: string; page: string; pageSize: string },
  ) {
    const page = parseInt(dto.page) || 1
    const size = parseInt(dto.pageSize) || 50

    const total = await this.chapterModel.find({ novel: dto.nid }).count()
    const list = await this.chapterModel
      .find({ novel: dto.nid })
      .skip((page - 1) * size)
      .limit(size)
      .exec()

    return { code: 2000, list, total }
  }
}
