import { Personne } from './personne';
import { Origine } from './origine.enum';
import { FilmDisplayType } from './film-display-type.enum';

export class FilmSearch {
    constructor(public titre: string = '',
        public annee: number,
        public ripped: boolean,
        public realisateur: Personne,
        public acteur: Personne,
        public genre: string = '',
        public vu: boolean,
        public origine: Origine,
        public displayType: FilmDisplayType) {
    }
}
