import BaseColumn from "./BaseColumn";

export default class TreeColumn extends BaseColumn{

    expander = true;

    build(item) {
        super.build(item);
        this.expander = item.hasOwnProperty('expander')?item['expander']:false;
        //this.body = item.hasOwnProperty('body')?item['body']:false;
        return this;
    }

}