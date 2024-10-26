import { Test, TestingModule } from '@nestjs/testing';

import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { ReservationService } from 'src/reservation/reservation.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('ReservationService', () => {
  let reservationService: ReservationService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    reservation: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    reservationService = module.get<ReservationService>(ReservationService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('findAll', () => {
    it('deve retornar todas as reservas', async () => {
      const reservations = [
        {
          id: 'some-id-1',
          name: 'Test User 1',
          cpf: '12345678901',
          numReserve: 2,
          dateTime: new Date().toISOString(),
        },
        {
          id: 'some-id-2',
          name: 'Test User 2',
          cpf: '09876543210',
          numReserve: 3,
          dateTime: new Date().toISOString(),
        },
      ];

      mockPrismaService.reservation.findMany.mockResolvedValue(reservations);

      const result = await reservationService.findAll();
      expect(result).toEqual(reservations);
    });
  });

  describe('findOne', () => {
    it('deve encontrar uma reserva por ID', async () => {
      const reservationId = 'some-id';
      const reservation = {
        id: reservationId,
        name: 'Test User',
        cpf: '12345678901',
        numReserve: 2,
        dateTime: new Date().toISOString(),
      };

      mockPrismaService.reservation.findUnique.mockResolvedValue(reservation);

      const result = await reservationService.findOne(reservationId);
      expect(result).toEqual(reservation);
    });

    it('deve lançar NotFoundException se a reserva não for encontrada', async () => {
      mockPrismaService.reservation.findUnique.mockResolvedValue(null);

      await expect(reservationService.findOne('non-existing-id')).rejects.toThrow(NotFoundException);
    });

    it('deve lançar ForbiddenException se o CPF não corresponder', async () => {
      const reservation = {
        id: 'some-id',
        name: 'Test User',
        cpf: '12345678901',
        numReserve: 2,
        dateTime: new Date().toISOString(),
      };

      mockPrismaService.reservation.findUnique.mockResolvedValue(reservation);

      await expect(reservationService.findOne(reservation.id, 'wrong-cpf')).rejects.toThrow(ForbiddenException);
    });
  });

  describe('update', () => {
    it('deve atualizar uma reserva com sucesso', async () => {
      const reservationId = 'some-id';
      const updateData = { numReserve: 3 };
      const updatedReservation = {
        id: reservationId,
        name: 'Test User',
        cpf: '12345678901',
        numReserve: 3,
        dateTime: new Date().toISOString(),
      };

      mockPrismaService.reservation.findUnique.mockResolvedValue(updatedReservation);
      mockPrismaService.reservation.update.mockResolvedValue(updatedReservation);

      const result = await reservationService.update(reservationId, updateData);
      expect(result).toEqual(updatedReservation);
    });

    it('deve lançar ForbiddenException se o CPF não corresponder', async () => {
      const reservationId = 'some-id';
      const updateData = { numReserve: 3 };
      const reservation = {
        id: reservationId,
        name: 'Test User',
        cpf: '12345678901',
        numReserve: 2,
        dateTime: new Date().toISOString(),
      };

      mockPrismaService.reservation.findUnique.mockResolvedValue(reservation);

      await expect(reservationService.update(reservationId, updateData, 'wrong-cpf')).rejects.toThrow(ForbiddenException);
    });
  });

  describe('remove', () => {
    it('deve remover uma reserva com sucesso', async () => {
      const reservationId = 'some-id';
      const reservation = {
        id: reservationId,
        name: 'Test User',
        cpf: '12345678901',
        numReserve: 2,
        dateTime: new Date().toISOString(),
      };

      mockPrismaService.reservation.findUnique.mockResolvedValue(reservation);
      mockPrismaService.reservation.delete.mockResolvedValue(reservation);

      const result = await reservationService.remove(reservationId);
      expect(result).toEqual(reservation);
    });

    it('deve lançar ForbiddenException se o CPF não corresponder', async () => {
      const reservationId = 'some-id';
      const reservation = {
        id: reservationId,
        name: 'Test User',
        cpf: '12345678901',
        numReserve: 2,
        dateTime: new Date().toISOString(),
      };

      mockPrismaService.reservation.findUnique.mockResolvedValue(reservation);

      await expect(reservationService.remove(reservationId, 'wrong-cpf')).rejects.toThrow(ForbiddenException);
    });
  });
});

