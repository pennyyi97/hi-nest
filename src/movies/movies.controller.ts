import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService){}

    @Get()
    getAll(){
        return this.moviesService.getAll();
    }

    @Get('search') //:id 밑에 있으면 nest가 search를 id값으로 인식
    search(@Query('year') searchingYear){
        return`We are searching for a movie made after: ${searchingYear}`;
    }

    @Get(':id')
    getOnt(@Param("id") movieId:number){
        console.log(typeof movieId);
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto){
        movieData
        return this.moviesService.create(movieData);
    }

    @Delete(':id')
    remove(@Param('id') movieId: number){
        return this.moviesService.deleteOne(movieId);
    }

    @Patch(':id') //리소스의 일부분만 업데이트
    path(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto){
        return this.moviesService.update(movieId, updateData);
    }

    
}

