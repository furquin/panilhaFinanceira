import { IRole } from 'src/modules/users/interface';
import { UserPresenter } from 'src/modules/users/presenter/user.presenter';

export class AuthPresenter {
  user: UserPresenter;
  role: IRole;

  constructor(input: any) {
    this.user = new UserPresenter(input.user);
    this.role = input.role;
  }
}
