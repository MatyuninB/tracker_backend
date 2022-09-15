import { RoleTypeEnum } from 'src/type/RoleTypeEnum';

export interface UpdateRoleDTO {
  userId: string;
  role: RoleTypeEnum;
}
