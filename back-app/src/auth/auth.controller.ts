import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRestaurantDto } from '../restaurant/dto/login-restaurant-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginRestaurantDto: LoginRestaurantDto) {
    const token = await this.authService.login(loginRestaurantDto);
    return {
      message: 'Login realizado com sucesso!',
      statusCode: HttpStatus.OK,
      data: token,
    };
  }
}
