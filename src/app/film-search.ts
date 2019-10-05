import { Personne } from './personne';

export class FilmSearch {
    constructor(public titre: string = '',
        public annee: number,
        public ripped: boolean,
        public realisateur: Personne,
        public acteur: Personne,
        public genre: string = '',
        public vu: boolean) {
    }
}
