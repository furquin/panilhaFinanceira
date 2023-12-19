import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthPresenter } from '../auth/presenter/auth.presenter';
import { Auth, GuardRoute } from '../auth/auth.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @GuardRoute('category.create')
  create(@Auth() auth:AuthPresenter, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(auth, createCategoryDto);
  }

  @Get()
  @GuardRoute('category.read')
  findAll(@Auth() auth:AuthPresenter) {
    return this.categoryService.findAll(auth);
  }

  @Patch(':id')
  @GuardRoute('category.update')
  update(@Auth() auth: AuthPresenter, @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(auth, +id, updateCategoryDto);
  }

  @Delete(':id')
  @GuardRoute('category.delete')
  remove(@Auth() auth: AuthPresenter, @Param('id') id: string) {
    return this.categoryService.remove(auth, +id);
  }
}
