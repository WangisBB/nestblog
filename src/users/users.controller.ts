import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Req,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './../auth/auth.service';
import { UserLoginDto, UserRegisterDto } from './dto/user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserGetInterface } from './interface/user.interface';


@ApiTags('用户')
@Controller('user')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Post('register')
  @ApiOperation({
    summary: '注册',
  })
  @HttpCode(200)
  async register(@Body() params: UserRegisterDto): Promise<object> {
    const resData = await this.userService.userRegister(params);
    return resData;
  }

  @Post('login')
  @ApiOperation({
    summary: '登录',
  })
  @HttpCode(200)
  @UseGuards(AuthGuard('local'))

  async login(@Body() params:UserLoginDto, @Req() req): Promise<object> {
    const user = req.user;
    user.token = await this.authService.login(params).catch(err => err);
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getUserInfo')
  @ApiOperation({
    summary: '获取用户信息',
  })
  @HttpCode(200)
  @ApiBearerAuth()
  async getUserInfo(
    @Query() params: UserGetInterface,
    @Req() req,
  ): Promise<UserGetInterface> {
    return await this.userService.getUser(params);
  }
@UseGuards(AuthGuard('jwt'))
  @Put('updateUserInfo')
  @ApiOperation({
    summary: '更新用户信息',
  })
  @HttpCode(200)
  @ApiBearerAuth()
  async updateUserInfo(@Body() params): Promise<UserGetInterface> {
    const resData = await this.userService.userInfoUpdate(params);
    return resData;
  }
}
