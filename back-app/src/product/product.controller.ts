import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Produtos')
@ApiBearerAuth()
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso!' })
  @ApiResponse({ status: 400, description: 'Erro ao criar produto' })
  @ApiBody({ type: CreateProductDto })
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const product = await this.productService.create(createProductDto);
      return {
        message: 'Produto criado com sucesso!',
        statusCode: HttpStatus.CREATED,
        data: product,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao criar produto',
          statusCode: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({ status: 200, description: 'Produtos recuperados com sucesso!' })
  @ApiResponse({ status: 500, description: 'Erro ao buscar produtos' })
  async findAll() {
    try {
      const products = await this.productService.findAll();
      return {
        message: 'Produtos recuperados com sucesso!',
        statusCode: HttpStatus.OK,
        data: products,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao buscar produtos',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um produto pelo ID' })
  @ApiResponse({ status: 200, description: 'Produto recuperado com sucesso!' })
  @ApiResponse({ status: 404, description: 'Erro ao buscar produto' })
  async findOne(@Param('id') id: string) {
    try {
      const product = await this.productService.findOne(id);
      return {
        message: 'Produto recuperado com sucesso!',
        statusCode: HttpStatus.OK,
        data: product,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao buscar produto',
          statusCode: HttpStatus.NOT_FOUND,
          error: error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um produto pelo ID' })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso!' })
  @ApiResponse({ status: 404, description: 'Erro ao atualizar produto' })
  @ApiBody({ type: UpdateProductDto })
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      const updatedProduct = await this.productService.update(id, updateProductDto);
      return {
        message: 'Produto atualizado com sucesso!',
        statusCode: HttpStatus.OK,
        data: updatedProduct,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao atualizar produto',
          statusCode: HttpStatus.NOT_FOUND,
          error: error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um produto pelo ID' })
  @ApiResponse({ status: 200, description: 'Produto removido com sucesso!' })
  @ApiResponse({ status: 404, description: 'Erro ao remover produto' })
  async remove(@Param('id') id: string) {
    try {
      await this.productService.remove(id);
      return {
        message: 'Produto removido com sucesso!',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao remover produto',
          statusCode: HttpStatus.NOT_FOUND,
          error: error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
