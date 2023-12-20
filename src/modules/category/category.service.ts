import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthPresenter } from '../auth/presenter/auth.presenter';
import { CategoryPresenter } from './presenter/category.presenter';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(auth: AuthPresenter, createCategoryDto: CreateCategoryDto): Promise<CategoryPresenter> {
    await this.findOneByName(createCategoryDto.name, auth.user.id).then((category) => {
      if (category) throw new ConflictException('Categoria com esse nome já existe.');
    });
    const category = await this.prismaService.category.create({
      data: { ...createCategoryDto, user: { connect: { id: auth.user.id } } },
    });

    return new CategoryPresenter(category);
  }

  async findAll(auth: AuthPresenter): Promise<CategoryPresenter[]> {
    return await this.prismaService.category
      .findMany({
        where: { userId: auth.user.id },
      })
      .then((categories) => categories.map((category) => new CategoryPresenter(category)));
  }

  private async findOne(id: number, userId: number): Promise<CategoryPresenter> {
    const category = await this.prismaService.category.findUnique({
      where: { id, userId },
    });

    if (!category) throw new NotFoundException('Categoria não encontrada.');

    return new CategoryPresenter(category);
  }

  private async findOneByName(name: string, userId: number): Promise<CategoryPresenter> {
    const category = await this.prismaService.category.findUnique({
      where: { name, userId },
    });

    return new CategoryPresenter(category);
  }

  async update(auth: AuthPresenter, id: number, updateCategoryDto: UpdateCategoryDto): Promise<string> {
    await this.findOne(id, auth.user.id);
    await this.findOneByName(updateCategoryDto.name, auth.user.id).then((category) => {
      if (category) throw new ConflictException('Categoria com esse nome já existe.');
    });

    await this.prismaService.category.update({
      where: { id, userId: auth.user.id },
      data: updateCategoryDto,
    });
    return 'Categoria atualizada com sucesso.';
  }

  async remove(auth: AuthPresenter, id: number): Promise<string> {
    await this.findOne(id, auth.user.id);

    await this.prismaService.category.delete({
      where: { id, userId: auth.user.id },
    });
    return 'Categoria removida com sucesso.';
  }
}
