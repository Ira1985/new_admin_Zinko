import React, { Component } from 'react';
import {Button} from 'primereact/button';
import {Toolbar} from 'primereact/toolbar';
import {BreadCrumb} from 'primereact/breadcrumb';
import '../../scss/simpleTable.scss';
import {DataTable} from 'primereact/datatable';
import {TreeTable} from 'primereact/treetable';
import {Column} from 'primereact/column';
import {categoryService} from "../../service/category.service";
import {Dialog} from 'primereact/dialog';
import {MultiSelect} from 'primereact/multiselect';

const items = [
    { "label": "Категоризация" }
]

export class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            totalRows: 0,
            selectedItems: [],
            visibleAdd: false,
            item: {},
            scrollHeight: 0,
            selectedColumns: [],
            columns: [
                {field: 'name', header: 'Имя'},
                {field: 'comment', header: 'Коментарий'},
                {field: 'description', header: 'Описание'},
                {field: 'code', header: 'Код'},
            ],
            loading: true,
            expandedTree: new Map(),
        }
        this.onSelect = this.onSelect.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.onColumnToggle = this.onColumnToggle.bind(this);
        this.onExpand = this.onExpand.bind(this);
    }

    componentDidMount() {
        categoryService.getList().then(res => {

            let arr = res.pageItems.map(item => {
                let obj = {};
                obj.key = item.id;
                obj.data = item;
                obj.leaf = item.leaf;
                return obj;
            })
            this.setState({items: arr, loading: false})
        });
        this.setState({selectedColumns: this.state.columns.slice(0,3)});
    }

    onSelect(e) {
        this.setState({item: e.data, visibleAdd: true})
    }

    onColumnToggle(event) {
        let selectedColumns = event.value;
        let orderedSelectedColumns = this.state.columns.filter(col => selectedColumns.includes(col));
        this.setState({selectedColumns: orderedSelectedColumns});
    }

    saveItem() {

    }

    closeDialog() {
        this.setState({item: {}, visibleAdd: false})
    }

    addChildrenToTree(parent, children, id) {

        let lazyItem = {...id};
        let items = this.state.expandedTree.get(parent.id).map(item => {
            if(item.key === id.key) {
                console.log(children, parent)
            }
            return item;
        });

        if(!parent.parent) {
            return items;
        }

    }

    onExpand(e) {
        console.log(this.state.items)
        if (!e.node.children) {
            this.setState({
                loading: true
            });

            categoryService.getChildren(e.node.data.path).then(res => {
                let lazyItem = {...e.node};
                let map = this.state.expandedTree;

                lazyItem.children = res.pageItems.map(item => {
                    let obj = {};
                    obj.data = item;
                    obj.key = item.id;
                    obj.leaf = item.leaf;
                    return obj;
                });

                map.set(e.node.data.id, lazyItem.children);
                if(e.node.data.parent) {
                    this.addChildrenToTree(e.node.data.parent, lazyItem.children, e.node)
                }
                let items = this.state.items.map(item => {
                    if(item.key === e.node.key) {
                        item = lazyItem;
                    }
                    return item;
                });
                this.setState({
                    loading: false,
                    items: items,
                    expandedTree: map
                });
            })
        }
    }

    render(){
        let {scrollHeight} = this.state;
        if(document.querySelector('.p-datatable-scrollable-wrapper')) {
            scrollHeight = document.querySelector('.p-datatable-scrollable-wrapper').offsetHeight - 105 + 'px';
        }

        let total = this.state.totalRows + ' результатов';

        const paginatorRight =<div>
            <Button icon="pi pi-download" style={{marginRight:'.25em'}}/>
            <Button icon="pi pi-upload" />
        </div>;

        const columnComponents = this.state.selectedColumns.map(col=> {
            return <Column field={col.field} header={col.header} sortable />;
        });

        const footer = (
            <div>
                <Button label={this.state.item.id?"Сохранить":"Добавить"} className={this.state.item.id?"":"p-button-success"} onClick={this.saveItem} />
                <Button label="Отменить" className="p-button-danger" onClick={this.closeDialog} />
            </div>
        );

        return (<div>
            <Toolbar>
                <div className="p-toolbar-group-left">
                    <BreadCrumb model={items} home={{label: 'AAA', icon: 'pi pi-home'}} />
                </div>
                <div className="p-toolbar-group-right">
                    <Button label='Поиск' style={{marginRight:'.25em'}} />
                    <Button label='Добавить' className="p-button-success" onClick={() => this.setState({visibleAdd: true})} />
                </div>
            </Toolbar>

            <TreeTable value={this.state.items} lazy={true} paginator={true} totalRecords={100}
                       onExpand={this.onExpand} loading={this.state.loading}>
                <Column field={'name'} header={'Категория'} expander />
                <Column field={'comment'} header={'Комментарий'} />
            </TreeTable>

            <Dialog header={this.state.item.id?"Редактировать":"Добавить"} footer={footer} visible={this.state.visibleAdd} style={{width: '50vw'}} modal={true} onHide={this.closeDialog}>

            </Dialog>
        </div>)
    }
}