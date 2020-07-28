import React, { Component } from 'react';
import './catalogEdit.scss';
import {withTranslation} from "react-i18next";
import {catalogService} from "../../../service/catalog.service";
import {brandService} from "../../../service/brand.service";
import {manufacturerService} from "../../../service/manufacturer.service";
import {Toolbar} from "primereact/toolbar";
import {BreadCrumb} from "primereact/breadcrumb";
import {Button} from "primereact/button";
import CatalogMain from "./CatalogMain/CatalogMain";
import CatalogContent from "./CatalogContent/CatalogContent";
import CatalogCard from "./CatalogCard/CatalogCard";
import PropTypes from "prop-types";

class CatalogEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: {},
            manufacturers: [],
            countries: [],
            brands: [],
            selectedLi: 'main'
        };
        this.onChangeMethod = this.onChangeMethod.bind(this);
    }

    componentDidMount() {
        const id = window.location.pathname.split('/')[2];
        catalogService.getItem(id).then(res => {
            this.setState({item: res})
        });
    }

    onChangeMethod(e, key) {
        let obj = Object.assign({}, this.state.item);
        obj[key] = e.value;
        this.setState({ item: obj })
    }

    render() {
        const {t} = this.props;
        let  breadcrumbs = [
            { "label": t('catalog.breadcrumbs.name')},
            { "label": t('catalogEdit.breadcrumbs.name')}
        ];
        let {item, selectedLi} = this.state;

        return (
            <div className={'base-layout'}>
                <div className='navigation-add-menu'>
                    <ul>
                        <li className={(this.state.selectedLi === 'main')? 'selected-li' : ''} onClick={(e) => {
                            this.setState({selectedLi: 'main'})
                        }}><i className="pi pi-cog"></i> {t("baseLayout.editProduct.basic")}</li>
                        <li className={(this.state.selectedLi === 'content')? 'selected-li' : ''} onClick={(e) => {
                            this.setState({selectedLi: 'content'});
                        }}><i className="pi pi-images"></i> {t("baseLayout.editProduct.content")}</li>
                        <li className={(this.state.selectedLi === 'card')? 'selected-li' : ''} onClick={(e) => {
                            this.setState({selectedLi: 'card'})
                        }}><i className="pi pi-copy"></i> {t("baseLayout.editProduct.card")}</li>
                        <li  className={(this.state.selectedLi === 'history')? 'selected-li' : ''} onClick={(e) => {
                            this.setState({selectedLi: 'history'})
                        }}><i className="pi pi-replay"></i> {t("baseLayout.editProduct.history")}</li>
                    </ul>
                </div>
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
                        {selectedLi === 'main' ?
                            <CatalogMain
                                item={item}
                                brands={this.state.brands}
                                countries={this.state.countries}
                                manufacturers={this.state.manufacturers}
                                onChangeMethod={this.onChangeMethod}
                            /> : selectedLi === 'content'?
                                <CatalogContent
                                    item={item}
                                />:selectedLi === 'card'?
                                    <CatalogCard
                                        item={item}
                                    />:selectedLi === 'history'?
                                        <div>
                                            history
                                        </div>:<div></div>}
                        <div className='edit-grid-footer'>
                            <div>
                                {t("baseLayout.editProduct.dateCreate")}:<br/>
                                <span>20.05.2020</span>
                            </div>
                            <div>
                                {t("baseLayout.editProduct.creator")}:<br/>
                                <span></span>
                            </div>
                            <div>
                                {t("baseLayout.editProduct.dateEdit")}:<br/>
                                <span></span>
                            </div>
                            <div>
                                {t("baseLayout.editProduct.editor")}:<br/>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(CatalogEdit);