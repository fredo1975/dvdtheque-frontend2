import { Personne } from './personne';
import { Dvd } from './dvd';
import { Genre } from './genre';
import { Origine } from './enums/origine.enum';
export class Film {

    constructor(public id: number,
        public titre: string,
        public titreO: string,
        public annee: number,
        public dateSortie: Date,
        public vu: boolean,
        public realisateurs: Personne[],
        public acteurs: Personne[],
        public genres: Genre[],
        public dvd: Dvd,
        public posterPath: string,
        public alreadyInDvdtheque: boolean,
        public tmdbId: number,
        public overview: string,
        public runtime: number,
        public homepage: string,
        public origine: Origine) {
    }
}
