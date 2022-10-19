import { IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

class Exif {
  @IsString()
  @IsOptional()
  make: string;
  @IsString()
  @IsOptional()
  model: string;
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  exposure_time: string;
  @IsString()
  @IsOptional()
  aperture: string;
  @IsString()
  @IsOptional()
  focal_length: string;
  @IsNumber()
  @IsOptional()
  iso: number;
}

class Urls {
  @IsString()
  @IsOptional()
  raw: string;
  @IsString()
  @IsOptional()
  full: string;
  @IsString()
  @IsOptional()
  regular: string;
  @IsString()
  @IsOptional()
  small: string;
  @IsString()
  @IsOptional()
  thumb: string;
  @IsString()
  @IsOptional()
  small_s3: string;
}


class ProfileImage {
  @IsString()
  small: string;
  @IsString()
  medium: string;
  @IsString()
  large: string;
}


class User {
  @IsString()
  id: string;
  @IsString()
  username: string;
  @IsString()
  profile_image: ProfileImage;
  // total_likes: number;
  // total_photos: number;
}


export class CreatePostDto extends Urls {
  @IsNumber()
  width: number;
  @IsNumber()
  height: number;
  @IsString()
  blur_hash: string;
  @IsString()
  @IsOptional()
  description: null;
  @IsString()
  @IsOptional()
  alt_description: null;
  @IsOptional()
  urls: Urls;
  @IsOptional()
  user: User;
  @IsOptional()
  exif: Exif;
}
