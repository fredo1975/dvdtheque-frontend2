export class Dvd {
    id: number;
    annee: number;
    zone: string;
    edition: string;
    dateRip: Date;
    constructor(id: number,
        annee: number,
        zone: string,
        edition: string,
        dateRip: Date) {
    }
    public static fromJson(json: Object): Dvd {
        return new Dvd(
            json['id'],
            json['annee'],
            json['zone'],
            json['edition'],
            json['dateRip']);
    }
}
