import { ApiProperty } from '@nestjs/swagger';
import { RoleTypeEnum } from 'src/type/RoleTypeEnum';

export class UpdateRoleDTO {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  userId: number;

  @ApiProperty({
    type: String,
    example: RoleTypeEnum.ADMIN,
  })
  role: RoleTypeEnum;
}
