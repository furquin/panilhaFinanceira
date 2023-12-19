import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { AuthPresenter } from '../auth/presenter/auth.presenter'

@Injectable()
export class CategoryService {
	constructor(private readonly prismaService: PrismaService) {}
	async create(auth: AuthPresenter, createCategoryDto: CreateCategoryDto) {
		await this.findOneByName(createCategoryDto.name, auth.user.id)
			.then((category) => {
				if(category) throw new ConflictException('Categoria com esse nome já existe.')
			})
		return await this.prismaService.category.create({
			data: {...createCategoryDto, user: {connect: {id: auth.user.id}}}})
	}

	async findAll(auth: AuthPresenter) {
		return await this.prismaService.category.findMany({
			where: {userId: auth.user.id},
		})
	}

	private async findOne(id: number, userId: number) {
		const category = await this.prismaService.category.findUnique({
			where: {id, userId,},
		})

		if (!category) throw new NotFoundException('Categoria não encontrada.')

		return category
	}

	private async findOneByName(name: string, userId: number) {
		const category = await this.prismaService.category.findUnique({
			where: {name, userId,},
		})

		return category
	}

	async update(auth: AuthPresenter, id: number, updateCategoryDto: UpdateCategoryDto) {
		await this.findOne(id, auth.user.id)
		await this.findOneByName(updateCategoryDto.name, auth.user.id)
			.then((category) => {
				if(category) throw new ConflictException('Categoria com esse nome já existe.')
			})

		await this.prismaService.category.update({
			where: {id, userId: auth.user.id},
			data: updateCategoryDto,
		})
		return 'Categoria atualizada com sucesso.'
	}

	async remove(auth: AuthPresenter, id: number) {
		await this.findOne(id, auth.user.id)
		
		await this.prismaService.category.delete({
			where: {id, userId: auth.user.id},
		})
		return 'Categoria removida com sucesso.'
	}
}
