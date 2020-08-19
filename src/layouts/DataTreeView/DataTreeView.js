import React, { Component } from 'react';
import './dataTreeView.scss';
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {MultiSelect} from "primereact/multiselect";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import Paging from "../../models/base/Paging";
import Sorter from "../../models/base/Sorter";
import {TreeTable} from "primereact/treetable";
import TreeTableItem from "../../models/base/TreeTableItem";
import TreeColumn from "../../models/base/TreeColumn";
import {ContextMenu} from "primereact/contextmenu";

class  DataTreeView extends Component {

    constructor(props) {
        super(props);
        let columns = new Map(),
            multiColumns = new Map(),
            selectedColumns = new Map(), coef = 1;

        if(props.columns && props.columns.length > 0) {
            let sum = 0;
            props.columns.forEach((elem, index) => {
                columns.set(elem.field,
                    new TreeColumn().build(elem));
                if(!elem.actionColumn)
                    multiColumns.set(elem.field,
                        new TreeColumn().build(elem));
                if(elem.default || elem.actionColumn) {
                    if(!elem.actionColumn)
                        sum += elem.widthCoef;
                    selectedColumns.set(
                        elem.field, new TreeColumn().build(elem));
                }
            });
            coef = (sum > 0? 100/sum: 1);
        }

        this.state = {
            loading: true,

            items: new Map(),
            fullTree: new Map(),
            visibleItems: new Map(),
            treePaging: new Map(),

            selectedItems: new Map(),
            freezItems: new Map(),
            item: {},
            selectedColumns: selectedColumns,
            columns: columns,
            multiColumns: new Map([...multiColumns.entries()].sort((a1,a2) => {return ((a1[1].order > a2[1].order)?1:(a1[1].order < a2[1].order)?-1:0)})),
            columnCoef: coef,

            sorter: props.sorterInit? new Sorter().build(props.sorterInit.name, props.sorterInit.directions):new Sorter(),
            paging: props.pagingInit? new Paging().build(props.pagingInit): new Paging(),
            filters: Object.assign({},props.filterInit ? props.filterInit:{}),
            activeColumns: [],
            contextMenuItems: this.buildContexMenu(props.contexMenuProps),
            currentNode: null
        };

        this.dataGridView = React.createRef();
    }

    buildContexMenu(contextMenuProps) {
        const {t} = this.props;

        let buttons = [];
        if(contextMenuProps) {
            if(contextMenuProps.hasOwnProperty('showEdit') && contextMenuProps.showEdit)
                buttons.push({label: t("baseLayout.main.other.edit"), command: (item) => this.editItem(this.state.selectedRow)});
            if(contextMenuProps.hasOwnProperty('showEdit') && contextMenuProps.showEdit)
                buttons.push({label: t("baseLayout.main.other.delete"), command: (item) => this.deleteItem(this.state.selectedRow)});
            if(contextMenuProps.hasOwnProperty('showEdit') && contextMenuProps.showEdit)
                buttons.push({label: t("baseLayout.main.other.addChild"), command: (item) => this.addChild(this.state.selectedRow)});

            if(contextMenuProps.buttons && contextMenuProps.buttons.length) {
                contextMenuProps.buttons.forEach((button, index) => {
                    buttons.push({label: t(button.label), command: (item) => button.command(this.state.selectedRow)});
                });
            }
        }
        return buttons;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        if(nextProps.clearChecked  && nextProps.hasOwnProperty('clearCheckedDone')) {
            this.selectItem({value:{}});
            nextProps.clearCheckedDone();
            return false;
        }

        if(nextProps.reloadList  && nextProps.hasOwnProperty('reloadListDone')) {
            //const {filters, sorter, paging} = this.state;
            nextProps.reloadListDone();
            this.getList(null, nextState.filters, nextState.sorter, nextState.paging, true);
            return false;
        }
        return true;
    }

    editItem(item) {
        const {editItem, disableEdit} = this.props;
        if(!disableEdit)
            editItem(item);

        console.log('editItem', item);
    }

    deleteItem(item) {
        //тут видалення
        console.log('deleteItem', item);
    }

    addChild(item) {
        //тут видалення
        console.log('addChild', item);
    }

