import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginRestaurantDto } from '../restaurant/dto/login-restaurant-dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(loginRestaurantDto: LoginRestaurantDto) {
    const { email, password } = loginRestaurantDto;

    const restaurant = await this.prisma.restaurant.findUnique({
      where: { email },
    });

    if (!restaurant || !(await bcrypt.compare(password, restaurant.password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { id: restaurant.id, email: restaurant.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
