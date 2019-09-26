import { JmsStatus } from './jms-status.enum';

export class JmsStatusMessage<T> {
    private film: T;
    private status: JmsStatus;
    private timing;
    constructor(_status: JmsStatus, _film: T, _timing) {
        this.film = _film;
        this.status = _status;
        this.timing = _timing;
    }

    public static fromJson(json: Object): JmsStatusMessage<any> {
        return new JmsStatusMessage(json['status'], json['film'], json['timing']);
    }
}
