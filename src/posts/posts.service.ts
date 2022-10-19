import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from './common/dto/pagination.dto';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectModel(Post.name)
    private readonly PostModel: Model<Post>
  ) { }

  async create(createPostDto: CreatePostDto, user: User) {
    try {
      return await this.PostModel.create({
        ...createPostDto,
        user: user
      })
    } catch (error) {
      throw new BadRequestException("Ocurrio un error");
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 0, limit = 10 } = paginationDto;
    const data = await this.PostModel.find()
      .limit(limit)
      .skip(page * limit)

    return data;
  }

  async findOne(id: string) {
    try {
      return await this.PostModel.findById(id);
    } catch (error) {
      throw new NotFoundException("Post not found");
    }
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    try {
      return this.PostModel.findByIdAndUpdate(id, updatePostDto, { new: true });
    } catch (error) {
      throw new NotFoundException("Post not found");
    }
  }

  remove(id: string) {
    try {
      this.PostModel.findByIdAndDelete(id)
      return `Post #${id} rmove succesfully`
    } catch (error) {
      throw new NotFoundException("Post not found");
    }
  }
}
