import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from 'libs/db/Mysql/src/index';

import { ArticleModule } from './article/article.module';
// import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';
// import { ServeStaticModule} from '@nestjs/serve-static';

// import { join } from 'path'
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { articleMenueModule } from './articleMenu/articleMenu.module';
// ServeStaticModule.forRoot({
//   rootPath: join(__dirname,"./../../public"),
// })
@Module({
  imports: [DbModule, ArticleModule,UploadModule, AuthModule, UsersModule,articleMenueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