    componentDidMount() {
        const {filters, sorter, paging, selectedColumns, columnCoef, currentNode} = this.state;
        this.getList(currentNode, filters, sorter, paging, true);
        this.setState({
            activeColumns: this.rebuildColumns(selectedColumns, columnCoef)
            });
    }

    getList(currentNode, filtering, sorting, paging, changingPage) {

        this.setState({
            loading: true
        });
        let parentKey = filtering.hasOwnProperty('parentId')? filtering['parentId']: null;
        let newFilters = Object.assign({}, filtering);
        if(currentNode != null) {
            newFilters.parentId = currentNode.columnKey;
        }

        this.props.apiService.getList(newFilters, sorting, paging)
            .then(response => {
                    if(changingPage) {
                        let newPaging = new Paging();
                        if(response) {
                            //let newPaging = new Paging();
                            newPaging = Object.assign({}, paging, {
                                //page: 1,
                                count: response.totalRows,
                                totalPages: response.totalPages
                            });
                        }
                        this.setState({
                            paging: newPaging,
                            //items: response ? this.transformItems(response.pageItems) : new Map(),
                            items: this.transformItems(currentNode, response?response.pageItems:null),
                            loading: false
                        });
                    } else
                        this.setState({
                            //items: response ? this.transformItems(response.pageItems) : new Map(),
                            items: this.transformItems(currentNode, response?response.pageItems:null),
                            loading: false
                        });
                },
                error => {
                    this.setState({
                        //items: parentKey ? this.state.items: new Map(),
                        loading: false,
                        paging: new Paging()
                    });
                });
    }

    transformItems(parent, elems) {
        const {items} = this.state;
        let newNodes = new Map(items);

        let children = new Map(), visible = new Map();
        if(elems && elems.length > 0) {
            elems.forEach((item, index) => {
                children.set(item.id, new TreeTableItem().build(item));
            })
        }

        newNodes.set((parent ? parent.key : 'root'), children);

        return newNodes;
    }

    onColumnAdd(e) {
        const {selectedColumns, columns} = this.state;
        let newColumns = new Map();
        if(e.value && e.value.length > 0) {
            let sum = 0;
            e.value.map((item,index) => {
                if(columns.has(item)) {
                    let col = columns.get(item);
                    newColumns.set(item, col);
                    if(!col.actionColumn)
                        sum += col.widthCoef;
                }
            });
            this.setState({
                selectedColumns: newColumns,
                columnCoef: (sum > 0? 100/sum: 1),
                activeColumns: this.rebuildColumns(newColumns, (sum > 0? 100/sum: 1))
            });
        }
    }

    onPage(e) {
        const {filters, sorter, paging, currentNode} = this.state;
        let newPaging =  Object.assign({}, paging, {
            page: (e.page + 1),
            limit:e.rows
        });
        this.setState({
            paging: newPaging
        });
        this.getList(currentNode, filters, sorter, newPaging, true);
    }

    onSort(e) {
        const {filters, sorter, paging, currentNode} = this.state;

        let newSorter = new Sorter().build(e.sortField,e.sortOrder === 1?'desc':'asc');
        this.setState({
            sorter: newSorter
        });
        this.getList(currentNode, filters, newSorter, paging, false);
    }

    selectItem(e) {
        let {updateChecked, checkedItems} = this.props;
        let {items, selectedItems} = this.state;
        let newCheckedItems = new Map();

        console.log('e', e);

        Object.keys(e.value).forEach(item => {
            if(e.value[item].checked)
                newCheckedItems.set(item, items.get(item));
        });
        this.setState({
            selectedItems: e.value
        });

        updateChecked(newCheckedItems);
    }

    onExpand(event) {
        const {filters, sorter, paging, selectedColumns, columnCoef} = this.state;
        let newF = Object.assign({}, filters);

        newF.parentId = event.node.key;
        let newPaging = Object.assign({}, paging, {
            page: 1
        });

        this.setState({
            currentNode: event.node
        });

        this.getList(event.node, newF, sorter, newPaging, false);
    }

    onRowClick(event) {
        console.log('onRow click');
        console.log(event);
    }

