// src/product/dto/create-product-dto.ts
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsUUID()
  @IsOptional()
  categoryId: string;
}