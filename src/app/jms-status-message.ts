import { JmsStatus } from './jms-status.enum';

export class JmsStatusMessage<T> {
    private film: T;
    private status: JmsStatus;
    private timing;
    private statusValue;
    constructor(_status: JmsStatus, _film: T, _timing, statusValue) {
        this.film = _film;
        this.status = _status;
        this.timing = _timing;
        this.statusValue = statusValue;
    }
    public static fromJson(json: Object): JmsStatusMessage<any> {
        return new JmsStatusMessage(json['status'], json['film'], json['timing'], json['statusValue']);
    }
    public getStatusValue() {
        return this.statusValue;
    }
    public getStatus(): JmsStatus {
        return this.status;
    }
}
