import { ApiProperty } from '@nestjs/swagger';
import { UserPresenter } from 'src/modules/users/presenter/user.presenter';

export class LoginPresenter {
  @ApiProperty()
  user: UserPresenter;
  @ApiProperty()
  token: string;
  constructor(user: UserPresenter, token: string) {
    this.user = user;
    this.token = token;
  }
}
