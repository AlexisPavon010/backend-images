import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, now } from 'mongoose'

class Exif {
  make: string;
  model: string;
  name: string;
  exposure_time: string;
  aperture: string;
  focal_length: string;
  iso: number;
}

class Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

class User {
  _id: string;
  email: string;
  id: string;
  username: string;
  bio: string;
  profile_image: ProfileImage;
  // total_likes: number;
  // total_photos: number;
}

class ProfileImage {
  small: string;
  medium: string;
  large: string;
}

@Schema()
export class Post extends Document {
  @Prop()
  id: string;
  @Prop()
  width: number;
  @Prop()
  height: number;
  @Prop()
  color: string;
  @Prop()
  blur_hash: string;
  @Prop()
  description: string;
  @Prop()
  alt_description: string;
  @Prop()
  urls: Urls;
  @Prop()
  exif: Exif;
  @Prop()
  user: User
  @Prop({ default: now() })
  createdAt: Date;
  @Prop({ default: now() })
  updatedAt: Date;
}

export const PostChema = SchemaFactory.createForClass(Post)