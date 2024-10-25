import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant-dto';
import { UpdateRestaurantDto } from './dto/update-restaurant-dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard'; // Certifique-se de que o caminho esteja correto

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    try {
      const restaurant =
        await this.restaurantService.create(createRestaurantDto);
      return {
        message: 'Restaurante criado com sucesso!',
        statusCode: HttpStatus.CREATED,
        data: restaurant,
      };
    } catch (error) {
      return {
        message: 'Erro ao criar restaurante',
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      };
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    try {
      const restaurant = await this.restaurantService.findOne(id);
      return {
        message: 'Restaurante encontrado!',
        statusCode: HttpStatus.OK,
        data: restaurant,
      };
    } catch (error) {
      return {
        message: 'Erro ao buscar restaurante',
        statusCode: HttpStatus.NOT_FOUND,
        error: error.message,
      };
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    try {
      const restaurants = await this.restaurantService.findAll();
      return {
        message: 'Lista de restaurantes',
        statusCode: HttpStatus.OK,
        data: restaurants,
      };
    } catch (error) {
      return {
        message: 'Erro ao buscar restaurantes',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message,
      };
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    try {
      const updatedRestaurant = await this.restaurantService.update(
        id,
        updateRestaurantDto,
      );
      return {
        message: 'Restaurante atualizado com sucesso!',
        statusCode: HttpStatus.OK,
        data: updatedRestaurant,
      };
    } catch (error) {
      return {
        message: 'Erro ao atualizar restaurante',
        statusCode: HttpStatus.NOT_FOUND,
        error: error.message,
      };
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    try {
      await this.restaurantService.remove(id);
      return {
        message: 'Restaurante removido com sucesso!',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Erro ao remover restaurante',
        statusCode: HttpStatus.NOT_FOUND,
        error: error.message,
      };
    }
  }
}
