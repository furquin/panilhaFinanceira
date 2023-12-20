import { IMovement } from 'src/modules/movement/interface/movement.interface';
import { IRole } from './role.interface';

export interface IUser {
  id: number;
  name: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;

  role?: IRole;
  movements?: IMovement[];
}
