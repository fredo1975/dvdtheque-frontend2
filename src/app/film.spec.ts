import { Film } from './film';
import { Personne } from './personne';
import { Dvd } from './dvd';
import { Genre } from './genre';
import { DvdFormat } from './dvd-format.enum';

const titre = 'spider-man';
const _annee = 2016;
const real = new Personne(1, 'wong kar', 'wyy', 'profile_path');
const real1 = [real,];
const act1 = new Personne(2, 'chung', 'fat', 'profile_path');
const act = [act1,];
const genre = new Genre(1, 'comedy', 1);
const posterPath = 'fake';
const dvd = new Dvd(1, 2019, '1', '1', true, new Date(), DvdFormat.DVD);
const alreadyInDvdtheque = false;
const tmdbId = 100;
const runtime = 120;
const homepage = 'homepage';

describe('Film', () => {
  it('should create an instance', () => {
    // tslint:disable-next-line:max-line-length
    expect(new Film(1, titre, titre, _annee, true, real1, act, genre, dvd, posterPath, alreadyInDvdtheque, tmdbId, runtime, homepage)).toBeTruthy();
  });
});

it('Film should accept values in the constructor', () => {
  const film = new Film(1, titre, titre, _annee, true, real1, act, genre, dvd, posterPath, alreadyInDvdtheque, tmdbId, runtime, homepage);
  expect(film.titre).toEqual(titre);
  expect(film.titreO).toEqual(titre);
  expect(film.ripped).toEqual(true);
  expect(film.realisateurs[0].nom).toEqual(real.nom);
  expect(film.acteurs[0].nom).toEqual(act1.nom);
  expect(film.alreadyInDvdtheque).toEqual(alreadyInDvdtheque);
});
