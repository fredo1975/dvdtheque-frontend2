export class Genre {
    private id: number;
    public name: string;
    private tmdbId: number;
    constructor(_id: number, public _name: string, _tmdbId: number) {
        this.id = _id;
        this.name = _name;
        this.tmdbId = _tmdbId;
    }
    public static fromJson(json: Object): Genre {
        return new Genre(json['id'], json['name'], json['tmdbId']);
    }
    public getName() {
        return this.name;
    }
}
