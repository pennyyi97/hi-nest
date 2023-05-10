import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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
          geners: ['test']
        })
        .expect(201);
    });

    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404);
    })
  });

});
