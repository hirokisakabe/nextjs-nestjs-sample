import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '../src/app.module';
import { NestFactory } from '@nestjs/core';

const exportOAS = async () => {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Backend')
    .setDescription('Backend API definition')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const yamlDocument = yaml.dump(document, {
    skipInvalid: true,
    noRefs: true,
  });

  const yamlPath = path.join(__dirname, '..', 'openapi.yaml');

  fs.writeFileSync(yamlPath, yamlDocument);
};

(async () => await exportOAS())();
