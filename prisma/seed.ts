import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const months: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  months.forEach(
    async (month, index) =>
      await prisma.months.upsert({
        where: { name: month },
        update: {},
        create: { 
          id: index + 1,
          name: month },
      })
  );

  await prisma.category.upsert({
    where: { name: 'Outros' },
    update: {},
    create: { name: 'Outros' },
  })

  await prisma.user.upsert({
    where: { email: 'laert.ff@gmail.com' },
    update: {},
    create: { 
        name: 'Laert Furquin Neto',
        email: 'laert.ff@gmail.com',
        password: '12345678',
        role: 'admin',         
    },
  })
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
