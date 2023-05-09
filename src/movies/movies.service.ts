import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll() {
        return this.movies;
    }

    getOne(id:number){
        const movie =  this.movies.find(movie => movie.id === id);
        if (!movie){
            throw new NotFoundException(`Movie with Id ${id} not found,`);
        }
        return movie;
    }

    deleteOne(id:number){
        this.getOne(id);
        this.movies = this.movies.filter(movie=> movie.id !== +id);
    }

    create(movieData){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }

    update(id:number, updateData) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData });
    }
}
