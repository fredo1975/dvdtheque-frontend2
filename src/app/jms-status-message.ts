import { JmsStatus } from './jms-status.enum';

export class JmsStatusMessage<T> {
    private film: T;
    private status: JmsStatus;

    constructor(_film: T, _status: JmsStatus) {
        this.film = _film;
        this.status = _status;
    }

    public static fromJson(json: Object): JmsStatusMessage<any> {
        return new JmsStatusMessage(
            json['status'], json['film']);
    }
}
