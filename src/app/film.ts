import { Personne } from './personne';
import { Dvd } from './dvd';

export class Film {

    constructor(public id: number,
        public titre: string,
        public titreO: string,
        public annee: number,
        public ripped: boolean,
        public realisateurs: Personne[],
        public acteurs: Personne[],
        public dvd: Dvd,
        public posterPath: string,
        public alreadyInDvdtheque: boolean,
        public tmdbId: number) {
    }
}
