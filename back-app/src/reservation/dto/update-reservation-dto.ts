import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class UpdateReservationDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  cpf?: string;

  @IsNumber()
  @IsOptional()
  numReserve?: number;

  @IsDateString()
  @IsOptional()
  dateTime?: string;
}
