import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReservationDto {
  @ApiProperty({ description: 'Nome do cliente', example: 'João Silva', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'CPF do cliente', example: '123.456.789-10', required: false })
  @IsString()
  @IsOptional()
  cpf?: string;

  @ApiProperty({ description: 'Número da reserva', example: 1, required: false })
  @IsNumber()
  @IsOptional()
  numReserve?: number;

  @ApiProperty({ description: 'Data e hora da reserva', example: '2024-10-26T18:00:00Z', required: false })
  @IsDateString()
  @IsOptional()
  dateTime?: string;
}
