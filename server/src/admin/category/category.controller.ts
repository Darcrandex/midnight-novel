import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { Category } from '@app/db/models/category.model'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'

@Controller('category')
export class CategoryController {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: ReturnModelType<typeof Category>,
  ) {}

  @Post()
  async create(@Body() dto: { name: string }) {
    const record = await this.categoryModel.create(dto)
    return { code: 2000, data: record._id }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: { name?: string; children?: { name: string }[] },
  ) {
    await this.categoryModel.findByIdAndUpdate(id, dto)
    return { code: 2000, data: null }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categoryModel.findByIdAndRemove(id)
    return { code: 2000 }
  }

  @Get()
  async findByPage(@Query() query: { page: string; pageSize: string }) {
    const page = parseInt(query.page) || 1
    const limit = parseInt(query.pageSize) || 10
    const list = await this.categoryModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec()
    const total = await this.categoryModel.count()
    return { code: 2000, msg: 'ok', list, total }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const record = await this.categoryModel.findById(id)
    return { data: record || null }
  }
}
