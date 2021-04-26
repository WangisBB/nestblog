import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';
import { User } from './entity/user.entity';
import { Link } from './entity/link.entity';
import { Tag } from './entity/tag.entity';
import { Comment } from './entity/comment.entity';
import { Category } from './entity/category.entity';
import { Config } from './entity/config.entity';
import { ArtcleMenu } from './entity/artcleMenu.entity';

const entityArr = [User, Article, Link, Tag, Comment, Category, Config,ArtcleMenu];

const entity = TypeOrmModule.forFeature(entityArr);

@Global()
@Module({
  imports: [
    entity,
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.Db_HOST,
    //   port: Number(process.env.Db_PORT),
    //   username: 'root',
    //   password: 'admin',
    //   database: 'test',
    //   entities: entityArr,
    //   synchronize: true,
    // }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'mysql',
          host: process.env.Db_HOST,
          port: Number(process.env.Db_PORT),
          username:process.env.Db_USERNAME ,
          password:process.env.Db_PASS,
          database:process.env.Db_BATABASE,
          entities: entityArr,
          synchronize: true,
        };
      },
    }),
  ],
  providers: [],
  exports: [entity],
})
export class DbModule {}
