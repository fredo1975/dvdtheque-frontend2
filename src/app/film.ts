import { Personne } from './personne';
import { Dvd } from './dvd';

export class Film {

    constructor(public id: number,
        public titre: string,
        public titreO: string,
        public annee: number,
        public ripped: boolean,
        public realisateur: Personne,
        public acteurs: Personne[],
        public dvd: Dvd,
        public newActeurDtoSet: Personne[],
        public posterPath: string) {
    }
}
