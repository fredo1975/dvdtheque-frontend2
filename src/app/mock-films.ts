import { Film } from './film';
import { Personne } from './personne';
import { Dvd } from './dvd';
import { DvdFormat } from './dvd-format.enum';
import { Genre } from './genre';

const titre = 'spider-man';
const _annee = 2016;
const real1 = new Personne(1, 'wong kar', 'wyy', 'profilePath');
const real = [real1,];
const act1 = new Personne(2, 'chung', 'fat', 'profilePath');
const act = [act1,];
const dvd = new Dvd(1, 2002, '1', 'sony', true, new Date(), DvdFormat.DVD);
const posterPath = '';
const alreadyInDvdtheque = false;
const tmdbId = 100;
const runtime = 120;
const genres: Genre[] = [new Genre(1, 'genre', 1)];
const homepage = 'spider-man';
export const FILMS: Film[] = [
  new Film(1, titre, titre, _annee, true, real, act, genres, dvd, posterPath, alreadyInDvdtheque, tmdbId, runtime, homepage),
];
