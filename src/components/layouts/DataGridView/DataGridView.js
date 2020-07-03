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
                {field: 'name', header: 'Имя'},
                {field: 'comment', header: 'Коментарий'},
                /*{field: 'description', header: 'Описание'},*/
                {field: 'code', header: 'Код'}
            ],
            columns: [
                {field: 'name', header: 'Имя'},
                {field: 'comment', header: 'Коментарий'},
                /*{field: 'description', header: 'Описание'},*/
                {field: 'code', header: 'Код'},
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
            <Button icon="pi pi-download" style={{marginRight:'.25em'}}/>
            <Button icon="pi pi-upload" />
        </div>;

        const columnComponents = this.state.selectedColumns.map((col, index) => {
            return <Column key={'data-table-col-' + index} field={col.field} header={col.header} sortable />;
        });

        return (<>
            <div className='data_grid_view'>
                {/*<MultiSelect value={this.state.selectedColumns} options={this.state.columns} optionLabel='header' onChange={this.onColumnToggle} style={{width:'250px'}}/>*/}

                <table className="dgv_table">
                    <thead style={{background: "#3e3e47"}}>
                    <tr className="gv_header">
                        <th className="gv_select-all">
                            <img src={'/assets/img/icons/select_all2.png'} width="25" height="25" onClick={(event)=>{
                                return this.addAllToChecked();
                            }} style={{position:'relative',left: '-3px', width: '25px', height: '25px'}}/>
                        </th>
                        {fields.map(field =>
                            <th key={field.name} name={field.name} style={field.style ? field.style:''}>
                                <div className='header-name'>
                                    <span className='gv_header_name'>{field.type == 'button'?'':field.title}</span>
                                    {(field.sorting) &&
                                    <React.Fragment>
                                        {(sorter.name != field.name) && <span className="fa fa-sort" style={{width:'15px'}} onClick={()=>sorting(field.name, 'desc')}></span>}
                                        {(sorter.name == field.name && sorter.directions == 'asc') && <span className="cui-sort-ascending"  style={{width:'15px'}} onClick={()=>sorting(field.name, 'desc')}></span>}
                                        {(sorter.name == field.name && sorter.directions == 'desc') && <span className="cui-sort-descending" style={{width:'15px'}} onClick={()=>sorting(field.name, 'asc')}></span>}
                                    </React.Fragment>
                                    }
                                </div>
                            </th>
                        )}
                    </tr>
                    </thead>
                    <tbody className="gv_body" style={tbodyStyle?tbodyStyle:{}}>
                    {loading ?
                        <tr style={{display:'block',width:'100%'}}>
                            <td colSpan={fields.length} style={{textAlign:'center',display:'block',width:'100%'}}>
                                <LoadingSpiner/>
                            </td>
                        </tr>
                        : <React.Fragment>
                            {(values && values.length > 0) && values.map((val, index) =>
                                <React.Fragment key={'frag-' + val.id}>
                                    <tr key={val.id} className={checked.has(val.id)?'checked-list':''}>
                                        {/*<td style={{width:'50px'}}><input className="form-check-input" type="checkbox" value=""/></td>*/}
                                        <td className='for_product_finder_win'
                                            style={{width: '50px', minWidth: '50px', verticalAlign: 'middle'}} onClick={(event) => {
                                            if (event.target.classList.contains('for_product_finder_win')) {
                                                //event.target.firstElementChild.parentElement.parentElement.classList.toggle('checked-list');
                                                return this.addToChecked(val);
                                            }
                                        }}><input type="checkbox" checked={checked.has(val.id)}
                                                  onChange={(event) => {
                                                      return this.addToChecked(val);
                                                  }}/></td>
                                        {fields.map((field, index2) =>
                                            <td style={field.style && field.style} key={val.id + '-' + index2}
                                                onDoubleClick={() => {
                                                    if(!disableEdit)
                                                        editItem(val);
                                                }}>{this.buildRowItem(val, field)}</td>
                                        )}
                                    </tr>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    }
                    </tbody>
                </table>





                /*
                <DataTable value={this.state.items}
                    onRowDoubleClick={this.onSelect}
                           scrollable={true}
                           scrollHeight={"200px"}
                           scrollHeight={scrollHeight}
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
                */

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
