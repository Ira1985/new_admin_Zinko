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
    actions = null;

    build(item) {
        this.field = item['field']?item['field']:this.field;
        this.header = item['header']?item['header']:this.header;
        this.style = item['style']?item['style']:this.style;
        this.bodyStyle = item['style']?item['style']:this.bodyStyle;
        this.sortable = (item.hasOwnProperty('sortable') && item['sortable'])?item['sortable']:this.sortable;
        this.default = (item.hasOwnProperty('default') && item['default'])?item['default']:this.default;
        this.order = (item['order'] && item['order'] >= 0)?item['order']:this.order;
        this.widthCoef = (item['widthCoef'] && item['widthCoef'] >= 0)?item['widthCoef']:this.widthCoef;
        this.renderer = (item.hasOwnProperty('renderer'))?item['renderer']: this.renderer;
        this.actionColumn = (item.hasOwnProperty('actionColumn') && item['actionColumn'])?item['actionColumn']: this.actionColumn;
        this.actionWidth = (item.hasOwnProperty('actionWidth'))?item['actionWidth']:this.actionWidth;
        this.actions = (item.hasOwnProperty('actions'))?item['actions']:this.actions;
        return this;
    }
}