import { ApiProperty } from '@nestjs/swagger';
import { ICategory } from '../interface/category.interface';

export class CategoryPresenter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
  constructor(category: ICategory) {
    this.id = category.id;
    this.name = category.name;
  }
}
