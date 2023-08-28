import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { AppModule } from '../../src/app.module';


describe('PostController (e2e)', () => {
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

    it('POST /posts => should media sucessfully', async ()=>{
        const response = await request(app.getHttpServer()).post('/posts')
          .send({
            "title": "test",
            "text": "test",
          })
    
          expect(response.status).toBe(HttpStatus.CREATED)  
    
      })
      it('POST /posts => should media fail 400', async ()=>{
        const response = await request(app.getHttpServer()).post('/posts')
          .send({
            "title": "",
            "text": "",
          })
  
          expect(response.status).toBe(HttpStatus.BAD_REQUEST)

      })

      it('/posts => should media sucessfully', async () => {
        const response = await request(app.getHttpServer()).get('/posts')
          expect(response.status).toBe(HttpStatus.OK)

      });


      it('DELETE /posts/:id => should delete post successfully', async () => {
        // Primeiro, você precisa criar um post para obter seu ID
        const createResponse = await request(app.getHttpServer()).post('/posts')
          .send({
            "title": "test",
            "text": "test",
          });
      
        const postId = createResponse.body.id;
      
        // Em seguida, faça a requisição DELETE para remover o post
        const deleteResponse = await request(app.getHttpServer()).delete(`/posts/${postId}`);
      
        expect(deleteResponse.status).toBe(HttpStatus.NO_CONTENT);
      
        // Verifique se o post foi realmente excluído do banco de dados
        const deletedPost = await prisma.post.findUnique({
          where: {
            id: postId,
          },
        });
      
        expect(deletedPost).toBe(null);
      });


      it('PUT /posts/:id => should update post successfully', async () => {
        // Primeiro, você precisa criar um post para obter seu ID
        const createResponse = await request(app.getHttpServer()).post('/posts')
          .send({
            "title": "test",
            "text": "test",
          });
      
        const postId = createResponse.body.id;
      
        // Em seguida, faça a requisição PUT para atualizar o post
        const updateResponse = await request(app.getHttpServer()).put(`/posts/${postId}`)
          .send({
            "title": "Updated Title",
            "text": "Updated Text",
          });
      
        expect(updateResponse.status).toBe(HttpStatus.NO_CONTENT);
      
        // Verifique se o post foi realmente atualizado no banco de dados
        const updatedPost = await prisma.post.findUnique({
          where: {
            id: postId,
          },
        });
      
        expect(updatedPost.title).toBe("Updated Title");
      });

      it('GET /posts/:id => should get post by ID', async () => {
        // Primeiro, você precisa criar um post para obter seu ID
        const createResponse = await request(app.getHttpServer()).post('/posts')
          .send({
            "title": "test",
            "text": "test",
          });
      
        const postId = createResponse.body.id;
      
        // Em seguida, faça a requisição GET pelo ID do post criado
        const getByIdResponse = await request(app.getHttpServer()).get(`/posts/${postId}`);
      
        expect(getByIdResponse.status).toBe(HttpStatus.OK);
      });
      
      
});