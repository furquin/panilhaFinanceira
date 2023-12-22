import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { AuthPresenter } from '../auth/presenter/auth.presenter';
import { PrismaService } from 'src/database/prisma.service';
import { DateTime } from 'luxon';
import { ExpensePresenter } from './presenter/expense.presenter';

@Injectable()
export class ExpenseService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(auth: AuthPresenter, createExpenseDto: CreateExpenseDto): Promise<ExpensePresenter[]> {
    const expenses: ExpensePresenter[] = [];
    await this.prismaService.$transaction(async (trx) => {
      for (let i = 0; i < createExpenseDto.recurrences; i += 1) {
        await trx.expense
          .create({
            data: {
              description: createExpenseDto?.description ?? 'Sem descrição',
              valueCents: createExpenseDto.valueCents,
              recurrences: createExpenseDto.recurrences,
              currentRecurrence: i + 1,
              date: DateTime.fromJSDate(new Date()).plus({ month: i }).toJSDate(),
              user: {
                connect: {
                  id: auth.user.id,
                },
              },
              category: {
                connect: {
                  id: createExpenseDto.categoryId,
                },
              },
            },
            include: {
              category: true,
              user: true,
            },
          })
          .then((expense) => expenses.push(new ExpensePresenter(expense)));
      }
    });

    return expenses;
  }

  async findAll(auth: AuthPresenter): Promise<ExpensePresenter[]> {
    return this.prismaService.expense
      .findMany({
        where: {
          userId: auth.user.id,
        },
        include: {
          category: true,
          user: true,
        },
      })
      .then((expenses) => expenses.map((expense) => new ExpensePresenter(expense)));
  }

  async findOne(auth: AuthPresenter, id: number): Promise<ExpensePresenter> {
    return this.prismaService.expense
      .findUniqueOrThrow({
        where: {
          id,
          userId: auth.user.id,
        },
        include: {
          category: true,
          user: true,
        },
      })
      .then((expense) => new ExpensePresenter(expense))
      .catch(() => {
        throw new NotFoundException('Despesa não encontrada');
      });
  }

  async update(auth: AuthPresenter, id: number, updateExpenseDto: UpdateExpenseDto): Promise<string> {
    await this.findOne(auth, id);
    await this.prismaService.expense.update({
      where: {
        id,
      },
      data: {
        ...updateExpenseDto
      }
    });
    return 'Despesa atualizada com sucesso'
  }

 async remove(auth: AuthPresenter, id: number): Promise<string> {
    await this.findOne(auth, id);
    await this.prismaService.expense.delete({
      where: {
        id,
        userId: auth.user.id,
      },
    })
    return 'Despesa removida com sucesso'
  }
}
