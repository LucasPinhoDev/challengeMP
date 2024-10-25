
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation-dto';
import { UpdateReservationDto } from './dto/update-reservation-dto';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReservationDto: CreateReservationDto) {
    return this.prisma.reservation.create({
      data: createReservationDto,
    });
  }

  async findAll() {
    return this.prisma.reservation.findMany();
  }

  async findOne(id: string, cpf?: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
    });
    if (!reservation) throw new NotFoundException('Reserva não encontrada');

    if (cpf && reservation.cpf !== cpf) throw new ForbiddenException('Acesso negado');
    return reservation;
  }

  async findByCpf(cpf: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { cpf },
    });

    if (!reservation) throw new NotFoundException('Reserva não encontrada');

    return reservation;
  }

  async update(id: string, updateReservationDto: UpdateReservationDto, cpf?: string) {
    const reservation = await this.prisma.reservation.findUnique({ where: { id } });
    if (!reservation) throw new NotFoundException('Reserva não encontrada');

    if (cpf && reservation.cpf !== cpf) throw new ForbiddenException('Acesso negado');
    
    return this.prisma.reservation.update({
      where: { id },
      data: updateReservationDto,
    });
  }

  async remove(id: string, cpf?: string) {
    const reservation = await this.prisma.reservation.findUnique({ where: { id } });
    if (!reservation) throw new NotFoundException('Reserva não encontrada');

    if (cpf && reservation.cpf !== cpf) throw new ForbiddenException('Acesso negado');

    return this.prisma.reservation.delete({ where: { id } });
  }
}
