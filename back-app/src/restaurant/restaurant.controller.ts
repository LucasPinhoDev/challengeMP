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
  Headers,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant-dto';
import { UpdateRestaurantDto } from './dto/update-restaurant-dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Restaurantes')
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo restaurante' })
  @ApiResponse({ status: 201, description: 'Restaurante criado com sucesso!' })
  @ApiResponse({ status: 400, description: 'Erro ao criar restaurante' })
  @ApiBody({ type: CreateRestaurantDto })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar um restaurante pelo ID' })
  @ApiResponse({ status: 200, description: 'Restaurante encontrado!' })
  @ApiResponse({ status: 404, description: 'Erro ao buscar restaurante' })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos os restaurantes' })
  @ApiResponse({ status: 200, description: 'Lista de restaurantes' })
  @ApiResponse({ status: 500, description: 'Erro ao buscar restaurantes' })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar um restaurante pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Restaurante atualizado com sucesso!',
  })
  @ApiResponse({ status: 404, description: 'Erro ao atualizar restaurante' })
  @ApiBody({ type: UpdateRestaurantDto })
  async update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
    @Headers('authorization') authHeader: string,
  ) {
    const token = authHeader?.replace('Bearer ', '');
    try {
      const updatedRestaurant = await this.restaurantService.update(
        id,
        updateRestaurantDto,
        token,
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover um restaurante pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Restaurante removido com sucesso!',
  })
  @ApiResponse({ status: 404, description: 'Erro ao remover restaurante' })
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
