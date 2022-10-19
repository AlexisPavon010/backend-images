import { Module } from '@nestjs/common';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PostsModule } from '../posts/posts.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [PostsModule]
})
export class SeedModule {}
