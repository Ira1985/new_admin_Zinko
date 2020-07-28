import React, { Component } from 'react';
import './catalogPreview.scss';
import {withTranslation} from "react-i18next";
import {catalogService} from "../../../service/catalog.service";
import PropTypes from "prop-types";
import {Toolbar} from "primereact/toolbar";
import {BreadCrumb} from "primereact/breadcrumb";
import {Button} from "primereact/button";
import emptyImg from "../../../assets/img/EmptyImg.png"
import {TabView,TabPanel} from 'primereact/tabview';
import {ScrollPanel} from 'primereact/scrollpanel';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

class CatalogPreview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            item: null,
            expandedRows: []
        };
        this.headerTemplate = this.headerTemplate.bind(this);
    }

    componentDidMount() {
        const id = window.location.pathname.split('/')[2] + "/preview";
        catalogService.getItem(id).then(res => {
            this.setState({item: res.pageItems[0]})
        });
    }

    headerTemplate(data) {
        return data.groupName;
    }
    footerTemplate(data, index) {
        return (
            <React.Fragment>
            </React.Fragment>
        );
    }

    render() {
        const {t} = this.props;
        let  breadcrumbs = [
            { "label": t('catalog.breadcrumbs.name')},
            { "label": t('catalogPreview.breadcrumbs.name')}
        ];
        let {activeIndex, item, expandedRows} = this.state;

        return (
            <div className={'base-layout'}>
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
                        <ScrollPanel>
                            <div className="product-preview">
                                {item ?
                                    (<div className="product-details">
                                        <div className='preview-container'>
                                            <div className='image-grid'>
                                                <img src={item.baseImage ?'http://212.24.48.52/statics/' + item.baseImage : emptyImg}
                                                     alt={'test'}/>
                                            </div>
                                            <div className="p-grid">
                                                <div className='full-name-product'><span>{item.fullName}</span></div>
                                                <div className='code-product'><span>{t("baseLayout.previewProduct.article")}: {item.article}</span></div>
                                                <div className='code-product'><span>{t("baseLayout.previewProduct.productId")}: {item.productId}</span></div>
                                                <div className='code-product'><span>{t("baseLayout.previewProduct.productCode")}: {item.code}</span></div>
                                            </div>
                                        </div>
                                        <div className='preview-container'>
                                            <div className='clascat-grid'>
                                                <Toolbar>
                                                    <div className="p-toolbar-group-left">
                                                        {t("baseLayout.previewProduct.propertyProduct")}
                                                    </div>
                                                    <hr/>
                                                </Toolbar>
                                                <div className='code-product'>
                                                    <div><span>{t("baseLayout.previewProduct.status")}:<br/><span>{item.status}</span></span></div>
                                                    <div><span>{t("baseLayout.previewProduct.typeProduct")}:<br/><span>{item.typeProduct}</span></span></div>
                                                    <div><span>{t("baseLayout.previewProduct.country")}:<br/><span>{item.countryName}</span></span></div>
                                                    <div><span>{t("baseLayout.previewProduct.vendor")}:<br/><span>{item.manufacturerName}</span></span></div>
                                                    <div><span>{t("baseLayout.previewProduct.brand")}:<br/><span>{item.brandName}</span></span></div>
                                                    <div><span>{t("baseLayout.previewProduct.family")}:<br/><span>{item.familyName}</span></span></div>
                                                    <div><span>{t("baseLayout.previewProduct.series")}:<br/><span>{item.seriesName}</span></span></div>
                                                    <div><span>{t("baseLayout.previewProduct.model")}:<br/><span>{item.modelName}</span></span></div>
                                                    <div><span>{t("baseLayout.previewProduct.barcodes")}:<br/>{item.barcodes &&
                                                    item.barcodes.map((item,index)=>
                                                        <span>{item.barcode}</span>
                                                    )
                                                    }</span></div>
                                                    <div><span>{t("baseLayout.previewProduct.categories")}:<br/>{item.categories &&
                                                    item.categories.map((item,index)=>
                                                        <span>{item.name + ' (' + item.code + ')'}</span>
                                                    )
                                                    }</span></div>
                                                </div>
                                                <Toolbar>
                                                    <div className="p-toolbar-group-left">
                                                        {t("baseLayout.previewProduct.propertyContent")}
                                                    </div>
                                                    <hr/>
                                                </Toolbar>
                                            </div>
                                            <div className="character-grid">
                                                <TabView activeIndex={activeIndex} onTabChange={(e) => this.setState({activeIndex: e.index})}>
                                                    <TabPanel header={t("baseLayout.previewProduct.productCharacteristics")}>
                                                        <DataTable value={item.productCards.cards} rowGroupMode="subheader" sortField="groupName" sortOrder={0} groupField="groupName"
                                                                   rowGroupHeaderTemplate={this.headerTemplate} rowGroupFooterTemplate={this.footerTemplate}
                                                                   expandableRowGroups={true} expandedRows={expandedRows} onRowToggle={(e) => this.setState({expandedRows:e.data})}>
                                                            <Column field="attribute.name" />
                                                            <Column field="value" />
                                                            <Column field="unit.name" />
                                                        </DataTable>
                                                    </TabPanel>
                                                    <TabPanel header={t("baseLayout.previewProduct.accessories")}>

                                                    </TabPanel>
                                                </TabView>
                                            </div>
                                        </div>
                                    </div>) : <div></div>}
                            </div>
                        </ScrollPanel>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(CatalogPreview);