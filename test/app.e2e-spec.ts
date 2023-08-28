import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaModule } from '../src/prisma/prisma.module';
import { PrismaService } from '../src/prisma/prisma.service';

import { AppModule } from './../src/app.module';



describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma:PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = app.get(PrismaService);

    await prisma.media.deleteMany();
    await prisma.post.deleteMany();
    await prisma.publication.deleteMany();
    await app.init();
  });

  it('/health => should get an alive message', async () => {
    const response = await request(app.getHttpServer()).get('/health')
      expect(response.status).toBe(HttpStatus.OK)
      expect(response.text).toBe('I’m okay!');
  });

});