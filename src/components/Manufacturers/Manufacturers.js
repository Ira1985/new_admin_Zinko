import React, { Component } from 'react';
import {Button} from 'primereact/button';
import {Toolbar} from 'primereact/toolbar';
import {BreadCrumb} from 'primereact/breadcrumb';
import '../../scss/simpleTable.scss';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {manufacturerService} from "../../service/manufacturer.service";
import {Dialog} from 'primereact/dialog';
import {ManufacturerEditDialog} from "./Edit/ManufacturerEditDialog";
import {MultiSelect} from 'primereact/multiselect';

const items = [
    { "label": "Производители" }
]

export class Manufacturers extends Component {

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
        }
        this.onSelect = this.onSelect.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.onColumnToggle = this.onColumnToggle.bind(this);
    }

    componentDidMount() {
        manufacturerService.getList().then(res => {
            console.log(res)
            this.setState({items: res.pageItems, totalRows: res.totalRows})
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
                    <Button label='Пакетная обработка' style={{marginRight:'.25em'}} />
                    <Button label='Добавить' className="p-button-success" onClick={() => this.setState({visibleAdd: true})} />
                </div>
            </Toolbar>
            <MultiSelect value={this.state.selectedColumns} options={this.state.columns} optionLabel='header' onChange={this.onColumnToggle} style={{width:'250px'}}/>

            <DataTable value={this.state.items}
                       onRowDoubleClick={this.onSelect}
                       scrollable={true} scrollHeight={scrollHeight}
                       currentPageReportTemplate={total} paginatorRight={paginatorRight}
                       selection={this.state.selectedItems} onSelectionChange={e => this.setState({selectedItems: e.value})}
                       paginator rows={10} paginatorPosition={'top'}
                       paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" rowsPerPageOptions={[10,20,50,100]}>
                <Column selectionMode="multiple" style={{width:'50px'}} />
                {columnComponents}
            </DataTable>

            <Dialog header={this.state.item.id?"Редактировать":"Добавить"} footer={footer} visible={this.state.visibleAdd} style={{width: '50vw'}} modal={true} onHide={this.closeDialog}>
                {this.state.item &&
                <ManufacturerEditDialog editedItem={this.state.item} />
                }
            </Dialog>
        </div>)
    }
}
