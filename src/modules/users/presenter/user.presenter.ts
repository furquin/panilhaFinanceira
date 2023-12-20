import { ApiProperty } from '@nestjs/swagger';
import * as Interface from '../interface';

export class UserPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty({
    type: {
      id: { type: 'number' },
      name: { type: 'string' },
      slug: { type: 'string' },
    },
  })
  role?: {
    id: number;
    name: string;
    slug: string;
  };

  constructor(input: Interface.IUser) {
    this.id = input.id;
    this.name = input.name;
    this.email = input.email;
    this.role = {
      id: input?.role?.id,
      name: input?.role?.name,
      slug: input?.role?.slug,
    };
  }
}
