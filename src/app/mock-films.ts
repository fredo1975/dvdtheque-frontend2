import { Film } from './film';
import { Personne } from './personne';
import { Dvd } from './dvd';
import { DvdFormat } from './dvd-format.enum';

const titre = 'spider-man';
const _annee = 2016;
const real1 = new Personne(1, 'wong kar', 'wyy');
const real = [real1, ];
const act1 = new Personne(2, 'chung', 'fat');
const act = [act1, ];
const dvd = new Dvd(1, 2002, '1', 'sony', new Date(), DvdFormat.DVD);
const posterPath = '';
const alreadyInDvdtheque = false;
const tmdbId = 100;
export const FILMS: Film[] = [
  new Film(1, titre, titre , _annee, true, real, act, dvd, posterPath, alreadyInDvdtheque, tmdbId),
];
