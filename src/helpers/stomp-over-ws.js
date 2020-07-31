import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Message from "../models/message/Message";

let socket;
let stompClient;
let storageKey;

const csWSProto = window.location.protocol;
const csWSHost = window.location.hostname;
const csWSPort = '8080';
const csWSPath = '/ws';
const csWSAuthParam = 'tk';

//Important: Value of topic and subscription must be synchronized with server side
const stompTopic = (userId) => '/topic/pushNotification/' + userId;
const stompSubscription = (userId) => 'm-' + userId;
const localStorageKey = (userId) => 'rusclimatcs-messages.' + userId;

const addToLocalStorage = (messages) => {
    const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');

    stored.unshift.apply(stored, messages);

    if (stored.length > 100) {
        //TODO first drop readed messages, then if not enough drop eldest
        stored.splice(100);
    }

    localStorage.setItem(storageKey, JSON.stringify(stored));
};

const processMessage = (stompMessage, userId) => {
    // Check message consistency
    if (!Message.validStompMessage(stompMessage, userId)) {
        console.warn('Invalid stomp message: ', stompMessage);

        return;
    }

    const msg = Message.fromStompMessage(stompMessage, 0);
    // addToMessages([msg]);
    addToLocalStorage([msg]);
};

const _sameMessage = function _sameMessage(msg) { return this.id === msg.id };
const _setRead = function(msg) {
    if (this.find(_sameMessage, msg)) {
        Message.setReaded(msg);
    }
};

const init = ({jwt, userId}) => {
    const csWSUrl = `${csWSProto}//${csWSHost}:${csWSPort}${csWSPath}?${csWSAuthParam}=${jwt}`;
    const options = {
        //Important: Value of sessionId must be synchronized with server side
        sessionId: () => jwt.substring(jwt.length - 10),
        transports: ['websocket'],
    };

    storageKey = localStorageKey(userId);
    socket = new SockJS(csWSUrl, undefined, options);
    stompClient = Stomp.over(socket);
};

export const setMessagesReaded = (messages) => {
    const storageEntry = localStorage.getItem(storageKey);

    if (storageEntry) {
        const storedLocal = JSON.parse(storageEntry);

        if (storedLocal.length) {
            const fn = messages && messages.length ? _setRead : Message.setReaded;
            storedLocal.forEach(fn, messages || []);
            localStorage.setItem(storageKey, JSON.stringify(storedLocal));
        }

        return storedLocal;
    }

    return [];
};

export const connect = (options) => {
    if (!stompClient) {
        init(options);
    } else if (stompClient.connected) {
        disconnect({cb: connect.bind(this, options)});
    } else {
        delete stompClient.ws;
        stompClient = null;
        socket = null;
        storageKey = null;
        init(options);
    }

    stompClient.connect({}, (frame) => {
        stompClient.subscribe(stompTopic(options.userId), (notification) => {
            // TODO goncharov: put notification into store
            //ack: Function
            //body: String
            //command: String, (MESSAGE, DISCONNECT, ...)
            //headers: Object
            //nack: Function
            console.log(notification);
            if ('MESSAGE' === notification.command) {
                const message = JSON.parse(notification.body);
                processMessage(message, options.userId);
            }
        }, {
            id: stompSubscription(options.userId),
        });
    });
};

export const disconnect = (options) => {
    if (stompClient && stompClient.connected) {
        const cb = options && options.cb;
        stompClient.disconnect(() => {
            console.log('STOMP DISCONNECTED =================');
            if (cb) cb();
        });
    }
};

export const getStoredMessages = () => {
    const res = {
        hasUnread: false,
        items: [],
    };
    const storageEntry = localStorage.getItem(storageKey);

    if (storageEntry) {
        const storedLocal = JSON.parse(storageEntry);

        if (storedLocal.length) {
            res.hasUnread = storedLocal.some(Message.isUnread);
            res.items = storedLocal;
        }
    }

    return res;
};

export const removeMessages = (messages) => {
    if (!messages || !messages.length) {
        localStorage.setItem(storageKey, '[]');

        return [];
    }

    const {items} = getStoredMessages();

    if (items.length) {
        let needSave = false;
        messages.forEach(msg => {
            const index = items.findIndex(_sameMessage, msg);

            if (-1 < index) {
                items.splice(index, 1);
                needSave = true;
            }
        });

        if (needSave) {
            localStorage.setItem(storageKey, JSON.stringify(items));
        }
    }

    return items;
};
