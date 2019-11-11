import { Personne } from './personne';
import { Dvd } from './dvd';
import { Genre } from './genre';

export class Film {

    constructor(public id: number,
        public titre: string,
        public titreO: string,
        public annee: number,
        public vu: boolean,
        public realisateurs: Personne[],
        public acteurs: Personne[],
        public genres: Genre[],
        public dvd: Dvd,
        public posterPath: string,
        public alreadyInDvdtheque: boolean,
        public tmdbId: number,
        public runtime: number,
        public homepage: string) {
    }
}
