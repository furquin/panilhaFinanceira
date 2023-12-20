import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPresenter } from './presenter/user.presenter';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<UserPresenter> {
    await this.userExists(createUserDto.email);

    createUserDto.password = await hash(createUserDto.password, 10);
    createUserDto.roleId = createUserDto?.roleId ?? 2;
    const user = await this.prisma.user.create({
      data: createUserDto,
      include: {
        role: true,
      },
    });
    return new UserPresenter(user);
  }

  async findAll(): Promise<UserPresenter[]> {
    return this.prisma.user
      .findMany({
        include: {
          role: true,
        },
      })
      .then((users) => users.map((user) => new UserPresenter(user)));
  }

  async findOne(id: number): Promise<UserPresenter> {
    return this.prisma.user
      .findUniqueOrThrow({
        where: { id },
        include: {
          role: true,
        },
      })
      .then((user) => new UserPresenter(user))
      .catch(() => {
        throw new NotFoundException('Usuário não encontrado');
      });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<string> {
    await this.findOne(id);
    if (updateUserDto.email) await this.userExists(updateUserDto.email);

    await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return 'Usuário atualizado com sucesso';
  }

  private async userExists(email: string): Promise<void> {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      throw new ConflictException('Usuário com esse email já existe');
    }
    return;
  }

  async remove(id: number): Promise<string> {
    await this.findOne(id);
    await this.prisma.user.delete({
      where: { id },
    });
    return 'Usuário deletado com sucesso';
  }
}
