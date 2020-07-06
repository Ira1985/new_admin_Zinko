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

    constructor(props) {
        super(props);
        let columns = [], selectedColumns = [], coef = 1;

        if(props.columns && props.columns.length > 0) {
/*            props.columns.map((elem, index) => {
                coef += elem.order;
            });*/

            let sums = 0;
            props.columns.map((elem, index) => {
                columns.push({field: elem.field, header: elem.header, style: elem.style, sortable: elem.sortable, order: elem.order, default: elem.default});
                //columns.push({field: elem.field, header: elem.header, style: elem.style, sortable: elem.sortable, order: elem.order});
                if(elem.default) {
                    sums += elem.order;
                    selectedColumns.push({
                        field: elem.field,
                        header: elem.header,
                        style: elem.style,
                        sortable: elem.sortable,
                        order: elem.order,
                        default: elem.default
                    });
                }
            });
            coef = (sums > 0? 100/sums: 1);
        }

        this.state = {
            loading: true,
            items: [],
            totalRows: 0,
            limit: 20,
            currentPage: 1,
            first: 0,
            selectedItems: [],
            //visibleAdd: false,
            item: {},
            //scrollHeight: 0,
            selectedColumns: selectedColumns,
            columns: columns,
            columnCoef: coef,
            sortField: '',
            sortOrder: 0
        };
    }

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
        console.log('onColumnAdd');
        console.log(e);
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

    render() {
        const {t, location} = this.props;
        const { items, loading, selectedColumns, columns, columnCoef, selectedItems,
            totalRows, limit, currentPage, first, sortField, sortOrder} = this.state;

        console.log(currentPage);


        const paginatorRight = <div>
            <Button className={'grid-toolbar-unload'} icon="pi p-empty-button grid-unload-ico" style={{marginRight:'.25em'}} tooltip={t('baseLayout.main.buttons.tooltips.buttonUnload')} tooltipOptions={{position: 'left'}} />
            <Button className={'grid-toolbar-import'} icon="pi p-empty-button grid-import-ico" tooltip={t('baseLayout.main.buttons.tooltips.buttonImport')} tooltipOptions={{position: 'left'}} />
        </div>;

        const columnComponents = selectedColumns.map((col, index) => {
            return <Column key={'data-table-col-' + index} field={col.field} header={t(col.header)} sortable={col.sortable} style={Object.assign({},col.style, {width:(columnCoef*col.order)+'%'})} />;
        });



        return (<>
            <div className='data_grid_view'>
                <MultiSelect
                    maxSelectedLabels={columns.length}
                    className={'grid-add-column'}
                    placeholder={' '}
                    fixedPlaceholder={true}
                    value={selectedColumns}
                    options={columns}
                    optionValue='field'
                    optionLabel='header'
                    itemTemplate={(option) => {return t(option.header);}}
                    onChange={(e) => this.onColumnAdd(e)}
                    /*style={{width:'250px'}}*/
                    tooltip={t('baseLayout.main.buttons.tooltips.gridColumnAdd')}
                    tooltipOptions={{position: 'left'}}
                />

                {/*rows	number	null	Number of rows to display per page.
                totalRecords	number	null	Number of total records, defaults to length of value when not defined.
                lazy	boolean	false	Defines if data is loaded and interacted with in lazy manner.
                sortField	string	null	Name of the field to sort data by default.
                sortOrder*/}

                <DataTable value={items}
                    onRowDoubleClick={this.onSelect}
                           scrollable={true}
                           responsive={true}
                           resizableColumns={true}
                           sortField={sortField}
                           sortOrder={sortOrder}
                           /*scrollHeight={"100%"}*/
                           /*scrollHeight={scrollHeight}*/
                           /*currentPageReportTemplate={'{currentPage} of {totalPages}'}*/
                           currentPageReportTemplate={'{totalPages} ' + t('baseLayout.main.other.totalItemsLabel')}
                           totalRecords={totalRows}
                           lazy={true}
                           first={first}
                           currentPage={currentPage}
                           onPage={(e) => this.onPage(e)}
                           onSort={(e) => this.onSort(e)}
                           loading={loading}
                           paginatorRight={paginatorRight}
                           selection={selectedItems}
                           onSelectionChange={e => this.setState({selectedItems: e.value})}
                           paginator={true}
                           rows={limit}
                           paginatorPosition={'top'}
                           paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" rowsPerPageOptions={[10,20,50,100]}>
                    <Column key={'data-table-selection-key'} selectionMode="multiple" style={{width:'50px'}} />
                    {columnComponents}
                </DataTable>

            </div>
        </>);
    }

}

DataGridView.propTypes = {
    minimizeHeight: PropTypes.bool,
    apiService: PropTypes.any,
    location: PropTypes.object,
    columns: PropTypes.arrayOf(PropTypes.object)
};

export default withTranslation()(DataGridView);
