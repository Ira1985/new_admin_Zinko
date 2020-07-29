import React, { Component } from 'react';
import './dataTreeView.scss';
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {MultiSelect} from "primereact/multiselect";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import BaseLayout from "../BaseLayout/BaseLayout";
import {Button} from "primereact/button";
import Paging from "../../../models/base/Paging";
import Sorter from "../../../models/base/Sorter";
import {TreeTable} from "primereact/treetable";
import TreeTableItem from "../../../models/base/TreeTableItem";
import TreeColumn from "../../../models/base/TreeColumn";

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
            activeColumns: []
        };

        this.dataGridView = React.createRef();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        if(nextProps.clearChecked  && nextProps.hasOwnProperty('clearCheckedDone')) {
            this.selectItem({value:[]});
            nextProps.clearCheckedDone();
            return false;
        }

        if(nextProps.reloadList  && nextProps.hasOwnProperty('reloadListDone')) {
            //const {filters, sorter, paging} = this.state;
            nextProps.reloadListDone();
            this.getList(nextState.filters, nextState.sorter, nextState.paging, true);
            return false;
        }
        return true;
    }


    componentDidMount() {
        const {filters, sorter, paging, selectedColumns, columnCoef} = this.state;
        this.getList(filters, sorter, paging, true);
        this.setState({
            activeColumns: this.rebuildColumns(selectedColumns,columnCoef)
            });
    }

    getList(filtering, sorting, paging, changingPage) {

        this.setState({
            loading: true
            //items: new Map()
        });
        this.props.apiService.getList(filtering, sorting, paging)
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
                            items: response ? this.transformItems(response.pageItems) : [],
                            loading: false
                        });
                    } else
                        this.setState({
                            items: response ? this.transformItems(response.pageItems) : [],
                            loading: false
                        });
                },
                error => {
                    this.setState({
                        items: new Map(),
                        loading: false,
                        paging: new Paging()
                    });
                });
    }

    transformItems(items) {
        let nodes = new Map();
        if(items && items.length > 0) {
            items.forEach((item, index) => {
                nodes.set(item.id, new TreeTableItem().build(item));
            });
        }
        return nodes;
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
                activeColumns: this.rebuildColumns(selectedColumns, (sum > 0? 100/sum: 1))
            });
        }
    }

    onPage(e) {
        const {filters, sorter, paging} = this.state;
        let newPaging =  Object.assign({}, paging, {
            page: (e.page + 1),
            limit:e.rows
        });
        this.setState({
            paging: newPaging
        });
        this.getList(filters, sorter, newPaging, true);
    }

    onSort(e) {
        const {filters, sorter, paging} = this.state;

        let newSorter = new Sorter().build(e.sortField,e.sortOrder === 1?'desc':'asc');
        this.setState({
            sorter: newSorter
        });
        this.getList(filters, newSorter, paging, false);
    }

    selectItem(e) {
        let {updateChecked, checkedItems} = this.props;
        let {items, selectedItems} = this.state;
        console.log(e);
        let newCheckedItems = new Map(checkedItems);
        Object.keys(e.value).forEach(item => {
            if(!newCheckedItems.has(item)) {
                newCheckedItems.set(item, items.get(item));
            } else {
                newCheckedItems.delete(item);
            }
        });
        this.setState({
            selectedItems: e.value
        });
        updateChecked(newCheckedItems);
    }

    onDoubleClick(e) {
        const {editItem, disableEdit} = this.props;
        if(!disableEdit)
            editItem(e.data);
        //this.setState({item: e.data, visibleAdd: true})
    }

    onExpand(event) {
        if (!event.node.children) {
            this.setState({
                loading: true
            });

            setTimeout(() => {
                this.loading = false;
                let lazyNode = {...event.node};
                lazyNode.children = [
                    {
                        key: lazyNode.key + ' - 0',
                        data: {
                            name: lazyNode.data.name + ' - 0',
                            size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                            comment: 'File',
                            presenceAttributes: "No",
                            parent: lazyNode.key
                        },
                        leaf: false
                    },
                    {
                        key: lazyNode.key + ' - 1',
                        data: {
                            name: lazyNode.data.name + ' - 1',
                            size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                            type: 'File',
                            parent: lazyNode.key
                        },
                        leaf: false
                    }
                ];

                let nodes = null;

                let newMap = new Map(this.state.expandedTree);
                lazyNode.children.map(child => {
                    newMap.set(child.key, {
                        key: child.key,
                        data: child.data,
                        children: null
                    })
                });

                let parent = lazyNode.data.parent;

                let count = 0;

                while(parent !== null) {
                    ++count;
                    newMap.get(lazyNode.key).children = lazyNode.children;
                    if(newMap.has(parent)) {
                        let parentElem = newMap.get(parent);
                        let childElem = parentElem.children.map(elem => {
                            if(elem.key === lazyNode.key) {
                                elem = lazyNode
                            }
                            return elem;
                        })
                        lazyNode = newMap.get(parent);
                        parentElem.children = childElem;
                        parent = newMap.get(parent).data.parent;
                    } else {
                        let parenElem = this.state.items.filter(item => item.key === parent)[0];
                        parent = null;
                        lazyNode = newMap.get(lazyNode.key);
                        let childElem = parenElem.children.map(elem => {
                            if(elem.key === lazyNode.key) {
                                elem = lazyNode
                            }
                            return elem
                        });
                        parenElem.children = childElem;
                        lazyNode = parenElem;
                    }

                }

                if(parent === null) {
                    let key = count ? lazyNode.key : event.node.key;
                    nodes = this.state.items.map(node => {
                        if (node.key === key) {
                            node = lazyNode;
                        }
                        return node;
                    });
                } else {

                }

                this.setState({
                    loading: false,
                    items: nodes,
                    expandedTree: newMap
                });
            }, 250);
        }
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
                <Column key={'data-table-col-' + index} field={col.field} header={t(col.header)} sortable={col.sortable}
                        style={Object.assign({},col.style, {width:((columnCoef*col.widthCoef) - offset)+'%'})}
                        bodyStyle={((!col.bodyStyle || Object.keys(col.bodyStyle).length === 0)?(index == 0?{textAlign:'left'}:{textAlign:'center'}):{})}
                        body={col.renderer?col.renderer:null}
                        expander={col.expander?true: false}
                />:
                <Column key={'data-table-col-' + index}
                        style={Object.assign({},{width:col.actionWidth + 'px'}, col.style)}
                        bodyStyle={((!col.bodyStyle || Object.keys(col.bodyStyle).length === 0)?(index == 0?{textAlign:'left'}:{textAlign:'center'}):col.bodyStyle)}
                        body={col.renderer?col.renderer:null}
                        expander={col.expander?true: false}
                />

        });
        return columnComponents;
    }

    render() {
        const {t, minimizeHeight} = this.props;
        const {items, loading, selectedColumns, columns, multiColumns, columnCoef, paging, sorter, selectedItems, activeColumns} = this.state;

        const paginatorRight = <div>
            <Button className={'grid-toolbar-unload'} icon="pi p-empty-button grid-unload-ico" style={{marginRight:'.25em'}} tooltip={t('baseLayout.main.buttons.tooltips.buttonUnload')} tooltipOptions={{position: 'left'}} />
            <Button className={'grid-toolbar-import'} icon="pi p-empty-button grid-import-ico" tooltip={t('baseLayout.main.buttons.tooltips.buttonImport')} tooltipOptions={{position: 'left'}} />
        </div>;

        console.log('render', minimizeHeight);

        return (<>
            <div ref={this.dataGridView} className='data-tree-view'>

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

                <TreeTable value={Array.from(items.values())}
                           selectionMode="checkbox"
                           //onRowDoubleClick={(e) => this.onDoubleClick(e)}
                           selectionKeys={selectedItems}
                           //onSelectionChange={e => this.setState({selectedNodeKeys3: e.value})}
                            scrollable={true}
                            responsive={true}
                            autoLayout={true}
                            resizableColumns={true}
                            /*className={minimizeHeight?'minimize-height-body': ''}*/
                            className={'minimize-height-body'}
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
                            paginatorTemplate="CurrentPageReport"
                            onExpand={(event) => this.onExpand(event)}
                >
                    {/*<Column key={'data-table-selection-key'} selectionMode="multiple" style={{width:'50px'}} />*/}
                    {activeColumns}
                    {/*<Column style={{width:'120px'}} body={this.butBodyTemplate} />*/}
                    <Column style={{width:'30px'}} />
                </TreeTable>
            </div>
        </>);
    }

}

DataTreeView.propTypes = {
    minimizeHeight: PropTypes.bool,
    apiService: PropTypes.any,
    //location: PropTypes.object,
    editItem: PropTypes.func,
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
