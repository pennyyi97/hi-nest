import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll() {
        return this.movies;
    }

    getOne(id){
        return this.movies.find(movie => movie.id === +id);
        // return this.movies.find(movie => movie.id === parseInt(id));
    }

    deleteOne(id){
        this.movies.filter(movie=> movie.id !== +id);
        return true;
    }

    create(movieData){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }
}
