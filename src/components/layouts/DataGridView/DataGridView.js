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
        this.state = {
            loading: true,
            items: [],
            totalRows: 0,
            selectedItems: [],
            visibleAdd: false,
            item: {},
            scrollHeight: 0,
            selectedColumns: [
                {field: 'name', header: 'Имя', style:{width:'40%'}, sortable: true},
                {field: 'comment', header: 'Коментарий', style:{width:'40%'}, sortable: false},
                /*{field: 'description', header: 'Описание'},*/
                {field: 'code', header: 'Код', style:{width:'20%'}, sortable: true}
            ],
            columns: [
                {field: 'name', header: 'Имя', style:{width:'40%'},sortable: true},
                {field: 'comment', header: 'Коментарий', style:{width:'40%'}, sortable: false},
                /*{field: 'description', header: 'Описание'},*/
                {field: 'code', header: 'Код', style:{width:'20%'}, sortable: true}
            ],
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

    getList(filtering, sorting, paging, changingPage) {

        this.setState({
            loading: true
        });
        this.props.apiService.getList(filtering, sorting, paging)
            .then(response => {
                    if(changingPage) {
                        let newPaging = new Paging();
                        if(response) {
                            //let newPaging = new Paging();
                            newPaging = Object.assign({}, paging, {
                                page: 1,
                                count: response.totalRows,
                                totalPages: response.totalPages
                            });
                        }
                        this.setState({
                            paging: newPaging
                        });
                    }

                    console.log(response ? response.pageItems : []);

                    this.setState({
                        items: response ? response.pageItems : [],
                        loading: false
                    });
                },
                error => {
                    this.setState({
                        items: [],
                        loading: false,
                        paging: new Paging(),
                    });
                });
    }





    render() {
        const {t, location} = this.props;
        const {columns, items, loading} = this.state;

        let total = this.state.totalRows + ' результатов';

        const paginatorRight = <div>
            <Button className={'grid-toolbar-unload'} icon="pi p-empty-button grid-unload-ico" style={{marginRight:'.25em'}} tooltip={t('baseLayout.main.buttons.tooltips.buttonUnload')} tooltipOptions={{position: 'left'}} />
            <Button className={'grid-toolbar-import'} icon="pi p-empty-button grid-import-ico" tooltip={t('baseLayout.main.buttons.tooltips.buttonImport')} tooltipOptions={{position: 'left'}} />
        </div>;

        const columnComponents = this.state.selectedColumns.map((col, index) => {
            return <Column key={'data-table-col-' + index} field={col.field} header={col.header} sortable={col.sortable} style={col.style} />;
        });

        return (<>
            <div className='data_grid_view'>
                <MultiSelect
                    className={'grid-add-column'}
                    placeholder={' '}
                    fixedPlaceholder={true}
                    value={this.state.selectedColumns}
                    options={this.state.columns}
                    optionLabel='header'
                    onChange={this.onColumnToggle}
                    style={{width:'250px'}}
                    tooltip={t('baseLayout.main.buttons.tooltips.gridColumnAdd')}
                    tooltipOptions={{position: 'left'}}
                />
                <DataTable value={this.state.items}
                    onRowDoubleClick={this.onSelect}
                           scrollable={true}
                           responsive={true}
                           resizableColumns={true}
                           /*scrollHeight={"100%"}*/
                           /*scrollHeight={scrollHeight}*/
                           currentPageReportTemplate={total}
                           paginatorRight={paginatorRight}
                           selection={this.state.selectedItems}
                           onSelectionChange={e => this.setState({selectedItems: e.value})}
                           paginator
                           rows={10}
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
    location: PropTypes.object
};

export default withTranslation()(DataGridView);
