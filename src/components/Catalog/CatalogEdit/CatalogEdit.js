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
            item: {
                accessories: [],
                article: "EHAW-7510D",
                barcodes: [],
                baseImage: "20200321/92d63649-c24d-4f4d-8520-e9a0f983b090.jpg",
                brandName: "ELECTROLUX",
                categories: [{
                    code: null,
                    comment: null,
                    customerId: null,
                    definition: "050102",
                    deleted: false,
                    description: null,
                    enabled: true,
                    forMatchingAnalog: false,
                    foreignMarket: false,
                    fromNsi: false,
                    id: 44497,
                    layout: false,
                    name: "Мойки воздуха90",
                    orderSort: null,
                    parent: {
                        code: null,
                        comment: null,
                        customerId: null,
                        definition: null,
                        deleted: false,
                        description: null,
                        enabled: true,
                        forMatchingAnalog: false,
                        foreignMarket: false,
                        fromNsi: false,
                        id: 44491,
                        layout: false,
                        name: "Увлажнители",
                        orderSort: null,
                        parent: null,
                        path: "/44484/44486/44487/44491/",
                        predefined: false,
                        uniqueId: "e6609ece-3077-4897-aa77-8db6bcd0e09a",
                    },
                    path: "/44484/44486/44487/44491/44497/",
                    predefined: false,
                    uniqueId: "a52c1016-965d-4a82-8d0a-9fedba58af50",
                }],
                code: null,
                comment: null,
                contents: [
                    {
                        code: null,
                        comment: null,
                        customerId: null,
                        deleted: false,
                        description: null,
                        enabled: true,
                        extension: "jpg",
                        fromNsi: false,
                        fullName: null,
                        id: 41904,
                        internal: false,
                        length: null,
                        link: "20200321/87f6c347-1716-4c4d-98e0-19d5852ed58b.jpg",
                        main: false,
                        name: "4",
                        nsiPath: null,
                        path: null,
                        prId: 190986,
                        predefined: false,
                        productId: "200321181529870",
                        sources: null,
                        type: "IMAGE",
                        uniqueId: "87f6c347-1716-4c4d-98e0-19d5852ed58b"
                    },
                    {
                        code: null,
                        comment: null,
                        customerId: null,
                        deleted: false,
                        description: null,
                        enabled: true,
                        extension: "jpg",
                        fromNsi: false,
                        fullName: null,
                        id: 41903,
                        internal: false,
                        length: null,
                        link: "20200321/56082d61-7f56-4284-8c1c-ff4492b24f56.jpg",
                        main: false,
                        name: "3",
                        nsiPath: null,
                        path: null,
                        prId: 190986,
                        predefined: false,
                        productId: "200321181529870",
                        sources: null,
                        type: "IMAGE",
                        uniqueId: "56082d61-7f56-4284-8c1c-ff4492b24f56"
                    },
                    {
                        code: null,
                        comment: null,
                        customerId: null,
                        deleted: false,
                        description: null,
                        enabled: true,
                        extension: "jpg",
                        fromNsi: false,
                        fullName: null,
                        id: 41902,
                        internal: false,
                        length: null,
                        link: "20200321/36217f5b-a053-40d8-b09b-62cac06659dc.jpg",
                        main: false,
                        name: "2",
                        nsiPath: null,
                        path: null,
                        prId: 190986,
                        predefined: false,
                        productId: "200321181529870",
                        sources: null,
                        type: "IMAGE",
                        uniqueId: "36217f5b-a053-40d8-b09b-62cac06659dc"
                    },
                    {
                        code: null,
                        comment: null,
                        customerId: null,
                        deleted: false,
                        description: null,
                        enabled: true,
                        extension: "jpg",
                        fromNsi: false,
                        fullName: null,
                        id: 41901,
                        internal: false,
                        length: null,
                        link: "20200321/92d63649-c24d-4f4d-8520-e9a0f983b090.jpg",
                        main: true,
                        name: "1",
                        nsiPath: null,
                        path: null,
                        prId: 190986,
                        predefined: false,
                        productId: "200321181529870",
                        sources: null,
                        type: "IMAGE",
                        uniqueId: "92d63649-c24d-4f4d-8520-e9a0f983b090"
                    },
                    {
                        code: null,
                        comment: null,
                        customerId: null,
                        deleted: false,
                        description: null,
                        enabled: true,
                        extension: "jpg",
                        fromNsi: false,
                        fullName: null,
                        id: 41904,
                        internal: false,
                        length: null,
                        link: "20200321/87f6c347-1716-4c4d-98e0-19d5852ed58b.jpg",
                        main: false,
                        name: "4",
                        nsiPath: null,
                        path: null,
                        prId: 190986,
                        predefined: false,
                        productId: "200321181529870",
                        sources: null,
                        type: "IMAGE",
                        uniqueId: "87f6c347-1716-4c4d-98e0-19d5852ed58b"
                    },
                    {
                        code: null,
                        comment: null,
                        customerId: null,
                        deleted: false,
                        description: null,
                        enabled: true,
                        extension: "jpg",
                        fromNsi: false,
                        fullName: null,
                        id: 41903,
                        internal: false,
                        length: null,
                        link: "20200321/56082d61-7f56-4284-8c1c-ff4492b24f56.jpg",
                        main: false,
                        name: "3",
                        nsiPath: null,
                        path: null,
                        prId: 190986,
                        predefined: false,
                        productId: "200321181529870",
                        sources: null,
                        type: "IMAGE",
                        uniqueId: "56082d61-7f56-4284-8c1c-ff4492b24f56"
                    },
                    {
                        code: null,
                        comment: null,
                        customerId: null,
                        deleted: false,
                        description: null,
                        enabled: true,
                        extension: "jpg",
                        fromNsi: false,
                        fullName: null,
                        id: 41902,
                        internal: false,
                        length: null,
                        link: "20200321/36217f5b-a053-40d8-b09b-62cac06659dc.jpg",
                        main: false,
                        name: "2",
                        nsiPath: null,
                        path: null,
                        prId: 190986,
                        predefined: false,
                        productId: "200321181529870",
                        sources: null,
                        type: "IMAGE",
                        uniqueId: "36217f5b-a053-40d8-b09b-62cac06659dc"
                    },
                    {
                        code: null,
                        comment: null,
                        customerId: null,
                        deleted: false,
                        description: null,
                        enabled: true,
                        extension: "jpg",
                        fromNsi: false,
                        fullName: null,
                        id: 41901,
                        internal: false,
                        length: null,
                        link: "20200321/92d63649-c24d-4f4d-8520-e9a0f983b090.jpg",
                        main: true,
                        name: "1",
                        nsiPath: null,
                        path: null,
                        prId: 190986,
                        predefined: false,
                        productId: "200321181529870",
                        sources: null,
                        type: "IMAGE",
                        uniqueId: "92d63649-c24d-4f4d-8520-e9a0f983b090"
                    },
                    {
                        code: null,
                        comment: null,
                        customerId: null,
                        deleted: false,
                        description: null,
                        enabled: true,
                        extension: "jpg",
                        fromNsi: false,
                        fullName: null,
                        id: 41904,
                        internal: false,
                        length: null,
                        link: "20200321/87f6c347-1716-4c4d-98e0-19d5852ed58b.jpg",
                        main: false,
                        name: "4",
                        nsiPath: null,
                        path: null,
                        prId: 190986,
                        predefined: false,
                        productId: "200321181529870",
                        sources: null,
                        type: "IMAGE",
                        uniqueId: "87f6c347-1716-4c4d-98e0-19d5852ed58b"
                    },
                    {
                        code: null,
                        comment: null,
                        customerId: null,
                        deleted: false,
                        description: null,
                        enabled: true,
                        extension: "jpg",
                        fromNsi: false,
                        fullName: null,
                        id: 41903,
                        internal: false,
                        length: null,
                        link: "20200321/56082d61-7f56-4284-8c1c-ff4492b24f56.jpg",
                        main: false,
                        name: "3",
                        nsiPath: null,
                        path: null,
                        prId: 190986,
                        predefined: false,
                        productId: "200321181529870",
                        sources: null,
                        type: "IMAGE",
                        uniqueId: "56082d61-7f56-4284-8c1c-ff4492b24f56"
                    },
                    {
                        code: null,
                        comment: null,
                        customerId: null,
                        deleted: false,
                        description: null,
                        enabled: true,
                        extension: "jpg",
                        fromNsi: false,
                        fullName: null,
                        id: 41902,
                        internal: false,
                        length: null,
                        link: "20200321/36217f5b-a053-40d8-b09b-62cac06659dc.jpg",
                        main: false,
                        name: "2",
                        nsiPath: null,
                        path: null,
                        prId: 190986,
                        predefined: false,
                        productId: "200321181529870",
                        sources: null,
                        type: "IMAGE",
                        uniqueId: "36217f5b-a053-40d8-b09b-62cac06659dc"
                    },
                    {
                        code: null,
                        comment: null,
                        customerId: null,
                        deleted: false,
                        description: null,
                        enabled: true,
                        extension: "jpg",
                        fromNsi: false,
                        fullName: null,
                        id: 41901,
                        internal: false,
                        length: null,
                        link: "20200321/92d63649-c24d-4f4d-8520-e9a0f983b090.jpg",
                        main: true,
                        name: "1",
                        nsiPath: null,
                        path: null,
                        prId: 190986,
                        predefined: false,
                        productId: "200321181529870",
                        sources: null,
                        type: "IMAGE",
                        uniqueId: "92d63649-c24d-4f4d-8520-e9a0f983b090"
                    }
                ],
                countryName: "ЧЕШСКАЯ РЕСПУБЛИКА",
                deleted: false,
                description: "Мойка воздуха Electrolux EHAW-7510D black",
                enabled: true,
                familyName: null,
                fromNsi: false,
                fullName: "Мойка воздуха Electrolux EHAW-7510D black",
                id: 190986,
                manufacturerName: "ELECTROLUX",
                modelName: "EHAW-7510D black",
                name: null,
                nameManufacturerEn: null,
                nameManufacturerRu: null,
                options: [],
                owner: null,
                predefined: false,
                productCards: {
                    all: 44,
                    cards: [
                        {
                            all: 0,
                            attrUniqueId: "7df681a3-81b0-458e-ab22-a6b674b37c52",
                            attribute: {
                                attrCategory: {
                                    code: null,
                                    comment: "Мойки воздуха",
                                    deleted: false,
                                    enabled: true,
                                    fromNsi: false,
                                    id: 90,
                                    name: "Основные характеристики",
                                    order: 0,
                                    predefined: false,
                                    system: false,
                                    uniqueId: "5ee8be3a-801a-408f-bdef-7dc6c96142b2"
                                },
                                attrType: "GLOBAL",
                                code: null,
                                comment: "Мойки воздуха",
                                deleted: false,
                                enabled: true,
                                fromNsi: false,
                                hasQuantities: false,
                                id: 926,
                                length: -1,
                                name: "Назначение",
                                predefined: false,
                                quanSubsGroup: null,
                                quantType: "NUMBER",
                                roundUp: -1,
                                sourceType: "NONE",
                                subsGroup: {
                                    code: null,
                                    comment: "Мойки воздуха",
                                    deleted: false,
                                    enabled: true,
                                    fromNsi: false,
                                    id: 386,
                                    name: "Назначение",
                                    nsiAttrUniqueId: null,
                                    predefined: false,
                                    uniqueId: "9a6b3d04-73ce-43cb-8b02-46f1019afdd7"
                                },
                                system: false,
                                systemSource: "NONE",
                                uniqueId: "7df681a3-81b0-458e-ab22-a6b674b37c52",
                                unit: null,
                                valueType: "MULTI"
                            },
                            cards: {},
                            code: null,
                            comment: null,
                            deleted: false,
                            empty: 0,
                            enabled: true,
                            fill: 0,
                            fromNsi: false,
                            groupName: "Основные характеристики",
                            groupWeight: 0,
                            id: 588015,
                            key: false,
                            keyAll: 0,
                            keyFill: 0,
                            name: null,
                            prUniqueId: "595282bd-7ce5-4d67-a8f1-2b962f281b23",
                            predefined: false,
                            quan: null,
                            required: false,
                            requiredAll: 0,
                            requiredFill: 0,
                            sourceId: 1306,
                            sourceType: "NONE",
                            uniqueId: "0b99107f-1fc1-4327-a391-c0fda6fbe42b",
                            unit: null,
                            valUniqueId: "34ec6b81-471c-46bc-afc5-88e3411fd847",
                            value: "Очистка",
                            values: [{
                                all: 0,
                                attrUniqueId: "7df681a3-81b0-458e-ab22-a6b674b37c52",
                                attribute: {
                                    attrCategory: {
                                        code: null,
                                        comment: "Мойки воздуха",
                                        deleted: false,
                                        enabled: true,
                                        fromNsi: false,
                                        id: 90,
                                        name: "Основные характеристики",
                                        order: 0,
                                        predefined: false,
                                        system: false,
                                        uniqueId: "5ee8be3a-801a-408f-bdef-7dc6c96142b2"
                                    },
                                    attrType: "GLOBAL",
                                    code: null,
                                    comment: "Мойки воздуха",
                                    deleted: false,
                                    enabled: true,
                                    fromNsi: false,
                                    hasQuantities: false,
                                    id: 926,
                                    length: -1,
                                    name: "Назначение",
                                    predefined: false,
                                    quanSubsGroup: null,
                                    quantType: "NUMBER",
                                    roundUp: -1,
                                    sourceType: "NONE",
                                    subsGroup: {
                                        code: null,
                                        comment: "Мойки воздуха",
                                        deleted: false,
                                        enabled: true,
                                        fromNsi: false,
                                        id: 386,
                                        name: "Назначение",
                                        nsiAttrUniqueId: null,
                                        predefined: false,
                                        uniqueId: "9a6b3d04-73ce-43cb-8b02-46f1019afdd7"
                                    },
                                    system: false,
                                    systemSource: "NONE",
                                    uniqueId: "7df681a3-81b0-458e-ab22-a6b674b37c52",
                                    unit: null,
                                    valueType: "MULTI"
                                },
                                cards: {},
                                code: null,
                                comment: null,
                                deleted: false,
                                empty: 0,
                                enabled: true,
                                fill: 0,
                                fromNsi: false,
                                groupName: "Основные характеристики",
                                groupWeight: 0,
                                id: 588015,
                                key: false,
                                keyAll: 0,
                                keyFill: 0,
                                name: null,
                                prUniqueId: "595282bd-7ce5-4d67-a8f1-2b962f281b23",
                                predefined: false,
                                quan: null,
                                required: false,
                                requiredAll: 0,
                                requiredFill: 0,
                                sourceId: 1306,
                                sourceType: "NONE",
                                uniqueId: "83b36829-9254-47fa-882a-eaf339baa75c",
                                unit: null,
                                valUniqueId: "34ec6b81-471c-46bc-afc5-88e3411fd847",
                                value: "Очистка",
                                values: [],
                                weight: 0
                            }],
                            weight: 0
                        }
                    ],
                    empty: 18,
                    fill: 26,
                    keyAll: 0,
                    keyFill: 0,
                    requiredAll: 0,
                    requiredFill: 0
                },
                productId: "200321181529870",
                seriesName: null,
                status: "NEW",
                tnved: null,
                typeProduct: "PRODUCT",
                uniqueId: "595282bd-7ce5-4d67-a8f1-2b962f281b23"
            },
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
            //this.setState({item: res.pageItems[0]})
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