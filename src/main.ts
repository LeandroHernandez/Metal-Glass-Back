import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExcetionFilter } from './common/filter/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExcetionFilter());
  app.useGlobalInterceptors(new TimeOutInterceptor());
  app.enableCors();
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Turno API')
    .setDescription('Appointment Scheduling Api')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: {
      filter: true,
    },
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
