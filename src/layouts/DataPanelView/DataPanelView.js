import React, { Component } from 'react';
import './dataPanelView.scss';
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
import {DataView, DataViewLayoutOptions} from "primereact/dataview";
import emptyImg from "../../assets/img/EmptyImg.png";
import {Checkbox} from "primereact/checkbox";
import {history} from "../../App";
import {Panel} from "primereact/panel";
import {SplitButton} from "primereact/splitbutton";

class  DataPanelView extends Component {

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
            layout: 'grid',
            loading: true,
            items: [],

            selectedItems: new Map(),
            freezItems: new Map(),
            item: {},
            selectedColumns: selectedColumns,
            checked: {},
            columns: columns,
            multiColumns: new Map([...multiColumns.entries()].sort((a1,a2) => {return ((a1[1].order > a2[1].order)?1:(a1[1].order < a2[1].order)?-1:0)})),
            columnCoef: coef,

            sorter: props.sorterInit? new Sorter().build(props.sorterInit.name, props.sorterInit.directions):new Sorter(),
            paging: props.pagingInit? new Paging().build(props.pagingInit): new Paging(),
            filters: Object.assign({},props.filterInit ? props.filterInit:{}),
            activeColumns: [],
            buttons: [
                {
                    label: props.t('baseLayout.main.buttons.buttonDel'),
                    command: (e) => {
                        console.log(e.originalEvent.currentTarget);
                    }
                },
                {
                    label: props.t('baseLayout.main.buttons.buttonExportResult'),
                    command: (e) => {
                        console.log(e);
                    }
                },
                {
                    label: props.t('baseLayout.main.buttons.buttonClone'),
                    command:(e) => {
                        console.log(e)
                    }
                }
            ],
        };

        this.itemTemplate = this.itemTemplate.bind(this);

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
        //this.setState({
            //activeColumns: this.rebuildColumns(selectedColumns,columnCoef)
        //});
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
            page: (e.originalEvent.page + 1),
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
        let {updateChecked, checkedItems} = this.props;
        let {items, selectedItems} = this.state;
        let newCheckedItems = new Map();
        Object.keys(e.value).forEach(item => {
            newCheckedItems.set(item, items.get(item));
        });
        this.setState({
            selectedItems: e.value
        });

        updateChecked(newCheckedItems);
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

    imgTemplate(rowData, column) {
        let src;
        if (!rowData.baseImage) {
            src = emptyImg;
        } else {
            src = 'http://185.95.22.17/statics/' + rowData.baseImage;
        }
        return (
            <div className='main-container-image'>
                {this.state.layout === 'grid' ? <div className={'checked-box' + (this.state.checked.hasOwnProperty(rowData.id) ? ' visible-checked': '')}>

                    <Checkbox checked={this.state.checked.hasOwnProperty(rowData.id)} onChange={e => {
                        let item = Object.assign({}, this.state.checked);
                        item[rowData.id] = rowData;
                        if(e.checked) {
                            e.originalEvent.currentTarget.parentElement.classList.add('visible-checked')
                        } else {
                            e.originalEvent.currentTarget.parentElement.classList.remove('visible-checked');
                            delete item[rowData.id]
                        }
                        this.setState({checked: item})

                    }}/>
                </div> : null}
                <div className='container-image'>
                    <div>
                        <img src={src} alt={rowData.brand} style={{maxWidth: '100%', maxHeight: '250px'}}  />
                    </div>
                </div>
            </div>
        );
    }

    itemTemplate(product, layout, index) {
        const {t} = this.props;
        if (!product) {
            return;
        }

        if (layout === 'list')
            return (
                <div style={{display:'flex'}} className={'p-col-12' + (this.state.checked.hasOwnProperty(product.id) ? ' checked-table-row': '')}>
                    <div style={{width:'2%'}}><Checkbox checked={this.state.checked.hasOwnProperty(product.id)} onChange={e => {
                        let item = Object.assign({}, this.state.checked);
                        item[product.id] = product;
                        if(e.checked) {
                            e.originalEvent.currentTarget.parentElement.parentElement.classList.add('checked-table-row')
                            //e.originalEvent.currentTarget.parentElement.classList.add('visible-checked')
                        } else {
                            e.originalEvent.currentTarget.parentElement.parentElement.classList.remove('checked-table-row')
                            //e.originalEvent.currentTarget.parentElement.classList.remove('visible-checked');
                            delete item[product.id]
                        }
                        this.setState({checked: item})

                    }} /></div>
                    <div style={{width:'5%'}}><span>{this.imgTemplate(product)}</span></div>
                    <div style={{width:'30%'}}><span className='text-table-div'>{product.fullName}</span></div>
                    <div style={{width:'30%'}}><span className='text-table-div'>{product.description}</span></div>
                    <div style={{width:'20%'}}><span className='text-table-div'>{product.article}</span></div>
                    <div style={{width:'10%'}}><span className='text-table-div'>{product.article}</span></div>
                    <div style={{width:'3%'}}><span className='text-table-div'>{<div>
                        <i className="pi pi-eye" style={{marginRight:'.25em'}} onClick={(e) => {
                            history.push('catalog/' + product.productId + '/preview')
                        }}></i>
                        <i className="pi pi-pencil" onClick={(e) => {
                            history.push('catalog/' + product.productId + '/edit')
                        }}></i>
                    </div>}</span></div>
                </div>
            );
        else if (layout === 'grid')
            return (
                <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">
                    <Panel header={this.imgTemplate(product)}>
                        <div className="product-detail">
                            <p>{product.article}</p>
                            <span>{product.productId}</span>
                        </div>
                        <div className="product-button">
                            <Button className={'button-bottom-unload'} label={t('baseLayout.main.buttons.buttonPreview')} style={{marginRight:'.25em'}} onClick={(e) => {
                                history.push('catalog/' + product.productId + '/preview')
                            }} />
                            <Button className={'button-bottom-unload'} label={t('baseLayout.main.buttons.buttonEdit')} style={{marginRight:'.25em'}} onClick={(e) => {
                                history.push('catalog/' + product.productId + '/edit')
                            }} />
                            <SplitButton model={this.state.buttons} tabIndex={product}></SplitButton>
                        </div>
                    </Panel>
                </div>
            );
    }

    render() {
        const {t, minimizeHeight, checkedItems, contexmenuItem} = this.props;
        const { items, loading, selectedColumns, columns, multiColumns, columnCoef, layout, paging, sorter, activeColumns} = this.state;

        const paginatorLeft = (<div>
            <DataViewLayoutOptions layout={layout} onChange={(e) => this.setState({layout: e.value})} />
        </div>);

        const paginatorRight = <div>
            <Button className={'grid-toolbar-unload'} icon="pi p-empty-button grid-unload-ico" style={{marginRight:'.25em'}} tooltip={t('baseLayout.main.buttons.tooltips.buttonUnload')} tooltipOptions={{position: 'left'}} />
            <Button className={'grid-toolbar-import'} icon="pi p-empty-button grid-import-ico" tooltip={t('baseLayout.main.buttons.tooltips.buttonImport')} tooltipOptions={{position: 'left'}} />
        </div>;

        return (<>
            <div ref={this.dataGridView} className='data_panel_view'>

                <DataView value={items}
                          layout={layout}
                          responsive={true}
                          autoLayout={true}
                          itemTemplate={this.itemTemplate}
                          resizableColumns={true}
                          className={minimizeHeight?'minimize-height-body': ''}
                          sortField={sorter.name}
                          sortOrder={sorter.directions === 'desc'?1:-1}
                          scrollable={true}
                          scrollHeight={minimizeHeight?'calc(100vh - 325px)': 'calc(100vh - 225px)'}
                          currentPageReportTemplate={'{totalRecords} ' + t('baseLayout.main.other.totalItemsLabel')}
                          totalRecords={paging.count}
                          lazy={true}
                          first={(paging.page - 1) * paging.limit}
                          onPage={(e) => this.onPage(e)}
                          onSort={(e) => this.onSort(e)}
                          loading={loading}
                          paginatorRight={paginatorRight}
                          paginatorLeft={paginatorLeft}
                          selection={Array.from(checkedItems.values())}
                          onSelectionChange={e => this.selectItem(e)}
                          paginator
                          rows={20}
                          paginatorPosition={'top'}
                          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                          rowsPerPageOptions={[20,40,60,80,100]}
                />

            </div>
        </>);
    }

}

DataPanelView.propTypes = {
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

export default withTranslation()(DataPanelView);