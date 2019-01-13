import { Personne } from './personne';

export class Film {

    constructor(public id: number,
        public titre: string,
        public titreO: string,
        public annee: number,
        public ripped: boolean,
        public realisateur: Personne,
        public acteurs: Personne[]) {
    }

    public static fromJson(json: Object): Film {
        return new Film(
            json['id'],
            json['titre'],
            json['titreO'],
            json['annee'],
            json['ripped'],
            json['realisateur'],
            json['acteurs'],
        );
    }

    public getTitre(): string {
        return this.titre;
    }
}
