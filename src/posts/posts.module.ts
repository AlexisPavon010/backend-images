import { Module } from '@nestjs/common';

import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostChema } from './entities/post.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  exports: [
    MongooseModule
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostChema,
      }
    ]),
    AuthModule
  ]
})
export class PostsModule { }
