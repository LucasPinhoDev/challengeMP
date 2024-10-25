// src/reservation/reservation.controller.ts
import { Controller, Post, Get, Patch, Delete, Param, Body, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation-dto';
import { UpdateReservationDto } from './dto/update-reservation-dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    try {
      const reservation = await this.reservationService.create(createReservationDto);
      return {
        message: 'Reserva criada com sucesso!',
        statusCode: HttpStatus.CREATED,
        data: reservation,
      };
    } catch (error) {
      return {
        message: 'Erro ao criar reserva',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    try {
      const reservations = await this.reservationService.findAll();
      return {
        message: reservations.length ? 'Reservas recuperadas com sucesso!' : 'Nenhuma reserva encontrada.',
        statusCode: HttpStatus.OK,
        data: reservations,
      };
    } catch (error) {
      return {
        message: 'Erro ao recuperar reservas',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message,
      };
    }
  }

  @Get('/cpf/:cpf')
  async findByCpf(@Param('cpf') cpf: string) {
    try {
      const reservation = await this.reservationService.findByCpf(cpf);
      return {
        message: 'Reserva recuperada com sucesso!',
        statusCode: HttpStatus.OK,
        data: reservation,
      };
    } catch (error) {
      return {
        message: 'Erro ao recuperar reserva',
        statusCode: HttpStatus.NOT_FOUND,
        error: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Body('cpf') cpf?: string) {
    console.log(cpf);
    try {
      const reservation = await this.reservationService.findOne(id, cpf);
      return {
        message: 'Reserva recuperada com sucesso!',
        statusCode: HttpStatus.OK,
        data: reservation,
      };
    } catch (error) {
      return {
        message: 'Erro ao recuperar reserva',
        statusCode: HttpStatus.NOT_FOUND,
        error: error.message,
      };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto, @Body('cpf') cpf?: string) {
    try {
      const updatedReservation = await this.reservationService.update(id, updateReservationDto, cpf);
      return {
        message: 'Reserva atualizada com sucesso!',
        statusCode: HttpStatus.OK,
        data: updatedReservation,
      };
    } catch (error) {
      return {
        message: 'Erro ao atualizar reserva',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Body('cpf') cpf?: string) {
    try {
      await this.reservationService.remove(id, cpf);
      return {
        message: 'Reserva removida com sucesso!',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Erro ao remover reserva',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message,
      };
    }
  }
}
