import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const fs = require('fs');
  let options = { bodyParser: true };

  // add production build
  if (true) {
    const keyFile = fs.readFileSync(
      __dirname.replace('/dist', '') + '/cert/key.pem',
    );
    ///Users/borismatyunin/Documents/Work/ITRUM_TRACKER/project-name/cert/tracker.ru-key.pem
    ///Users/borismatyunin/Documents/Work/ITRUM_TRACKER/project-name/cert/tracker.ru.key.pem
    const certFile = fs.readFileSync(
      __dirname.replace('/dist', '') + '/cert/cert.pem',
    );

    options = {
      ...options,
      ...{
        httpsOptions: {
          key: keyFile,
          cert: certFile,
        },
      },
    };
  }

  const app = await NestFactory.create(AppModule, options);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders:
      'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for',
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT);
}
bootstrap();
