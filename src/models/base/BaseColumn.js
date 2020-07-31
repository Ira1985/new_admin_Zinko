export default class BaseColumn {

    field = null;
    header = null;
    style = {};
    bodyStyle = {};
    sortable = false;
    order = 1;
    default = false;
    widthCoef = 1;
    renderer = null;
    actionColumn = false;
    actionWidth = 0;

    build(item) {
        this.field = item['field']?item['field']:null;
        this.header = item['header']?item['header']:null;
        this.style = item['style']?item['style']:{};
        this.bodyStyle = item['style']?item['style']:{};
        this.sortable = (item.hasOwnProperty('sortable') && item['sortable'])?item['sortable']:false;
        this.default = (item.hasOwnProperty('default') && item['default'])?item['default']:false;
        this.order = (item['order'] && item['order'] >= 0)?item['order']:1;
        this.widthCoef = (item['widthCoef'] && item['widthCoef'] >= 0)?item['widthCoef']:1;
        this.renderer = (item.hasOwnProperty('renderer'))?item['renderer']:null;
        this.actionColumn = (item.hasOwnProperty('actionColumn') && item['actionColumn'])?item['actionColumn']:false;
        this.actionWidth = (item.hasOwnProperty('actionWidth'))?item['actionWidth']:0
        return this;
    }

}