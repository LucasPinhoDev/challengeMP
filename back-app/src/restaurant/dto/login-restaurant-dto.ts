import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRestaurantDto {
  @ApiProperty({
    description: 'E-mail do restaurante',
    example: 'restaurant@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha do restaurante',
    example: 'senhaSegura123',
  })
  @IsNotEmpty()
  password: string;
}
