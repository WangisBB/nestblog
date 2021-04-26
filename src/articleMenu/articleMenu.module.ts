import { Module } from '@nestjs/common';
import { articleMenuController } from './articleMenu.controller';
import { articleMenuService } from './articleMenu.service';


@Module({
  controllers: [articleMenuController],
  providers: [articleMenuService]
})
export class articleMenueModule {}
