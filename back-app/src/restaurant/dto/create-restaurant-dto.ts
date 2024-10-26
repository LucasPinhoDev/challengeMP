import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDto {
  @ApiProperty({ description: 'Nome do restaurante' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email do restaurante',
    example: 'restaurante@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do restaurante', example: 'senha123' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Descrição do restaurante', required: false })
  description: string;

  @ApiProperty({ description: 'Imagem do restaurante', required: false })
  image: string;

  @ApiProperty({ description: 'Endereço do restaurante' })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Número máximo de reservas', example: 50 })
  @IsNotEmpty()
  maxNumReserve: number;
}
