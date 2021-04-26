import { Injectable,BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
const md5 = require('md5');
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const pwd = md5(process.env.AUTH_PWD_SALT + pass);
    const user = await this.usersService.findOne(username);
    if (user && user.password === pwd) {
      const { password, ...result } = user;
      return result;
    }
     throw new BadRequestException('账号或密码错误');
  }

  async login(user) {
    const payload = { username: user.username, password: user.password };

    return this.jwtService.sign(payload)
   
  }
}