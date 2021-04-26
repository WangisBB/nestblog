/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/7 13:11
 */

/**
 * 获取用户信息
 * */
import { ApiProperty } from '@nestjs/swagger';
export class UserGetInterface {
  @ApiProperty({ required: false })
  readonly id: number;
  @ApiProperty({ required: false })
  readonly username: string;

  readonly nickname: string;

  readonly avatar: string;
  readonly signature: string;
}
