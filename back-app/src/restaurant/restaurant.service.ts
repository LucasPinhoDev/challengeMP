import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant-dto';
import { UpdateRestaurantDto } from './dto/update-restaurant-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RestaurantService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    const hashedPassword = await bcrypt.hash(createRestaurantDto.password, 10);

    return this.prisma.restaurant.create({
      data: {
        ...createRestaurantDto,
        password: hashedPassword,
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

  async update(
    id: string,
    updateRestaurantDto: UpdateRestaurantDto,
    token: string,
  ) {
    const decodedToken = this.jwtService.decode(token) as { id: string };

    if (decodedToken.id !== id) {
      throw new ForbiddenException(
        'Você não tem permissão para atualizar este restaurante.',
      );
    }

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
