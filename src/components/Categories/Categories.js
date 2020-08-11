import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import {Button} from 'primereact/button';
import {Toolbar} from 'primereact/toolbar';
import {BreadCrumb} from 'primereact/breadcrumb';
import Category from "../../models/Category";
//import '../../scss/simpleTable.scss';
import './categories.scss'
import {DataTable} from 'primereact/datatable';
import {TreeTable} from 'primereact/treetable';
import {Column} from 'primereact/column';
import {categoryService} from "../../service/category.service";
import {Dialog} from 'primereact/dialog';
import {MultiSelect} from 'primereact/multiselect';
import DataGridView from "../../layouts/DataGridView/DataGridView";
import CheckedToolbarSection from "../../layouts/BaseLayout/CheckedToolbarSection/CheckedToolbarSection";
import ApprovalWin from "../base/ApprovalWin/ApprovalWin";
import {pluralize} from "../../helpers/utils";
import EditWin from "../base/EditWin/EditWin";
import classNames from 'classnames';

const items = [
    { "label": "Категоризация" }
]

class Categories extends Component {

    constructor(props) {
        super(props);

        let columns = new Map(), selectedColumns = new Map(), coef = 1;

        let column = Category.buildColumns();
        if(column && column.length > 0) {
            let sum = 0;
            column.map((elem, index) => {
                columns.set(elem.field,
                    {field: elem.field, header: elem.header, style: elem.style, sortable: elem.sortable,
                        order: elem.order, default: elem.default, widthCoef: elem.widthCoef});
                //columns.push({field: elem.field, header: elem.header, style: elem.style, sortable: elem.sortable, order: elem.order});
                if(elem.default) {
                    sum += elem.widthCoef;
                    selectedColumns.set(
                        elem.field, {
                            field: elem.field,
                            header: elem.header,
                            style: elem.style,
                            sortable: elem.sortable,
                            expander: elem.expander,
                            order: elem.order,
                            default: elem.default,
                            widthCoef: elem.widthCoef,
                            body: elem.body
                        });
                }
            });
            coef = (sum > 0? 100/sum: 1);
        }
        this.state = {
            items: [],
            totalRows: 0,
            selectedItems: [],
            visibleAdd: false,
            item: {},
            scrollHeight: 0,
            loading: true,
            expandedTree: new Map(),
            selectedColumns: selectedColumns,
            columns: columns,
            columnCoef: coef,
        }
        this.onSelect = this.onSelect.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.onExpand = this.onExpand.bind(this);
        this.countBodyTemplate = this.countBodyTemplate.bind(this);

        this.dataGridView = React.createRef();
    }

