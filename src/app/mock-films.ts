import { Film } from './film';
import { Personne } from './personne';
import { Dvd } from './dvd';

const titre = 'spider-man';
const _annee = 2016;
const real = new Personne(1, 'wong kar', 'wyy');
const act1 = new Personne(2, 'chung', 'fat');
const act = [act1, ];
const dvd = new Dvd(1, 2002, '1', 'sony');
const newActeurDtoSet = [];
const posterPath = '';

export const FILMS: Film[] = [
  new Film(1, titre, titre , _annee, true, real, act, dvd, newActeurDtoSet, posterPath),
];
