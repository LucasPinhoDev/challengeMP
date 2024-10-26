import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Nome do produto' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Descrição do produto', required: false })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'Preço do produto' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: 'Imagem do produto', required: false })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ description: 'ID da categoria associada ao produto' })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}