    toolbarButtons = [
        {
            label: 'baseLayout.main.buttons.buttonSearch',
            className:'button-dop',
            onClick: () => console.log('dop button')
        },
        {
            label: 'baseLayout.main.buttons.buttonAdd',
            className:'button-success',
            onClick: (e, thisEl) => {
                this.addItem();
            }
        }
    ];

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false,
                items: this.loadNodes(0, 100),
                totalRecords: 1000
            });
        }, 1000);
    }

    loadNodes(first, rows) {
        let nodes = [];

        for(let i = 0; i < rows; i++) {
            let node = {
                key: (first + i),
                data: {
                    name: 'Item ' + (first + i),
                    comment: 'Type ' + (first + i),
                    layout: 'kb',
                    count: first + i,
                    presenceAttributes: "Yes",
                    parent: null
                },
                leaf: false
            };

            nodes.push(node);
        }

        return nodes;
    }

    onSelect(e) {
        this.setState({item: e.data, visibleAdd: true})
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
                    sum += col.widthCoef;
                }
            });
            this.setState({
                selectedColumns: newColumns,
                columnCoef: (sum > 0? 100/sum: 1)
            });
        }
    }

    closeDialog() {
        this.setState({item: {}, visibleAdd: false})
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

    countBodyTemplate(rowData, body) {
        return <span className={rowData.data[body] !== "No" ? 'count' : "attr"}>{rowData.data[body]}</span>;
    }

    butBodyTemplate() {
        return <div className={'column-button'}>
            <Button icon="pi p-empty-button case-ico"/>
            <Button icon="pi p-empty-button plus-ico"/>
            <Button icon="pi p-empty-button times-ico"/>
            <Button icon="pi p-empty-button chain-ico"/>
        </div>
    }

    render(){

        const {t, dopToolbarButtons, dopCheckedButtons, plurals,
            children, gridView, treeView, apiService, location, editComponent, baseSchema, baseModel} = this.props;

        const { items, loading, selectedColumns, columns, columnCoef, selectedItems,
            totalRows, limit, currentPage, first, sortField, sortOrder, paging, sorter} = this.state;

        console.log(items);

        let toolbarButs = dopToolbarButtons? Array.concat(this.toolbarButtons, dopToolbarButtons): this.toolbarButtons;

        let  breadcrumbs = [{ "label": t('categories.breadcrumbs.name')}];

        const paginatorRight = <div>
            <Button className={'grid-toolbar-unload'} icon="pi p-empty-button grid-unload-ico" style={{marginRight:'.25em'}} tooltip={t('baseLayout.main.buttons.tooltips.buttonUnload')} tooltipOptions={{position: 'left'}} />
            <Button className={'grid-toolbar-import'} icon="pi p-empty-button grid-import-ico" tooltip={t('baseLayout.main.buttons.tooltips.buttonImport')} tooltipOptions={{position: 'left'}} />
        </div>;

        let offset = 0;
        if(this.dataGridView.current) {
            //offset = (selectedColumns.size > 0)? 75/(selectedColumns.size-1): 0;
            offset = (selectedColumns.size > 0)?((80/this.dataGridView.current.clientWidth)*99)/selectedColumns.size: 0;
        }



        const columnComponents = Array.from(selectedColumns.values()).sort((a1,a2) => {return ((a1.order > a2.order)?1:(a1.order < a2.order)?-1:0)}).map((col, index) => {
            return <Column key={'data-table-col-' + index} field={col.field} header={t(col.header)} sortable={col.sortable} style={Object.assign({},col.style, {width:((columnCoef*col.widthCoef) - offset)+'%'})} expander={col.expander} body={col.body ? e => this.countBodyTemplate(e, col.body) : ""} />;
        });

        return (<div className={'base-layout'}>
            <div className='main-section'>
                <div className='header'>
                    <Toolbar>
                        <div className="p-toolbar-group-left">
                            <BreadCrumb model={breadcrumbs} home={{label: 'Главная', icon: 'pi pi-home', url: 'dashboard'}} />
                        </div>
                        <div className="p-toolbar-group-right">
                            {(toolbarButs && toolbarButs.length > 0) &&
                            toolbarButs.map((button, index) =>
                                <Button key={'toolbar_but_' + index} label={t(button.label)} className={button.className}  onClick={(e) => button.onClick(e, this)} tooltip={button.tooltip}/>
                            )}

                        </div>
                    </Toolbar>
                </div>

                <hr/>

                <div className='base-data-section'>
                    <MultiSelect
                        maxSelectedLabels={columns.size}
                        className={'grid-add-column'}
                        placeholder={' '}
                        fixedPlaceholder={true}
                        value={Array.from(selectedColumns.keys())}
                        options={Array.from(columns.values())}
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
                        className={'testttt'}
                        value={this.state.items} lazy={true} paginator={true} paginatorPosition={'top'} totalRecords={100}
                               paginatorRight={paginatorRight}
                               currentPageReportTemplate={'{totalRecords} ' + t('baseLayout.main.other.totalItemsLabel')}
                               paginatorTemplate="CurrentPageReport"
                               onExpand={this.onExpand} loading={this.state.loading}
                               scrollable scrollHeight='calc(100vh - 225px)'>
                        {columnComponents}
                        <Column style={{width:'120px'}} body={this.butBodyTemplate} />
                        <Column style={{width:'30px'}} />
                    </TreeTable>
                </div>
            </div>
        </div>)
    }
}

export default withTranslation()(Categories);
