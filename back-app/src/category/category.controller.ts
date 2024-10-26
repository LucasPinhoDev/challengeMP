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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category-dto';
import { UpdateCategoryDto } from './dto/update-category-dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@ApiTags('Categorias')
@ApiBearerAuth()
@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova categoria' })
  @ApiResponse({ status: 201, description: 'Categoria criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro ao criar categoria.' })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.categoryService.create(createCategoryDto);
      return {
        message: 'Categoria criada com sucesso!',
        statusCode: HttpStatus.CREATED,
        data: category,
      };
    } catch (error) {
      return {
        message: 'Erro ao criar categoria',
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      };
    }
  }

  @Get()
  @ApiOperation({ summary: 'Recuperar todas as categorias' })
  @ApiResponse({
    status: 200,
    description: 'Categorias recuperadas com sucesso.',
  })
  async findAll() {
    try {
      const categories = await this.categoryService.findAll();
      return {
        message: 'Categorias recuperadas com sucesso!',
        statusCode: HttpStatus.OK,
        data: categories,
      };
    } catch (error) {
      return {
        message: 'Erro ao recuperar categorias',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message,
      };
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperar uma categoria pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Categoria recuperada com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  async findOne(@Param('id') id: string) {
    try {
      const category = await this.categoryService.findOne(id);
      return {
        message: 'Categoria recuperada com sucesso!',
        statusCode: HttpStatus.OK,
        data: category,
      };
    } catch (error) {
      return {
        message: 'Erro ao recuperar categoria',
        statusCode: HttpStatus.NOT_FOUND,
        error: error.message,
      };
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma categoria pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Categoria atualizada com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const updatedCategory = await this.categoryService.update(
        id,
        updateCategoryDto,
      );
      return {
        message: 'Categoria atualizada com sucesso!',
        statusCode: HttpStatus.OK,
        data: updatedCategory,
      };
    } catch (error) {
      return {
        message: 'Erro ao atualizar categoria',
        statusCode: HttpStatus.NOT_FOUND,
        error: error.message,
      };
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma categoria pelo ID' })
  @ApiResponse({ status: 200, description: 'Categoria removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  async remove(@Param('id') id: string) {
    try {
      await this.categoryService.remove(id);
      return {
        message: 'Categoria removida com sucesso!',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Erro ao remover categoria',
        statusCode: HttpStatus.NOT_FOUND,
        error: error.message,
      };
    }
  }
}
