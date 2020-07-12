import React, { Component } from 'react';
import './dataGridView.scss';
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {MultiSelect} from "primereact/multiselect";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import BaseLayout from "../BaseLayout/BaseLayout";
import {Button} from "primereact/button";
import Paging from "../../../models/base/Paging";
import Sorter from "../../../models/base/Sorter";

class  DataGridView extends Component {

    constructor(props) {
        super(props);
        let columns = new Map(), selectedColumns = new Map(), coef = 1;

        if(props.columns && props.columns.length > 0) {
            let sum = 0;
            props.columns.map((elem, index) => {
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
                        order: elem.order,
                        default: elem.default,
                        widthCoef: elem.widthCoef
                    });
                }
            });
            coef = (sum > 0? 100/sum: 1);
        }


        this.state = {
            loading: true,
            items: [],

            /*totalRows: 0,
            limit: 20,
            currentPage: 1,
            first: 0,*/

            selectedItems: new Map(),
            freezItems: new Map(),
            //visibleAdd: false,
            item: {},
            //scrollHeight: 0,
            selectedColumns: selectedColumns,
            columns: columns,
            columnCoef: coef,
            /*sortField: '',
            sortOrder: 0,*/

            sorter: props.sorterInit? new Sorter().build(props.sorterInit.name, props.sorterInit.directions):new Sorter(),
            paging: props.pagingInit? new Paging().build(props.pagingInit): new Paging()
        };

        this.dataGridView = React.createRef();
    }

    //TODO: зробити onUpdate( перевірка списку вибору згори і чистка поточного)

    componentDidMount() {
        const {filters, sorter, paging} = this.state;
        this.getList(filters, sorter, paging, true);
    }

    getList(filtering, sorting, paging, changingPage) {

        this.setState({
            loading: true,
            items: []
        });
        this.props.apiService.getList(filtering, sorting, paging)
            .then(response => {
                    console.log(response ? response.pageItems : []);
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
                    sum += col.widthCoef;
                }
            });
            this.setState({
                selectedColumns: newColumns,
                columnCoef: (sum > 0? 100/sum: 1)
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
        /*this.setState({
            sortField: e.sortField,
            sortOrder: e.sortOrder
        });*/
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
        const {editItem} = this.props;
        editItem(e.data);
        //this.setState({item: e.data, visibleAdd: true})
    }

    render() {
        const {t, location, minimizeHeight, checkedItems} = this.props;

        const { items, loading, selectedColumns, columns, columnCoef, selectedItems,
            totalRows, limit, currentPage, first, sortField, sortOrder, paging, sorter} = this.state;

        const paginatorRight = <div>
            <Button className={'grid-toolbar-unload'} icon="pi p-empty-button grid-unload-ico" style={{marginRight:'.25em'}} tooltip={t('baseLayout.main.buttons.tooltips.buttonUnload')} tooltipOptions={{position: 'left'}} />
            <Button className={'grid-toolbar-import'} icon="pi p-empty-button grid-import-ico" tooltip={t('baseLayout.main.buttons.tooltips.buttonImport')} tooltipOptions={{position: 'left'}} />
        </div>;

        //const offset = (selectedColumns.size > 0)? 75/(selectedColumns.size-1): 0;
        let offset = 0;
        if(this.dataGridView.current) {
            //offset = (selectedColumns.size > 0)? 75/(selectedColumns.size-1): 0;
            offset = (selectedColumns.size > 0)?((80/this.dataGridView.current.clientWidth)*99)/selectedColumns.size: 0;
        }

        const columnComponents = Array.from(selectedColumns.values()).sort((a1,a2) => {return ((a1.order > a2.order)?1:(a1.order < a2.order)?-1:0)}).map((col, index) => {
            return <Column key={'data-table-col-' + index} field={col.field} header={t(col.header)} sortable={col.sortable} style={Object.assign({},col.style, {width:((columnCoef*col.widthCoef) - offset)+'%'})} />;
        });

        return (<>
            <div ref={this.dataGridView} className='data_grid_view'>

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

                <DataTable value={items}
                    onRowDoubleClick={(e) => this.onDoubleClick(e)}
                           scrollable={true}
                           responsive={true}
                           autoLayout={true}
                           resizableColumns={true}
                           className={minimizeHeight?'minimize-height-body': ''}
                           /*resizableColumns={true}*/
                           //sortField={sortField}
                           sortField={sorter.name}
                           //sortOrder={sortOrder}
                           sortOrder={sorter.directions == 'desc'?1:0}
                           scrollHeight={minimizeHeight?'calc(100vh - 325px)': 'calc(100vh - 225px)'}
                           /*scrollHeight={scrollHeight}*/
                           /*currentPageReportTemplate={'{currentPage} of {totalPages}'}*/
                           currentPageReportTemplate={'{totalRecords} ' + t('baseLayout.main.other.totalItemsLabel')}
                           //totalRecords={totalRows}
                           totalRecords={paging.count}
                           lazy={true}
                           //first={first}
                           first={(paging.page - 1) * paging.limit}
                           onPage={(e) => this.onPage(e)}
                           onSort={(e) => this.onSort(e)}
                           loading={loading}
                           paginatorRight={paginatorRight}
                           selection={Array.from(checkedItems.values())}
                           /*frozenValue={Array.from(checkedItems.values())}*/
                           onSelectionChange={e => this.selectItem(e)}
                           paginator={true}
                           //rows={limit}
                           rows={paging.limit}
                           paginatorPosition={'top'}
                           paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" rowsPerPageOptions={[10,20,50,100]}>
                    <Column key={'data-table-selection-key'} selectionMode="multiple" style={{width:'50px'}} />
                    {columnComponents}
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
            field: PropTypes.string.isRequired,
            header: PropTypes.string.isRequired,
            style:  PropTypes.object,
            sortable: PropTypes.bool,
            order: PropTypes.number.isRequired,
            default: PropTypes.bool.isRequired,
            widthCoef: PropTypes.number.isRequired
        }
    )),
    sorterInit: PropTypes.object,
    pagingInit: PropTypes.object,
    disableEdit: PropTypes.bool

};

export default withTranslation()(DataGridView);
