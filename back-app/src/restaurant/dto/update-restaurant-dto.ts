import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantDto } from './create-restaurant-dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
  @ApiProperty({
    description: 'Nome do restaurante',
    example: 'Restaurante XYZ',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Email do restaurante',
    example: 'restaurante@example.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'Senha do restaurante',
    example: 'senha123',
    required: false,
  })
  password?: string;

  @ApiProperty({
    description: 'Descrição do restaurante',
    example: 'Um ótimo lugar para comer.',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Imagem do restaurante',
    example: 'http://example.com/imagem.jpg',
    required: false,
  })
  image?: string;

  @ApiProperty({
    description: 'Endereço do restaurante',
    example: 'Rua Exemplo, 123',
    required: false,
  })
  address?: string;

  @ApiProperty({
    description: 'Número máximo de reservas',
    example: 50,
    required: false,
  })
  maxNumReserve?: number;
}
