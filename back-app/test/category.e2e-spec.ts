import { Test, TestingModule } from '@nestjs/testing';

import { NotFoundException } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { CategoryService } from 'src/category/category.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from 'src/category/dto/create-category-dto';
import { UpdateCategoryDto } from 'src/category/dto/update-category-dto';

describe('CategoryService', () => {
  let service: CategoryService;
  let prismaService: PrismaService;

  const mockCategory: Category = {
    id: '1',
    name: 'Test Category',
    description: 'Description Category'
  };

  const mockPrismaService = {
    category: {
      create: jest.fn().mockResolvedValue(mockCategory),
      findMany: jest.fn().mockResolvedValue([mockCategory]),
      findUnique: jest.fn().mockResolvedValue(mockCategory),
      update: jest.fn().mockResolvedValue(mockCategory),
      delete: jest.fn().mockResolvedValue(mockCategory),
    },
  } as unknown as PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('deve criar uma nova categoria com sucesso', async () => {
      const createCategoryDto: CreateCategoryDto = { name: 'New Category', description: "New Description Category"};
      const result = await service.create(createCategoryDto);
      expect(result).toEqual(mockCategory);
      expect(prismaService.category.create).toHaveBeenCalledWith({
        data: createCategoryDto,
      });
    });
  });

  describe('findAll', () => {
    it('deve retornar todas as categorias', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockCategory]);
      expect(prismaService.category.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('deve retornar uma categoria existente', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockCategory);
      expect(prismaService.category.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  
    it('deve lançar NotFoundException se a categoria não existir', async () => {
     
      prismaService.category.findUnique = jest.fn().mockResolvedValueOnce(null);
      
     
      await expect(service.findOne('2')).rejects.toThrow(NotFoundException);
    });
  });
  

  describe('update', () => {
    it('deve atualizar uma categoria existente', async () => {
      const updateCategoryDto: UpdateCategoryDto = { name: 'Updated Category' };
      const result = await service.update('1', updateCategoryDto);
      expect(result).toEqual(mockCategory);
      expect(prismaService.category.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateCategoryDto,
      });
    });
  });

  describe('remove', () => {
    it('deve remover uma categoria existente', async () => {
      const result = await service.remove('1');
      expect(result).toEqual(mockCategory);
      expect(prismaService.category.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });
});
