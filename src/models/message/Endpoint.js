export default class Endpoint {
    id = null;
    type = null;
    name = null;

    constructor({id, type, name}) {
        this.type = type;
        this.id = id;
        this.name = name;
    }

    static print(item) {
        return item.type + ':' + item.id;
    }
}
