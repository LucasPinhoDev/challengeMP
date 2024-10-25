import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsNumber()
  @IsNotEmpty()
  numReserve: number;

  @IsDateString()
  @IsNotEmpty()
  dateTime: string;
}
