import { Personne } from './personne';

export class Film {
    id: number;
    titre: string;
    titreO: string;
    annee: number;
    ripped: boolean;
    realisateur: Personne;
    acteurs: Personne[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