    rebuildColumns(selectedColumns, columnCoef) {
        const {t} = this.props;
        //const {selectedColumns, columnCoef} = this.state;
        let offsetConst = 30;
        let actionCol = 0;
        Array.from(selectedColumns.values()).forEach((col, index ) => {
            if(col.actionColumn && col.actionWidth > 0) {
                offsetConst += col.actionWidth;
                actionCol++;
            }
        });

        let offset = 0;
        if(this.dataGridView.current)
            offset = (selectedColumns.size > actionCol)?((offsetConst/this.dataGridView.current.clientWidth)*98)/(selectedColumns.size-actionCol): 0;

        const columnComponents = Array.from(selectedColumns.values()).sort((a1,a2) => {return ((a1.order > a2.order)?1:(a1.order < a2.order)?-1:0)}).map((col, index) => {

            return !col.actionColumn ?
                <Column columnKey={''+index} key={''+index} field={col.field} header={t(col.header)} sortable={col.sortable}
                        style={Object.assign({},col.style, {width:((columnCoef*col.widthCoef) - offset)+'%'})}
                        bodyStyle={((!col.bodyStyle || Object.keys(col.bodyStyle).length === 0)?(index == 0?{textAlign:'left'}:{textAlign:'center'}):{})}
                        body={col.renderer?col.renderer:(col.actions?(rowData, column) => this.renderActionColumns(rowData, column, col.actions):null)}
                        expander={col.expander?true: false}
                />:
                <Column columnKey={''+index} key={''+index}
                        style={Object.assign({},{width:col.actionWidth + 'px'}, col.style)}
                        bodyStyle={((!col.bodyStyle || Object.keys(col.bodyStyle).length === 0)?(index == 0?{textAlign:'left'}:{textAlign:'center'}):col.bodyStyle)}
                        body={col.renderer?col.renderer:(col.actions?(rowData, column) => this.renderActionColumns(rowData, column, col.actions):null)}
                        expander={col.expander?true: false}
                />

        });
        return columnComponents;
    }

    renderActionColumns(rowData, column, actions) {
        const {t, addItem, editItem} = this.props;
        return <div className={'column-button'}>
            {actions && actions.map((action, index) => {
                return <Button key={'action-column-' + index} className={action.className}
                               icon={action.icon}
                               onClick={() => {
                                   if(action.onClick) action.onClick(rowData, column);
                                   else if(action.addNew) addItem();
                                   else if(action.addChild) addItem({parent: rowData.data});
                                   else if(action.edit) editItem(rowData.data);
                                   else if(action.remove) this.deleteItem(rowData.data);
                               }}
                               tooltip={action.tooltip?t(action.tooltip):null}
                />
            })}
        </div>
    }

    deleteItem(item) {
        const {deleteItem} = this.props;
        let value = {};

        value[item.id] = {checked: true};
        this.selectItem({value});
        new Promise(resolve => {
            this.selectItem({value:value});
            setTimeout(function(deleteItem) {
                deleteItem();
            }, 500);
        });
    }

    buildItems(elems, parent) {
        let result = [];
        if(elems && elems.size > 0) {
            elems.get(parent).forEach((value, key, map) => {
                if(elems.has(key))
                    value.children = this.buildItems(elems, key);
                result.push(value);
            });
        }
        return result;
    }

