import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes( new ValidationPipe({ //main에서 추가해준 pipe 를 test에도 동일하게 넣어주어야 올바른 테스트 진행 가능
      whitelist:true,
      forbidNonWhitelisted: true,
      transform: true, 
    }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/movies', () =>{
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
        //expected [ { id: 1 } ] response body, got [] 
        //[]로 받았는데 [ { id: 1 } ]랑 같냐고 비교해서 에러 발생
    });

    it('POST', () =>{
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title:'Test',
          year: 2000,
          genres: ['test']
        })
        .expect(201);
    });

    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404);
    })
  });

  describe('/movies/:id', () =>{
    it("GET 200", () =>{
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200)
    });
    it('GET 404', () => {
      return request(app.getHttpServer())
        .get('/movies/999')
        .expect(404)
    })
    it.todo("DELETE");
    it.todo("PATCH");
  })
});
