import { Injectable } from '@nestjs/common';

import { CreateRestaurantDto } from './dto/create-restaurant-dto';
import { UpdateRestaurantDto } from './dto/update-restaurant-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    const hashedPassword = await bcrypt.hash(createRestaurantDto.password, 10);

    return this.prisma.restaurant.create({
      data: {
        ...createRestaurantDto,
        password: hashedPassword, // Salvar a senha criptografada
      },
    });
  }

  findAll() {
    return this.prisma.restaurant.findMany();
  }

  findOne(id: string) {
    return this.prisma.restaurant.findUnique({
      where: { id },
    });
  }

  update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    return this.prisma.restaurant.update({
      where: { id },
      data: updateRestaurantDto,
    });
  }

  remove(id: string) {
    return this.prisma.restaurant.delete({
      where: { id },
    });
  }
}
