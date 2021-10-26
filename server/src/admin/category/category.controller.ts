import { Controller, Get } from '@nestjs/common'
import { Category } from '@app/db/models/category.model'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'

@Controller('category')
export class CategoryController {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: ReturnModelType<typeof Category>,
  ) {}

  @Get('/list')
  async findAll() {
    const list = await this.categoryModel.find().exec()
    return {
      data: list,
      port: process.env.PORT || 0,
      e: process.env.NODE_ENV,
      DATA_BASE_HOST: process.env.DATA_BASE_HOST || 0,
    }
  }
}
