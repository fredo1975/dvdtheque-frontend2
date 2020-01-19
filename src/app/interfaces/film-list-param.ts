import { Personne } from '../personne';
import { Film } from '../film';
import { Genre } from '../genre';

export interface FilmListParam {
    realisateurs: Personne[];
    acteurs: Personne[];
    films: Film[];
    genres: Genre[];
    realisateursLength: number;
    acteursLength: number;
}
