export default class TreeTableItem {

    key = null;
    data = {};
    children = [];
    leaf = true;

    build(data) {
        this.key = data['id']?data['id']: this.key;
        this.data = data?data:this.data;
        this.leaf = data.hasOwnProperty('leaf')?data['leaf']:this.leaf;
        this.leaf = false;
        this.children = data['children']?data['children']:this.children;
        return this;
    }

}