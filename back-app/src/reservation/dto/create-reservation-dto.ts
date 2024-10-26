import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({ description: 'Nome do cliente', example: 'João Silva' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'CPF do cliente', example: '123.456.789-10' })
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({ description: 'Número da reserva', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  numReserve: number;

  @ApiProperty({ description: 'Data e hora da reserva', example: '2024-10-26T18:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  dateTime: string;
}
