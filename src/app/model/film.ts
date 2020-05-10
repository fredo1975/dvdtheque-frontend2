import { Personne } from './personne';
import { Dvd } from './dvd';
import { Genre } from './genre';
import { Origine } from './origine.enum';
import { CritiquesPresse } from './critiques-presse';
import { SafeUrl } from '@angular/platform-browser';
export class Film {

    constructor(public id: number,
        public titre: string,
        public titreO: string,
        public annee: number,
        public dateSortie: Date,
        public dateInsertion: Date,
        public vu: boolean,
        public realisateurs: Personne[],
        public acteurs: Personne[],
        public critiquesPresse: CritiquesPresse[],
        public genres: Genre[],
        public dvd: Dvd,
        public posterPath: string,
        public poster: SafeUrl,
        public alreadyInDvdtheque: boolean,
        public tmdbId: number,
        public overview: string,
        public runtime: number,
        public homepage: string,
        public origine: Origine) {
    }
}
