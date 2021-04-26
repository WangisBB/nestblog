import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import {join} from 'path';

async function bootstrap() {
  dotenv.config();
  // const app = await NestFactory.create(AppModule, { cors: true });
  const app =  await NestFactory.create<NestExpressApplication>(AppModule,{
    // cors: {
    //   origin: [
    //     'http://192.168.9.110:8080',
    //   ],
    //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //   preflightContinue: false,
    //   optionsSuccessStatus: 204,
    // },
    cors:true
  });
  
  app.useStaticAssets(join(__dirname,"./../../public"), {
    prefix: '/public/', // 虚拟名称 http://localhost:3010/static/...png
  });
  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.APP_PORT, () => {
    console.log('listen:http://localhost:' + process.env.APP_PORT);
  });
}

bootstrap();
