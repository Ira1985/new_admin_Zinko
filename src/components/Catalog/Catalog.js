import React, { Component } from 'react';
import './catalog.scss';
import {withTranslation} from "react-i18next";
import {catalogService} from "../../service/catalog.service";
import PropTypes from "prop-types";
import FilterSection from "../layouts/BaseLayout/FilterSection/FilterSection";
import {Toolbar} from "primereact/toolbar";
import {BreadCrumb} from "primereact/breadcrumb";
import {Button} from "primereact/button";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Panel } from 'primereact/panel';
import {Checkbox} from 'primereact/checkbox';
import {SplitButton} from "primereact/splitbutton";
import {history} from "../../App";
import emptyImg from "../../assets/img/EmptyImg.png"

class Catalog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gridView: true,

            items: [],
            layout: 'grid',
            selectedItems: [],
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
            checked: {},
        };
        this.itemTemplate = this.itemTemplate.bind(this);
    }

    filterLoading = false;
    filterItems = [];

    imgTemplate(rowData, column) {
        let src;
        if (!rowData.baseImage) {
            src = emptyImg;
        } else {
            src = 'http://212.24.48.52/statics/' + rowData.baseImage;
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
                            <p>{product.fullName}</p>
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
        const {t} = this.props;
        let  breadcrumbs = [{ "label": t('catalog.breadcrumbs.name')}];
        let {gridView, items, layout, selectedItems} = this.state;

        const paginatorLeft = (<div>
            <DataViewLayoutOptions layout={layout} onChange={(e) => this.setState({layout: e.value})} />
        </div>);

        const paginatorRight =(<div>
            <Button className={'grid-toolbar-unload'} icon="pi pi-download" style={{marginRight:'.25em'}}/>
            <Button className={'grid-toolbar-import'} icon="pi pi-upload" onClick={() => console.log(Object.values(this.state.checked))} />
        </div>);

        return (
            <div className={'base-layout'}>
                <FilterSection filteringData={this.filterLoading} fields={this.filterItems}></FilterSection>
                <div className='main-section'>
                    <div className='header'>
                        <Toolbar>
                            <div className="p-toolbar-group-left">
                                <BreadCrumb model={breadcrumbs} home={{label: 'Главная', icon: 'pi pi-home', url: 'dashboard'}} />
                            </div>
                            <div className="p-toolbar-group-right">
                                <Button label={t('baseLayout.main.buttons.buttonAdd')} className={'button-success'}  onClick={(e) => console.log('')}/>
                            </div>
                        </Toolbar>
                    </div>

                    <hr/>

                    <div className='base-data-section'>
                        {/*{children}*/}
                        {gridView && <div className='data_grid_view'>
                            <DataView value={items}
                                      onRowDoubleClick={this.onSelect}
                                      layout={layout}
                                      responsive={true}
                                      autoLayout={true}
                                      itemTemplate={this.itemTemplate}
                                      scrollable={true} scrollHeight='calc(100vh - 225px)'
                                      currentPageReportTemplate={'{totalRecords} ' + t('baseLayout.main.other.totalItemsLabel')} paginatorRight={paginatorRight} paginatorLeft={paginatorLeft}
                                      selection={selectedItems} onSelectionChange={e => this.setState({selectedItems: e.value})}
                                      paginator rows={20} paginatorPosition={'top'}
                                      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" rowsPerPageOptions={[20,40,60,80,100]}
                            />
                        </div>}
                        {/*{treeView && }*/}
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(Catalog);