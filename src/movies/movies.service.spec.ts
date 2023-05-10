import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import exp from 'constants';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it('should return an array', () =>{
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array); //getAll이 배열을 return 하는지 테스트
    })
  });

  describe('getOne', () =>{
    
    it('should return a movie', ()=>{
      service.create({
        title: "Test Movie",
        geners: ['test'],
        year: 2000
      });
      const movie = service.getOne(1);

      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () =>{
      try{
        service.getOne(999); //앞에서 정의한 not found exception이 제대로 작동하는 지 확인
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with Id 999 not found.')
      }
    });
  });

  describe('deleteOne', () =>{
    it('deletes a movie', () => {
      service.create({
        title: "Test Movie",
        geners: ['test'],
        year: 2000
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('should return a 404', () =>{
      try{
        service.deleteOne(999);
      } catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () =>{
      const beforeCreate = service.getAll().length;

      service.create({
        title: "Test Movie",
        geners: ['test'],
        year: 2000
      });

      const afterCreate = service.getAll().length;
      // console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () =>{
    it('should update a movie', () =>{
      service.create({
        title: "Test Movie",
        geners: ['test'],
        year: 2000
      });
      service.update(1, {title:'Updated Test'});
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });
    it('should throw a NotFoundException', () =>{
      try{
        service.update(999, {});
      } catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
