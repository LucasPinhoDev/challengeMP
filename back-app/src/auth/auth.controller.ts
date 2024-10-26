import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRestaurantDto } from '../restaurant/dto/login-restaurant-dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realiza o login do restaurante' })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
    type: String,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao realizar login',
  })
  async login(@Body() loginRestaurantDto: LoginRestaurantDto) {
    const token = await this.authService.login(loginRestaurantDto);
    return {
      message: 'Login realizado com sucesso!',
      statusCode: HttpStatus.OK,
      data: token,
    };
  }
}
