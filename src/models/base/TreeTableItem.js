export default class TreeTableItem {

    key = null;
    columnKey = null;
    data = {};
    children = null;
    leaf = true;

    build(data) {
        this.key = data['id']?data['id']: this.key;
        this.columnKey = data['id']?data['id']: this.columnKey;
        this.data = data?data:this.data;
        this.leaf = data.hasOwnProperty('leaf')?data['leaf']:this.leaf;
        this.children = data['children']?data['children']:this.children;
        return this;
    }

}