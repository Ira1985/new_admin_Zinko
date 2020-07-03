import React, { Component } from 'react';
import './dataGridView.scss';
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {MultiSelect} from "primereact/multiselect";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import BaseLayout from "../BaseLayout/BaseLayout";
import {Button} from "primereact/button";

class  DataGridView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            totalRows: 0,
            selectedItems: [],
            visibleAdd: false,
            item: {},
            scrollHeight: 0,
            selectedColumns: [
                {field: 'name', header: 'Имя'},
                {field: 'comment', header: 'Коментарий'},
                {field: 'description', header: 'Описание'},
                {field: 'code', header: 'Код'}
            ],
            columns: [
                {field: 'name', header: 'Имя'},
                {field: 'comment', header: 'Коментарий'},
                {field: 'description', header: 'Описание'},
                {field: 'code', header: 'Код'},
            ],
        };
    }

    render() {
        const {t} = this.props;

        let total = this.state.totalRows + ' результатов';

        const paginatorRight = <div>
            <Button icon="pi pi-download" style={{marginRight:'.25em'}}/>
            <Button icon="pi pi-upload" />
        </div>;

        const columnComponents = this.state.selectedColumns.map(col=> {
            return <Column field={col.field} header={col.header} sortable />;
        });



        return (<>
            <div className='data_grid_view'>
                <MultiSelect value={this.state.selectedColumns} options={this.state.columns} optionLabel='header' onChange={this.onColumnToggle} style={{width:'250px'}}/>

                <DataTable value={this.state.items}
                    /*onRowDoubleClick={this.onSelect}*/
                           scrollable={true}
                    /*scrollHeight={scrollHeight}*/
                           currentPageReportTemplate={total}
                           paginatorRight={paginatorRight}
                           selection={this.state.selectedItems}
                           onSelectionChange={e => this.setState({selectedItems: e.value})}
                           paginator
                           rows={10}
                           paginatorPosition={'top'}
                           paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" rowsPerPageOptions={[10,20,50,100]}>
                    <Column selectionMode="multiple" style={{width:'50px'}} />
                    {columnComponents}
                </DataTable>
            </div>
        </>);
    }

}

DataGridView.propTypes = {
};

export default withTranslation()(DataGridView);
