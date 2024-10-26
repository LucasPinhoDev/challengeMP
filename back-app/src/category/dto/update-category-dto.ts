import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Nome da categoria (opcional)',
    example: 'Bebidas',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Descrição da categoria (opcional)',
    example: 'Categoria de bebidas variadas',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
