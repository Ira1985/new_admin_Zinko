export default class BaseColumn {

    field = null;
    header = null;
    style = {};
    sortable = false;
    order = 1;
    default = false;
    widthCoef = 1;

    build(item) {
        this.field = item['field']?item['field']:null;
        this.header = item['header']?item['header']:null;
        this.style = item['style']?item['style']:{};
        this.sortable = (item.hasOwnProperty('sortable') && item['sortable'])?item['sortable']:false;
        this.default = (item.hasOwnProperty('default') && item['default'])?item['default']:false;
        this.order = (item['order'] && item['order'] >= 0)?item['order']:1;
        this.widthCoef = (item['widthCoef'] && item['widthCoef'] >= 0)?item['widthCoef']:1;
        return this;
    }

}