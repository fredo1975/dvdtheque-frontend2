import {Film} from './film';
import { Personne } from './personne';

const titre = 'spider-man';
const _annee = 2016;
const real = new Personne(1, 'wong kar', 'wyy');
const act1 = new Personne(2, 'chung', 'fat');
const act = [act1, ];

describe('Film', () => {
  it('should create an instance', () => {
    expect(new Film(1, titre, titre, _annee, true, real, act)).toBeTruthy();
  });
});

it('Film should accept values in the constructor', () => {
    const film = new Film(1, titre, titre, _annee, true, real, act);
    expect(film.titre).toEqual(titre);
    expect(film.titreO).toEqual(titre);
    expect(film.ripped).toEqual(true);
    expect(film.realisateur.nom).toEqual(real.nom);
    expect(film.realisateur.prenom).toEqual(real.prenom);
    expect(film.realisateur.nom).toEqual(real.nom);
    expect(film.acteurs[0].nom).toEqual(act1.nom);
    expect(film.acteurs[0].prenom).toEqual(act1.prenom);
  });
