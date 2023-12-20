import { ApiProperty } from '@nestjs/swagger';
import { IMovement } from '../interface/movement.interface';

export class MovementPresenter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  category: string;

  @ApiProperty()
  user: string;

  constructor(movement: IMovement) {
    this.id = movement.id;
    this.description = movement.description;
    this.value = movement.valueCents;
    this.type = movement.type;
    this.date = movement.date;
    this.category = movement.category.name;
    this.user = movement.user.name;
  }
}
