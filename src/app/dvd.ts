export class Dvd {
    id: number;
    annee: number;
    zone: String;
    edition: String;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}
