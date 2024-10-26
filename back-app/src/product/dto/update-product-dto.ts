import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ description: 'Nome do produto', required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ description: 'Descrição do produto', required: false })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'Preço do produto', required: false })
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty({ description: 'Imagem do produto', required: false })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ description: 'ID da categoria associada ao produto', required: false })
  @IsUUID()
  @IsOptional()
  categoryId: string;
}
