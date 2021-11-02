import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common'
import { Novel } from '@app/db/models/novel.model'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { Chapter } from '@app/db/models/chapter.model'

@Controller('novel')
export class NovelController {
  constructor(
    @InjectModel(Novel)
    private readonly novelModel: ReturnModelType<typeof Novel>,
    @InjectModel(Chapter)
    private readonly chapterModel: ReturnModelType<typeof Chapter>,
  ) {}

  @Post()
  async create(@Body() dto: Novel) {
    const record = await this.novelModel.create(dto)
    return { code: 2000, id: record._id }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: Partial<Novel>) {
    await this.novelModel.findByIdAndUpdate(id, dto)
    return { code: 2000, data: null }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removed = await this.novelModel.findByIdAndRemove(id)
    // 章节连带删除
    await this.chapterModel.find({ novel: removed._id }).remove()
    return { code: 2000 }
  }

  @Get()
  async findByPage() {
    const list = await this.novelModel.find().populate('chapters').exec()
    return {
      code: 2000,
      list,
    }
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    const record = await this.novelModel.findById(id).populate('chapters')
    return {
      code: 2000,
      record,
    }
  }
}
