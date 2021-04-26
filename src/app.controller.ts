import { Controller, Get,HttpCode, Request,Body, Post, UseGuards,Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserLoginDto } from './users/dto/user.dto';
import { AuthService } from './auth/auth.service';
import { ApiBearerAuth,ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
@Controller()
@ApiTags('系统')
export class AppController {
  constructor(private readonly authService: AuthService) {}
 
}
