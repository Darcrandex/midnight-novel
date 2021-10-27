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

@Controller('novel')
export class NovelController {
  constructor(
    @InjectModel(Novel)
    private readonly novelModel: ReturnModelType<typeof Novel>,
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
    await this.novelModel.findByIdAndRemove(id)
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
