import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateRestaurantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  description: string;
  image: string;

  @IsNotEmpty()
  address: string;
  
  @IsNotEmpty()
  maxNumReserve: number;
}
