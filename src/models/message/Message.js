import Endpoint from "./Endpoint";

export default class Message {
    id = null;
    type = null;
    sender = null;
    send = null;
    data = null;
    read = 0;

    static _stompFields() {
        return ['id', 'type', 'sender', 'addressee', 'send', 'payload'];
    }

    static validStompMessage(stompMessage, userId) {
        const fn = Object.hasOwnProperty.bind(stompMessage);
        const fields = this._stompFields();

        if (!fields.every(fn)) {
            return false;
        }

        const addressee = stompMessage.addressee;

        if ('USER' !== addressee.type || (0 < addressee.id && userId !== addressee.id)) {
            return false;
        }

        return true;
    }

    static fromStompMessage(stompMessage, readed) {
        const msg = new this();

        msg.id = stompMessage.type + '-' + stompMessage.id;
        msg.type = stompMessage.type;
        msg.sender = new Endpoint(stompMessage.sender);
        msg.send = stompMessage.send;
        msg.data = stompMessage.payload.data;
        msg.read = readed;

        return msg;
    }

    static isUnread(msg) {
        return 0 === msg.read;
    }

    static setReaded(msg) {
        msg.read = 1;
    }

    same(msg) {
        return this.id === msg.id;
    }
}
