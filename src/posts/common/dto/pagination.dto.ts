import { IsOptional, IsPositive, IsString, Min } from "class-validator";

export class PaginationDto {
  @IsOptional()
  page?: number;
  @IsOptional()
  limit?: number;

}