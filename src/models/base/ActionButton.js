export default class ActionButton {
    icon = null;
    className = null;
    tooltip = null;
    label = null;
    onClick = null;
    addNew = false;
    addChild = false;
    edit = false;
    remove = false;

    build(src) {
        this.icon = src['icon']?src['icon']: this.icon;
        this.className = src['className']?src['className']: this.className;
        this.tooltip = src['tooltip']?src['tooltip']: this.tooltip;
        this.label = src['label']?src['label']: this.label;
        this.onClick = src['onClick']?src['onClick']: this.onClick;
        this.addNew = src.hasOwnProperty('addNew')?src['addNew']: this.addNew;
        this.addChild = src.hasOwnProperty('addChild')?src['addChild']: this.addChild;
        this.edit = src.hasOwnProperty('edit')?src['edit']: this.edit;
        this.remove = src.hasOwnProperty('remove')?src['remove']: this.remove;
        return this;
    }
}