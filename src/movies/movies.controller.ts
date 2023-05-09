import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    
    @Get()
    getAll(){
        return 'This will return all movies';
    }

    @Get('/:id')
    getOnt(@Param("id")id){
        return `This will return one movie with the id: ${id}`;
    }

    @Post()
    create(){
        return 'This will create a movie';
    }

    @Delete('/:id')
    remove(@Param('id') movieId){
        return `This will delete a movie with the id: ${movieId}`;
    }

    @Patch('/:id') //리소스의 일부분만 업데이트
    path(@Param('id')movieId){
        return `This will patch a movie with the id: ${movieId}`;
    }
}

