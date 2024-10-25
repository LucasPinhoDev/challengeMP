import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [RestaurantService, PrismaService],
  controllers: [RestaurantController],
  exports: [RestaurantService],
})
export class RestaurantModule {}