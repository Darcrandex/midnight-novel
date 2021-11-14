import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { Kind } from '@app/db/models/kind.model'

@Controller('kind')
export class KindController {
  constructor(
    @InjectModel(Kind)
    private readonly kindModel: ReturnModelType<typeof Kind>,
  ) {}

  @Post()
  async create(@Body() dto: Partial<Kind>) {
    const record = await this.kindModel.create(dto)
    return { code: 2000, data: record._id }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: Partial<Kind>) {
    await this.kindModel.findByIdAndUpdate(id, dto)
    return { code: 2000, data: null }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.kindModel.findByIdAndRemove(id)
    return { code: 2000 }
  }

  @Get()
  async findAll() {
    const list = await this.kindModel.find().exec()
    return { code: 2000, list }
  }
}
