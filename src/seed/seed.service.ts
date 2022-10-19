import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Post } from 'src/posts/entities/post.entity';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Post.name)
    private readonly PostModel: Model<Post>
  ) { }

  async executeSeed(page = 1) {
    const { data } = await axios.get(`https://api.unsplash.com/photos/random?client_id=Qi7PN-2yIH93w-gTR2a1LsqYSyE5RBHTcW7yNRE4Isk&count=30&page=${page}`)
    await this.PostModel.insertMany(data)
    return `seed execute ${page}`
  }
}