    render() {
        const {t, minimizeHeight} = this.props;
        const {loading, selectedColumns, multiColumns, paging, sorter, selectedItems, activeColumns, contextMenuItems} = this.state;

        const items = this.buildItems(this.state.items, 'root');

        const paginatorRight = <div>
            <Button className={'grid-toolbar-unload'} icon="pi p-empty-button grid-unload-ico" style={{marginRight:'.25em'}} tooltip={t('baseLayout.main.buttons.tooltips.buttonUnload')} tooltipOptions={{position: 'left'}} />
            <Button className={'grid-toolbar-import'} icon="pi p-empty-button grid-import-ico" tooltip={t('baseLayout.main.buttons.tooltips.buttonImport')} tooltipOptions={{position: 'left'}} />
        </div>;

        return (<>
            <div ref={this.dataGridView} className='data-tree-view'>
                {(contextMenuItems && contextMenuItems.length) && <ContextMenu model={contextMenuItems} ref={el => this.cm = el} onHide={() => this.setState({selectedRow: null})}/>}
                <div className="body-for-main-item">
                    <MultiSelect
                        maxSelectedLabels={multiColumns.size}
                        className={'grid-add-column'}
                        placeholder={' '}
                        fixedPlaceholder={true}
                        value={Array.from(selectedColumns.keys())}
                        options={Array.from(multiColumns.values())}
                        optionValue='field'
                        optionLabel='header'
                        itemTemplate={(option) => {return t(option.header);}}
                        onChange={(e) => this.onColumnAdd(e)}
                        tooltip={t('baseLayout.main.buttons.tooltips.gridColumnAdd')}
                        tooltipOptions={{position: 'left'}}
                        /*appendTo={document.body}*/
                        /*appendTo={this.dataGridView.current}*/
                    />
                    <TreeTable
                       value={items}
                        /*value={Array.from(items.values())}*/
                       onRowClick={(e)=>this.onRowClick(e)}

                       selectionMode="checkbox"
                       //onRowDoubleClick={(e) => this.onDoubleClick(e)}
                       selectionKeys={selectedItems}
                       //onSelectionChange={e => this.setState({selectedNodeKeys3: e.value})}
                        scrollable={true}
                        responsive={true}
                        autoLayout={true}
                        resizableColumns={true}
                        className={minimizeHeight?'minimize-height-body': ''}
                        /*className={'minimize-height-body'}*/
                        sortField={sorter.name}
                        sortOrder={sorter.directions == 'desc'?1:0}
                        scrollHeight={minimizeHeight?'calc(100vh - 325px)': 'calc(100vh - 225px)'}
                        currentPageReportTemplate={'{totalRecords} ' + t('baseLayout.main.other.totalItemsLabel')}
                        totalRecords={paging.count}
                        lazy={true}
                        first={(paging.page - 1) * paging.limit}
                        onPage={(e) => this.onPage(e)}
                        onSort={(e) => this.onSort(e)}
                        loading={loading}
                        paginatorRight={paginatorRight}
                        /*selection={Array.from(checkedItems.values())}*/
                        /*frozenValue={Array.from(checkedItems.values())}*/
                        onSelectionChange={e => this.selectItem(e)}
                        paginator={true}
                        rows={paging.limit}
                        paginatorPosition={'top'}
                        /*paginatorTemplate="CurrentPageReport"*/
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" rowsPerPageOptions={[10,20,50,100]}
                        onExpand={(event) => this.onExpand(event)}
                        contextMenuSelection={(contextMenuItems && contextMenuItems.length && this.state.selectedRow && this.state.selectedRow.id) ? this.state.selectedRow.id : null}
                        contextMenuSelectionKey={(contextMenuItems && contextMenuItems.length && this.state.selectedRow && this.state.selectedRow.id) ? this.state.selectedRow.id : null}
                        onContextMenuSelectionChange={(contextMenuItems && contextMenuItems.length) ? e => this.setState({selectedRow: items.get(e.value).data}) : null}
                        onContextMenu={(contextMenuItems && contextMenuItems.length) ? e => this.cm.show(e.originalEvent): null}
                    >
                        {/*<Column key={'tree-table-selection-key-0'} style={{width:'2px'}} />*/}
                        {activeColumns}
                        {/*<Column style={{width:'120px'}} body={this.butBodyTemplate} />*/}
                        <Column key={'tree-table-hidden-column-0'} style={{width:'30px'}} />
                    </TreeTable>
                </div>
            </div>
        </>);
    }
}

DataTreeView.propTypes = {
    minimizeHeight: PropTypes.bool,
    apiService: PropTypes.any,
    //location: PropTypes.object,
    editItem: PropTypes.func,
    addItem: PropTypes.func,
    deleteItem: PropTypes.func,
    checkedItems: PropTypes.object,
    columns: PropTypes.arrayOf(PropTypes.shape(
        {
            field: PropTypes.string,
            header: PropTypes.string,
            style: PropTypes.object,
            sortable: PropTypes.bool,
            order: PropTypes.number.isRequired,
            default: PropTypes.bool.isRequired,
            widthCoef: PropTypes.number.isRequired,
            renderer: PropTypes.func,
            actionColumn: PropTypes.bool
        }
    )),
    sorterInit: PropTypes.object,
    pagingInit: PropTypes.object,
    disableEdit: PropTypes.bool,
    clearChecked: PropTypes.bool.isRequired,
    reloadList: PropTypes.bool.isRequired,
    clearCheckedDone: PropTypes.func.isRequired,
    reloadListDone: PropTypes.func.isRequired,
    filterInit: PropTypes.object
};

export default withTranslation()(DataTreeView);
