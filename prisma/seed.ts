import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  for (const value of [{ id: 1, name: 'Administrador', slug: 'admin_geral' }, { id: 2, name: 'Usuário', slug: 'user' }]) {
    await prisma.role.upsert({
      where: { name: value.name },
      update: {},
      create: {
        id: value.id,
        name: value.name,
        slug: value.slug
      },
    });
  }

  await prisma.user.upsert({
    where: { email: 'laert.ff@gmail.com' },
    update: {},
    create: {
      name: 'Laert Furquin Neto',
      email: 'laert.ff@gmail.com',
      password: '12345678',
      role: { connect: { id: 1 } },
    },
  });

  for (const value of [{ id: 1, name: 'Outros' }, { id: 2, name: 'Transporte' }, { id: 3, name: 'Lazer' }, { id: 4, name: 'Saúde' }, { id: 5, name: 'Educação' }, { id: 6, name: 'Moradia' }, { id: 7, name: 'Alimentação' },]) {
    await prisma.category.upsert({
      where: { name: value.name },
      update: {},
      create: {
        name: value.name,
        user: { connect: { id: 1 } },
      },
    });
  }

}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
