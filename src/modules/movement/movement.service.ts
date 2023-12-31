import { Injectable, NotFoundException } from '@nestjs/common';
import { DateTime } from 'luxon';
import { PrismaService } from 'src/database/prisma.service';
import { AuthPresenter } from '../auth/presenter/auth.presenter';
import { CreateMovementsDTO } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { MovementPresenter } from './presenter/movement.presenter';

@Injectable()
export class MovementService {
  constructor(
    private readonly prismaService: PrismaService //
  ) {}
  async create(auth: AuthPresenter, createMovementDto: CreateMovementsDTO): Promise<MovementPresenter[]> {
    const movements: MovementPresenter[] = [];

    for (const movement of createMovementDto.movements) {
      await this.prismaService.$transaction(async (trx) => {
        for (let i = 0; i < movement.recurrences; i += 1) {
          await trx.movement
            .create({
              data: {
                description: movement?.description ?? 'Sem descrição',
                valueCents: movement.valueCents,
                recurrences: movement.recurrences,
                type: movement.valueCents > 0 ? 'INCOME' : 'EXPENSE',
                date: DateTime.fromJSDate(new Date()).plus({ month: i }).toJSDate(),
                currentRecurrence: i + 1,
                user: {
                  connect: {
                    id: auth.user.id,
                  },
                },
                category: {
                  connect: {
                    id: movement.categoryId,
                  },
                },
              },
              include: {
                category: true,
                user: true,
              },
            })
            .then((movement) => movements.push(new MovementPresenter(movement)));
        }
      });
    }
    return movements;
  }
  async findAll(auth: AuthPresenter): Promise<MovementPresenter[]> {
    return this.prismaService.movement
      .findMany({
        where: {
          userId: auth.user.id,
        },
        include: {
          category: true,
          user: true,
        },
      })
      .then((movements) => movements.map((movement) => new MovementPresenter(movement)));
  }
  private async findOne(id: number, userId: number): Promise<MovementPresenter> {
    return this.prismaService.movement
      .findUniqueOrThrow({
        where: {
          id,
          userId,
        },
        include: {
          category: true,
          user: true,
        },
      })
      .then((movement) => new MovementPresenter(movement))
      .catch(() => {
        throw new NotFoundException('Movimentação não encontrada');
      });
  }

  async update(auth: AuthPresenter, id: number, updateMovementDto: UpdateMovementDto): Promise<string> {
    await this.findOne(id, auth.user.id);

    await this.prismaService.movement.update({
      where: {
        id,
        userId: auth.user.id,
      },
      data: {
        ...updateMovementDto,
      },
    });
    return 'Movimentação atualizada com sucesso';
  }

  async remove(auth: AuthPresenter, id: number): Promise<string> {
    await this.findOne(id, auth.user.id);

    await this.prismaService.movement.delete({
      where: {
        id,
        userId: auth.user.id,
      },
    });

    return 'Movimentação removida com sucesso';
  }
}
