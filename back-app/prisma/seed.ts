import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  console.log("Inserir Restaurante!");
  const restaurant = await prisma.restaurant.upsert({
    where: { email: 'admin@restaurant.com' },
    update: {},
    create: {
      name: 'Restaurante Exemplo',
      email: 'admin@restaurant.com',
      password: 'admin',
      description: 'Um restaurante exemplo com os melhores pratos',
      address: 'Rua do Sabor, 123',
      maxNumReserve: 10,
    },
  });

  console.log("Inserir Categorias!!");  
  const appetizerCategory = await prisma.category.upsert({
    where: { id: uuidv4() }, // Gera um novo UUID para cada categoria
    update: {},
    create: {
      id: uuidv4(),
      name: 'Entradas',
      description: 'Início de refeição',
    },
  });

  const mainCourseCategory = await prisma.category.upsert({
    where: { id: uuidv4() },
    update: {},
    create: {
      id: uuidv4(),
      name: 'Pratos Principais',
      description: 'Pratos principais para uma refeição completa',
    },
  });

  const dessertCategory = await prisma.category.upsert({
    where: { id: uuidv4() },
    update: {},
    create: {
      id: uuidv4(),
      name: 'Sobremesas',
      description: 'Delícias doces para finalizar',
    },
  });

  const beveragesCategory = await prisma.category.upsert({
    where: { id: uuidv4() },
    update: {},
    create: {
      id: uuidv4(),
      name: 'Bebidas',
      description: 'Bebidas refrescantes',
    },
  });

  console.log('Inserir Produtos com o campo restaurantId!');
  await prisma.product.createMany({
    data: [
      {
        name: 'Salada Caesar',
        description: 'Salada com alface, croutons e molho Caesar',
        price: 25.0,
        categoryId: appetizerCategory.id,
      },
      {
        name: 'Filé Mignon com Batatas',
        description: 'Filé mignon grelhado acompanhado de batatas rústicas',
        price: 75.0,
        categoryId: mainCourseCategory.id,
      },
      {
        name: 'Tiramisu',
        description: 'Sobremesa italiana com café e mascarpone',
        price: 30.0,
        categoryId: dessertCategory.id,
      },
      {
        name: 'Suco de Laranja',
        description: 'Suco natural de laranja',
        price: 10.0,
        categoryId: beveragesCategory.id,
      },
    ],
  });

  console.log('Seed executada com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
