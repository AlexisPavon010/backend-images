import { IsString } from "class-validator";

export class UserAuthDto {

  @IsString()
  id: string

}