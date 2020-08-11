import React, { Component } from 'react';
import './dataGridView.scss';
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {MultiSelect} from "primereact/multiselect";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import BaseLayout from "../BaseLayout/BaseLayout";
import {Button} from "primereact/button";
import Paging from "../../models/base/Paging";
import Sorter from "../../models/base/Sorter";
import GridColumn from "../../models/base/GridColumn";
import {ContextMenu} from "primereact/contextmenu";
import {TreeTable} from "primereact/treetable";

class  DataGridView extends Component {

    constructor(props) {
        super(props);
        let columns = new Map(),
            multiColumns = new Map(),
            selectedColumns = new Map(), coef = 1;

        if(props.columns && props.columns.length > 0) {
            let sum = 0;
            props.columns.forEach((elem, index) => {
                    columns.set(elem.field,
                        new GridColumn().build(elem));
                    if(!elem.actionColumn)
                        multiColumns.set(elem.field,
                            new GridColumn().build(elem));
                if(elem.default || elem.actionColumn) {
                    if(!elem.actionColumn)
                        sum += elem.widthCoef;
                    selectedColumns.set(
                        elem.field, new GridColumn().build(elem));
                }
            });
            coef = (sum > 0? 100/sum: 1);
        }

        this.state = {
            loading: true,
            items: [],

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
        const {t} = this.props;
        this.getList(filters, sorter, paging, true);
        this.setState({
            activeColumns: this.rebuildColumns(selectedColumns,columnCoef)
        });
    }

    getList(filtering, sorting, paging, changingPage) {

        this.setState({
            loading: true,
            items: []
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
                            items: response ? response.pageItems : [],
                            loading: false
                        });
                    } else
                        this.setState({
                            items: response ? response.pageItems : [],
                            loading: false
                        });
                },
                error => {
                    this.setState({
                        items: [],
                        loading: false,
                        paging: new Paging()
                    });
                });
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
        let {updateChecked} = this.props;
        let newSelectedItems = new Map();
        e.value.forEach(item => {
            newSelectedItems.set(item.id, item);
        });
        this.setState({
            selectedItems: newSelectedItems
        });
        updateChecked(newSelectedItems);
    }

    onDoubleClick(e) {
        const {editItem, disableEdit} = this.props;
        if(!disableEdit)
            editItem(e.data);
        //this.setState({item: e.data, visibleAdd: true})
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
                <Column key={''+index} field={col.field} header={t(col.header)} sortable={col.sortable}
                        style={Object.assign({},col.style, {width:((columnCoef*col.widthCoef) - offset)+'%'})}
                        bodyStyle={((!col.bodyStyle || Object.keys(col.bodyStyle).length === 0)?(index == 0?{textAlign:'left'}:{textAlign:'center'}):{})}
                        body={col.renderer?col.renderer:null}
                        expander={col.expander?true: false}
                />:
                <Column key={''+index}
                        style={Object.assign({},{width:col.actionWidth + 'px'}, col.style)}
                        bodyStyle={((!col.bodyStyle || Object.keys(col.bodyStyle).length === 0)?(index == 0?{textAlign:'left'}:{textAlign:'center'}):col.bodyStyle)}
                        body={col.renderer?col.renderer:null}
                        expander={col.expander?true: false}
                />

        });
        return columnComponents;
    }

    render() {
        const {t, minimizeHeight, checkedItems, contexmenuItem} = this.props;
        const { items, loading, selectedColumns, columns, multiColumns, columnCoef, paging, sorter, activeColumns} = this.state;

        const paginatorRight = <div>
            <Button className={'grid-toolbar-unload'} icon="pi p-empty-button grid-unload-ico" style={{marginRight:'.25em'}} tooltip={t('baseLayout.main.buttons.tooltips.buttonUnload')} tooltipOptions={{position: 'left'}} />
            <Button className={'grid-toolbar-import'} icon="pi p-empty-button grid-import-ico" tooltip={t('baseLayout.main.buttons.tooltips.buttonImport')} tooltipOptions={{position: 'left'}} />
        </div>;

        return (<>
            <div ref={this.dataGridView} className='data_grid_view'>

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

                {contexmenuItem && contexmenuItem.length && <ContextMenu model={contexmenuItem} ref={el => this.cm = el} onHide={() => this.setState({selectedRow: null})}/>}

                <DataTable value={items}
                    onRowDoubleClick={(e) => this.onDoubleClick(e)}
                           scrollable={true}
                           responsive={true}
                           autoLayout={true}
                           resizableColumns={true}
                           className={minimizeHeight?'minimize-height-body': ''}
                           /*resizableColumns={true}*/
                           sortField={sorter.name}
                           sortOrder={sorter.directions === 'desc'?1:-1}
                           scrollHeight={minimizeHeight?'calc(100vh - 325px)': 'calc(100vh - 225px)'}
                           /*scrollHeight={scrollHeight}*/
                           /*currentPageReportTemplate={'{currentPage} of {totalPages}'}*/
                           currentPageReportTemplate={'{totalRecords} ' + t('baseLayout.main.other.totalItemsLabel')}
                           //totalRecords={totalRows}
                           totalRecords={paging.count}
                           lazy={true}
                           first={(paging.page - 1) * paging.limit}
                           onPage={(e) => this.onPage(e)}
                           onSort={(e) => this.onSort(e)}
                           loading={loading}
                           paginatorRight={paginatorRight}
                           selection={Array.from(checkedItems.values())}
                           /*frozenValue={Array.from(checkedItems.values())}*/
                           onSelectionChange={e => this.selectItem(e)}
                           paginator={true}
                           rows={paging.limit}
                           paginatorPosition={'top'}
                           paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" rowsPerPageOptions={[10,20,50,100]}
                           contextMenuSelection={contexmenuItem && contexmenuItem.length ? this.state.selectedRow : null}
                           onContextMenuSelectionChange={contexmenuItem && contexmenuItem.length ? e => this.setState({selectedRow: e.value}) : null}
                           onContextMenu={contexmenuItem && contexmenuItem.length ? e => this.cm.show(e.originalEvent): null}
                >
                    <Column key={'data-table-selection-key'} selectionMode="multiple" style={{width:'50px'}} />
                    {activeColumns}
                    <Column style={{width:'30px'}} />
                </DataTable>

            </div>
        </>);
    }

}

DataGridView.propTypes = {
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

export default withTranslation()(DataGridView);
