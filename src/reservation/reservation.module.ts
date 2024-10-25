// src/reservation/reservation.module.ts
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ValidateCpfMiddleware } from '../middleware/validate-cpf-middleware';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService, PrismaService],
})
export class ReservationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateCpfMiddleware)
      .forRoutes(
        { path: 'reservations/:id', method: RequestMethod.GET },
        { path: 'reservations/:cpf', method: RequestMethod.GET },
        { path: 'reservations/:id', method: RequestMethod.PATCH },
        { path: 'reservations/:id', method: RequestMethod.DELETE },
        { path: 'reservations', method: RequestMethod.POST }
      ); // Aplica o middleware apenas onde o CPF é obrigatório
  }
}