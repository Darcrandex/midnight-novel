import { Controller, Get } from '@nestjs/common'

@Controller('reader')
export class ReaderController {
  @Get()
  findAll() {
    return {
      data: [],
      msg: 'ok',
    }
  }
}
