import { Personne } from './personne';

export class Film {

    constructor(public id: number,
        public titre: string,
        public titreO: string,
        public annee: number,
        public ripped: boolean,
        public realisateur: Personne,
        public acteurs: Personne[],
        public newActeurDtoSet: Personne[]) {
    }
}
