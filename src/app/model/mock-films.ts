import { Film } from './film';
import { Personne } from './personne';
import { Dvd } from './dvd';
import { DvdFormat } from './dvd-format.enum';
import { Genre } from './genre';
import { Origine } from './origine.enum';
import { CritiquePresse } from './critique-presse';

const titre = 'spider-man';
const _annee = 2016;
const real1 = new Personne(1, 'wong kar', 'wyy', 'profilePath');
const real = [real1,];
const act1 = new Personne(2, 'chung', 'fat', 'profilePath');
const act = [act1];
const critiquesPresse = { id: 2, code: 1, newsSource: 'fat', author: 'profile_path', body: 'fake', rating: 5 } as CritiquePresse;
const critiquesPresseArr = [critiquesPresse,];
const dvd = new Dvd(2002, '1', 'sony', true, new Date(), new Date(), DvdFormat.DVD);
const posterPath = '';
const alreadyInDvdtheque = false;
const tmdbId = 100;
const runtime = 120;
const genres: Genre[] = [new Genre(1, 'genre', 1)];
const homepage = 'spider-man';
const overview = 'overview';
const dateSortie: Date = new Date();
export const FILMS: Film[] = [
  // tslint:disable-next-line:max-line-length
  new Film(1, titre, titre, _annee, dateSortie, dateSortie, true, real, act, critiquesPresseArr, genres, dvd, posterPath, alreadyInDvdtheque, tmdbId, overview, runtime, homepage, Origine.DVD),
];
