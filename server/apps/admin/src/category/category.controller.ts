import { Controller, Get } from '@nestjs/common';
import { Category } from '@app/db/models/Category.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Controller('category')
export class CategoryController {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: ReturnModelType<typeof Category>,
  ) {}

  @Get('/list')
  async findAll() {
    return { data: [] };
  }
}
