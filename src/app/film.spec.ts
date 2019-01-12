import {Film} from './film';

describe('Film', () => {
  it('should create an instance', () => {
    expect(new Film()).toBeTruthy();
  });
});

it('should accept values in the constructor', () => {
    const titre = '2046';
    const _annee = 2016;
    const real = {nom: 'wong kar', prenom: 'wyy'};
    const act1 = {nom: 'chung', prenom: 'fat'};

    const film = new Film({
      titre: titre,
      titreO: titre,
      annee: _annee,
      realisateur: {nom: 'wong kar', prenom: 'wyy'},
      acteurs: [{nom: 'chung', prenom: 'fat'}],
      ripped: true
    });
    expect(film.titre).toEqual(titre);
    expect(film.titreO).toEqual(titre);
    expect(film.ripped).toEqual(true);
    expect(film.realisateur.nom).toEqual(real.nom);
    expect(film.realisateur.prenom).toEqual(real.prenom);
    expect(film.realisateur.nom).toEqual(real.nom);
    expect(film.acteurs[0].nom).toEqual(act1.nom);
    expect(film.acteurs[0].prenom).toEqual(act1.prenom);
  });
