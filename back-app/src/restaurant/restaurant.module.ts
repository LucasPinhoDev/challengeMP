import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module'; // Importe o módulo que contém o JwtService

@Module({
  imports: [AuthModule], // Adicione AuthModule aos imports
  controllers: [RestaurantController],
  providers: [RestaurantService, PrismaService],
  exports: [RestaurantService], // Apenas exporte RestaurantService se necessário
})
export class RestaurantModule {}
