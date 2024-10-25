import { Controller, Post, Get, Patch, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category-dto';
import { UpdateCategoryDto } from './dto/update-category-dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard'; // Certifique-se de que o caminho esteja correto

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
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
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    try {
      const updatedCategory = await this.categoryService.update(id, updateCategoryDto);
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
