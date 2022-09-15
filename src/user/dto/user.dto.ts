import { RoleTypeEnum } from 'src/type/RoleTypeEnum';

export class UserDTO {
  name?: string;
  lastName?: string;
  role?: RoleTypeEnum;
  email: string;
  avatar?: string;
}
