import { Module } from '@nestjs/common';
import { DbModule } from '@app/db';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [DbModule, CategoryModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
