export class Personne {
    constructor(public id: number,
        public nom: string,
        public prenom: string,
        public profilePath: string) {
    }
    public static fromJson(json: Object): Personne {
        return new Personne(
            json['id'],
            json['nom'],
            json['prenom'],
            json['profilePath']);
    }
}
