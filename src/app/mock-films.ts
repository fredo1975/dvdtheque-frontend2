import { Film } from './film';

export const FILMS: Film[] = [
  { id: 1, titre: '2046', titreO: '', annee: 2008, ripped: true,
  acteurs: [{id: 1, nom: 'chung yu fat', prenom: 'fat yu'}],
  realisateur: {id: 2, nom: 'chung', prenom: 'fat yu'} },
  { id: 2, titre: 'spider-man', titreO: '', annee: 2012, ripped: false,
  acteurs: [{id: 3, nom: 'macguire', prenom: 'tobby '}],
  realisateur: {id: 3, nom: 'rami', prenom: 'sam'} }
];
