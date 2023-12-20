import { ApiProperty } from '@nestjs/swagger';
import { UserPresenter } from 'src/modules/users/presenter/user.presenter';

export class LoginPresenter {
  user: UserPresenter;

  token: string;
  constructor(user: UserPresenter, token: string) {
    this.user = user;
    this.token = token;
  }
}
