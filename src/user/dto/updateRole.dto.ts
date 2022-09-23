import { RoleTypeEnum } from 'src/type/RoleTypeEnum';

export interface UpdateRoleDTO {
  userId: number;
  role: RoleTypeEnum;
}
