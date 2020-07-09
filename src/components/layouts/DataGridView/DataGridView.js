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

class  DataGridView extends Component {

    //dataGridView = React.createRef();

    constructor(props) {
        super(props);
        let columns = new Map(), selectedColumns = new Map(), coef = 1;

        if(props.columns && props.columns.length > 0) {
/*            props.columns.map((elem, index) => {
                coef += elem.order;
            });*/

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
            totalRows: 0,
            limit: 20,
            currentPage: 1,
            first: 0,
            selectedItems: new Map(),
            freezItems: new Map(),
            //visibleAdd: false,
            item: {},
            //scrollHeight: 0,
            selectedColumns: selectedColumns,
            columns: columns,
            columnCoef: coef,
            sortField: '',
            sortOrder: 0
        };

        this.dataGridView = React.createRef();
    }

    //TODO: зробити onUpdate( перевірка списку вибору згори і чистка поточного)

    componentDidMount() {
        const {apiService} = this.props;
    }

    componentDidMount() {
        const {filters, sorter, paging} = this.state;
        const {location, loadOnMountBefore, loadOnMount} = this.props;
        let id;
        let name;
        let params = location.search.substring(1);
        if(params) {
            let vars = params.split("&");
            vars.map((elem, index) => {
                if(elem.includes('id')) {
                    id = +elem.slice(3);
                } else if(elem.includes('name')) {
                    name = decodeURI(elem.slice(5));
                }
            });
        }

        if(loadOnMountBefore && loadOnMountBefore instanceof Function) {
            loadOnMountBefore()
                .then(
                    response => {
                        if(response) {
                            this.startOnStartUp(filters, sorter, paging, id, name);
                            if(loadOnMount && loadOnMount instanceof Function) {
                                loadOnMount();
                            }
                        }
                    }
                );
        } else {
            this.startOnStartUp(filters, sorter, paging, id, name);
            if(loadOnMount && loadOnMount instanceof Function) {
                loadOnMount();
            }
        }
    }

    startOnStartUp(filters, sorter, paging, id, name) {
        this.getList(filters, sorter, paging, true);
        /*
        if(id == 0) {
            this.addItem(name?{name: name}:null);
            //if(name)
            //   this.editItem({name: name});
            //else
            //    this.addItem();
        } else if(id > 0)
            this.editItem({id: id});
       */
    }

    getList(filtering, sorting, paging) {

        this.setState({
            loading: true
        });
        this.props.apiService.getList(filtering, sorting, paging)
            .then(response => {
                    console.log(response ? response.pageItems : []);
                    this.setState({
                        items: response ? response.pageItems : [],
                        loading: false,
                        totalRows: response ? response.totalRows : 0
                    });
                },
                error => {
                    this.setState({
                        items: [],
                        loading: false,
                        totalRows: 0,
                        currentPage: 1
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
        this.setState({
            limit: e.rows,
            currentPage: (e.page + 1),
            first: (e.page * e.rows)
        });
    }

    onSort(e) {
        console.log(e);
        this.setState({
            sortField: e.sortField,
            sortOrder: e.sortOrder
        });
    }

    selectItem(e) {
        const {selectedItems} = this.state;
        let {updateChecked} = this.props;
        console.log('selectItem');
        console.log(e);
        console.log(arguments);

        let newSelectedItems = new Map();
        e.value.forEach(item => {
            newSelectedItems.set(item.id, item);
        });

        this.setState({
            selectedItems: newSelectedItems
        });

        updateChecked(newSelectedItems);

        /*e.originalEvent.stopPropagation();
        e.originalEvent.preventDefault();*/

    }

    onSelect(e, getEditItem) {
        getEditItem(e.data);
        //this.setState({item: e.data, visibleAdd: true})
    }

    render() {
        const {t, location, minimizeHeight, checkedItems, getEditItem} = this.props;
        const { items, loading, selectedColumns, columns, columnCoef, selectedItems,
            totalRows, limit, currentPage, first, sortField, sortOrder} = this.state;

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
                    onRowDoubleClick={(e) => this.onSelect(e, getEditItem)}
                           scrollable={true}
                           responsive={true}
                           autoLayout={true}
                           resizableColumns={true}
                           className={minimizeHeight?'minimize-height-body': ''}
                           /*resizableColumns={true}*/
                           sortField={sortField}
                           sortOrder={sortOrder}
                           scrollHeight={minimizeHeight?'calc(100vh - 325px)': 'calc(100vh - 225px)'}
                           /*scrollHeight={scrollHeight}*/
                           /*currentPageReportTemplate={'{currentPage} of {totalPages}'}*/
                           currentPageReportTemplate={'{totalPages} ' + t('baseLayout.main.other.totalItemsLabel')}
                           totalRecords={totalRows}
                           lazy={true}
                           first={first}
                           onPage={(e) => this.onPage(e)}
                           onSort={(e) => this.onSort(e)}
                           loading={loading}
                           paginatorRight={paginatorRight}
                           selection={Array.from(checkedItems.values())}
                           /*frozenValue={Array.from(checkedItems.values())}*/
                           onSelectionChange={e => this.selectItem(e)}
                           paginator={true}
                           rows={limit}
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
    location: PropTypes.object,
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
    ))
};

export default withTranslation()(DataGridView);
