import { DvdFormat } from './dvd-format.enum';

export class Dvd {
    id: number;
    annee: number;
    zone: string;
    edition: string;
    ripped: boolean;
    dateRip: Date;
    format: DvdFormat;
    constructor(id: number,
        annee: number,
        zone: string,
        edition: string,
        ripped: boolean,
        dateRip: Date,
        format: DvdFormat) {
    }
    public static fromJson(json: Object): Dvd {
        return new Dvd(
            json['id'],
            json['annee'],
            json['zone'],
            json['edition'],
            json['ripped'],
            json['dateRip'],
            json['format']);
    }
}
