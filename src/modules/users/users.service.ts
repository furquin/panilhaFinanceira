import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserPresenter } from './presenter/user.presenter'
import { hash } from 'bcrypt'

@Injectable()
export class UsersService {
	constructor(
		private readonly prisma: PrismaService//
		) {}
	async create(createUserDto: CreateUserDto): Promise<UserPresenter> {
		await this.userExists(createUserDto.email)

		createUserDto.password = await hash(createUserDto.password, 10)
		createUserDto.roleId =  createUserDto?.roleId ?? 2
		const user = await this.prisma.user.create({
			data: createUserDto,
			include: {
				role: true,
			},
		});
		return new UserPresenter(user)
	}

	async findAll(): Promise<UserPresenter[]> {
		return this.prisma.user.findMany(
			{
				include: {
					role: true,
				},
			},
		).then((users) => users.map((user) => new UserPresenter(user)))
	}

	async findOne(id: number): Promise<UserPresenter> {
		return this.prisma.user.findFirstOrThrow({
			where: { id },
			include: {
				role: true,
			}})
		.then((user) => new UserPresenter(user))
		.catch(() => {
			throw new NotFoundException('Usuário não encontrado')
		})
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		await this.findOne(id)
		await this.userExists(updateUserDto.email)

		return this.prisma.user.update({
			where: { id },
			data: updateUserDto,
		})
		.then((user) => new UserPresenter(user))
		.catch((error) => {
			throw new Error(error)
		})
	}

	private async userExists(email: string) {
		const userExists = await this.prisma.user.findUniqueOrThrow({
			where: {
				email,
			},
		})
		if (userExists) {
			throw new ConflictException('Usuário com esse email já existe')
		}
	}

	async remove(id: number) {
		await this.findOne(id)
		await this.prisma.user.delete({
			where: { id },
		})
		return 'Usuário deletado com sucesso'
	}
}
