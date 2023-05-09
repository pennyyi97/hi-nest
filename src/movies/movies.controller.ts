import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    
    @Get()
    getAll(){
        return 'This will return all movies';
    }

    @Get('search') //:id 밑에 있으면 nest가 search를 id값으로 인식
    search(@Query('year') searchingYear){
        return`We are searching for a movie made after: ${searchingYear}`;
    }

    @Get(':id')
    getOnt(@Param("id")id){
        return `This will return one movie with the id: ${id}`;
    }

    @Post()
    create(@Body() movieData){
        return movieData;
    }

    @Delete(':id')
    remove(@Param('id') movieId){
        return `This will delete a movie with the id: ${movieId}`;
    }

    @Patch(':id') //리소스의 일부분만 업데이트
    path(@Param('id')movieId, @Body() updateData){
        return {
            updateedMovie: movieId,
            ...updateData,
        };
    }

    
}

