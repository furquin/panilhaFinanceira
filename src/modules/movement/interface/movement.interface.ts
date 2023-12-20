import { ICategory } from 'src/modules/category/interface/category.interface';
import { IUser } from 'src/modules/users/interface';

export class IMovement {
  id: number;
  description?: string;
  valueCents: number;
  type?: string;
  date?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  userId: number;
  user: IUser;
  categoryId: number;
  category: ICategory;
}
