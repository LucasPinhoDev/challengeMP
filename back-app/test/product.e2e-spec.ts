import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../src/product/product.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { CreateProductDto } from '../src/product/dto/create-product-dto';
import { UpdateProductDto } from '../src/product/dto/update-product-dto';

describe('ProductService', () => {
  let productService: ProductService;
  let prismaService: PrismaService;

  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 100,
    description: 'Test Description',
    categoryId: '74f5f38c-1078-4027-b554-423a643aea25',
  };

  const mockPrismaService = {
    product: {
      create: jest.fn().mockResolvedValue(mockProduct),
      findMany: jest.fn().mockResolvedValue([mockProduct]),
      findUnique: jest.fn().mockResolvedValue(mockProduct),
      update: jest.fn().mockResolvedValue(mockProduct),
      delete: jest.fn().mockResolvedValue(mockProduct),
    },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    productService = moduleFixture.get<ProductService>(ProductService);
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('deve criar um produto com sucesso', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        price: 100,
        description: 'Test Description',
        categoryId: '74f5f38c-1078-4027-b554-423a643aea25',
      };

      const result = await productService.create(createProductDto);
      expect(result).toEqual(mockProduct);
      expect(prismaService.product.create).toHaveBeenCalledWith({ data: createProductDto });
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os produtos', async () => {
      const result = await productService.findAll();
      expect(result).toEqual([mockProduct]);
      expect(prismaService.product.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('deve buscar um produto por ID', async () => {
      const result = await productService.findOne(mockProduct.id);
      expect(result).toEqual(mockProduct);
      expect(prismaService.product.findUnique).toHaveBeenCalledWith({ where: { id: mockProduct.id } });
    });
  });

  describe('update', () => {
    it('deve atualizar um produto por ID', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 150,
        description: 'Updated Description',
        categoryId: '74f5f38c-1078-4027-b554-423a643aea25',
      };

      const result = await productService.update(mockProduct.id, updateProductDto);
      expect(result).toEqual(mockProduct);
      expect(prismaService.product.update).toHaveBeenCalledWith({ where: { id: mockProduct.id }, data: updateProductDto });
    });
  });

  describe('remove', () => {
    it('deve remover um produto por ID', async () => {
      await productService.remove(mockProduct.id);
      expect(prismaService.product.delete).toHaveBeenCalledWith({ where: { id: mockProduct.id } });
    });
  });
});
