import { Controller, Get, Query } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @Get()
  executeSeed(@Query('page') page) {
    return this.seedService.executeSeed(page);
  }
}
