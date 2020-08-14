import React from "react";
import * as Yup from "yup";
import BaseEntity from "./base/BaseEntity";
import FilterItem from "./base/FilterItem";
import TreeColumn from "./base/TreeColumn";
import GridColumn from "./base/GridColumn";
import i18n from "../i18n";

export const ProductStatus = {
    NEW: 'NEW',
    DONE: 'DONE',
    ERROR: 'ERROR',
    WAITING:'WAITING',
    CHECKED:'CHECKED',
    PROCESS:'PROCESS'
};

export const ProductType = {
    PRODUCT:'PRODUCT',
    SERVICE:'SERVICE',
    ACCESSORY:'ACCESSORY',
    SPAREPART:'SPAREPART',
    ANALOG:'ANALOG',
    CONSUMABLE:'CONSUMABLE',
    ADVERTISINGANDPRINTING:'ADVERTISINGANDPRINTING',
    COMPONENTPARTS:'COMPONENTPARTS',
    OPTIONS:'OPTIONS'
};

export const ProductPositionType = {
    DUPLICATE:'DUPLICATE',
    REFERENCE:'REFERENCE',
    SINGLE:'SINGLE',
    NONE:'NONE'
};

export const OrderedEquipmentType = {
    NONE:'NONE',
    ORDERED:'ORDERED',
    ORDERED_UNIQUE:'ORDERED_UNIQUE',
    NOT_ORDERED:'NOT_ORDERED'
};

export default class Product extends BaseEntity {
    article = '';
    fullName = '';
    description = '';
    code = '';
    status = ProductStatus.NEW;
    uniqueId = '';
    productId = '';
    /*ean;
    barcode;
    partNumber;*/
    manufacturer = null;
    brand= null;
    family = null;
    series = null;
    model = null;
    modelName = '';
    contents = [];
    categories = [];
    classifications = [];
    barcodes = [];
    accessories = [];
    options = [];
    analogs = [];
    archive = false;
    //cofiPerVolume = '';
    //definition = '';
    positionType = ProductPositionType.NONE;
    nameManufacturerEn = '';
    tnved = '';
    nameManufacturerRu = '';
    //multiplicity = false;
    //volumeMorePallet = false;
    //noControlCert = false;
    //previewCard = false;
    //nameSC = '';
    //usingOnSites = true;
    maket = false;
    material = '';
    //withBuiltInOption = false;
    //limitPile = 0;
    //articleManufacture = '';
    //lifeTime;
    //enterVAM = false;
    //kit = false;
    //sparePart = false;
    //controlSerialNumber = false;
    saleDisabled = false;
    typeProduct = ProductType.PRODUCT;
    free = false;
    //recordNotNormalized = false;
    //hasAnalogs = false;
    country = null;
    orderedEquipmentType = OrderedEquipmentType.NONE;
    baseImage='';
    baseImageFile;
    files;

    build(item){
        super.build(item);
        this.article = (item['article']?item['article']:this.article);
        this.fullName = (item['fullName']?item['fullName']:this.fullName);
        this.description = (item['description']?item['description']:this.description);
        this.status = (item['status']?item['status']:ProductStatus.NEW);
        return this;
    }

    static buildFilters() {
        let base = BaseEntity.buildFilters();
        /*base.push(FilterItem.buildList('attributes.fields.attrType','attrType', true));*/
        //base.push(FilterItem.buildList('baseLayout.previewProduct.article','valueType', true));
        return base;
    }


    static buildFormData(src){
        let formData = new FormData();
        formData.append('id', src.id);
        formData.append('article', src.article);
        formData.append('fullName', src.fullName);
        formData.append('description', src.description);
        formData.append('name', src.name);
        formData.append('comment', src.comment);
        formData.append('code', src.code);
        formData.append('status', src.status);
        formData.append('enabled', src.enabled);
        formData.append('deleted', src.deleted);

        formData.append('uniqueId', src.uniqueId);
        formData.append('productId', src.productId);
        formData.append('tnved', src.tnved);
        formData.append('manufacturer', src.manufacturer);
        formData.append('brand', src.brand);
        formData.append('family', src.family);
        formData.append('series', src.series);
        formData.append('model', src.model);

        formData.append('archive', src.archive);
        formData.append('positionType', src.positionType);
        formData.append('nameManufacturerEn', src.nameManufacturerEn);
        formData.append('nameManufacturerRu', src.nameManufacturerRu);
        formData.append('maket', src.maket);
        formData.append('material', src.material);

        formData.append('saleDisabled', src.saleDisabled);
        formData.append('typeProduct', src.typeProduct);
        formData.append('free', src.free);
        formData.append('country', src.country);
        formData.append('orderedEquipmentType', src.orderedEquipmentType);
        formData.append('baseImage', src.baseImage);
        formData.append('baseImageFile', src.baseImageFile);

        return formData;
    }
}

export function getProductStatus(type){
    switch (type) {
        case ProductStatus.NEW: return {
            nameForRemember: 'NEW',
            name: i18n.t('catalog.fields.productStatus.new')
        };
        case ProductStatus.DONE: return {
            nameForRemember: 'DONE',
            name: i18n.t('catalog.fields.productStatus.done')
        };
        case ProductStatus.ERROR: return {
            nameForRemember: 'ERROR',
            name: i18n.t('catalog.fields.productStatus.error')
        };
        case ProductStatus.WAITING: return {
            nameForRemember: 'WAITING',
            name: i18n.t('catalog.fields.productStatus.waiting')
        };
        case ProductStatus.CHECKED: return {
            nameForRemember: 'CHECKED',
            name: i18n.t('catalog.fields.productStatus.checked')
        };
        case ProductStatus.PROCESS: return {
            nameForRemember: 'PROCESS',
            name: i18n.t('catalog.fields.productStatus.progress')
        };
        default: return type;
    }
}

export function renderProductStatus() {
    return [
        getProductStatus('NEW'),
        getProductStatus('DONE'),
        getProductStatus('ERROR'),
        getProductStatus('WAITING'),
        getProductStatus('CHECKED'),
        getProductStatus('PROCESS')
    ];
}

export function getProductType(type){
    switch (type) {
        case ProductType.PRODUCT: return {
            nameForRemember: 'PRODUCT',
            name: i18n.t('catalog.fields.productType.product')
        };
        case ProductType.SERVICE: return {
            nameForRemember: 'SERVICE',
            name: i18n.t('catalog.fields.productType.service')
        };
        case ProductType.ACCESSORY: return {
            nameForRemember: 'ACCESSORY',
            name: i18n.t('catalog.fields.productType.accessory')
        };
        case ProductType.SPAREPART: return {
            nameForRemember: 'SPAREPART',
            name: i18n.t('catalog.fields.productType.sparepart')
        };
        case ProductType.ANALOG: return {
            nameForRemember: 'ANALOG',
            name: i18n.t('catalog.fields.productType.analog')
        };
        case ProductType.CONSUMABLE: return {
            nameForRemember: 'CONSUMABLE',
            name: i18n.t('catalog.fields.productType.consumable')
        };
        case ProductType.ADVERTISINGANDPRINTING: return {
            nameForRemember: 'ADVERTISINGANDPRINTING',
            name: i18n.t('catalog.fields.productType.advertisingandprinting')
        };
        case ProductType.COMPONENTPARTS: return {
            nameForRemember: 'COMPONENTPARTS',
            name: i18n.t('catalog.fields.productType.componentparts')
        };
        case ProductType.OPTIONS: return {
            nameForRemember: 'OPTIONS',
            name: i18n.t('catalog.fields.productType.options')
        };
        default: return type;
    }
}

export function renderProductType(){
    return [
        getProductType('PRODUCT'),
        getProductType('SERVICE'),
        getProductType('ACCESSORY'),
        getProductType('SPAREPART'),
        getProductType('ANALOG'),
        getProductType('CONSUMABLE'),
        getProductType('ADVERTISINGANDPRINTING'),
        getProductType('COMPONENTPARTS'),
        getProductType('OPTIONS')
    ];
}

export function getProductPositionType(type){
    switch (type) {
        case ProductPositionType.DUPLICATE: return {
            nameForRemember: 'DUPLICATE',
            name: i18n.t('catalog.fields.productPositionType.dublicate')
        };
        case ProductPositionType.REFERENCE: return {
            nameForRemember: 'REFERENCE',
            name: i18n.t('catalog.fields.productPositionType.reference')
        };
        case ProductPositionType.SINGLE: return {
            nameForRemember: 'SINGLE',
            name: i18n.t('catalog.fields.productPositionType.single')
        };
        case ProductPositionType.NONE: return {
            nameForRemember: 'NONE',
            name: i18n.t('')
        };
        default: return type;
    }
}

export function renderProductPositionType(){
    return [
        getProductPositionType('NONE'),
        getProductPositionType('DUPLICATE'),
        getProductPositionType('REFERENCE'),
        getProductPositionType('SINGLE')
    ];
}

export function getOrderedEquipmentType(type){
    switch (type) {
        case OrderedEquipmentType.NONE: return {
            nameForRemember: 'NONE',
            name: i18n.t('')
        };
        case OrderedEquipmentType.ORDERED: return {
            nameForRemember: 'ORDERED',
            name: i18n.t('catalog.fields.orderedEquipmentType.ordered')
        };
        case OrderedEquipmentType.ORDERED_UNIQUE: return {
            nameForRemember: 'ORDERED',
            name: i18n.t('catalog.fields.orderedEquipmentType.orderedUnique')
        };
        case OrderedEquipmentType.NOT_ORDERED: return {
            nameForRemember: 'ORDERED',
            name: i18n.t('catalog.fields.orderedEquipmentType.notOrdered')
        };
        default: return type;
    }
}

export function renderOrderedEquipmentType(){
    return [
        getOrderedEquipmentType('NONE'),
        getOrderedEquipmentType('ORDERED'),
        getOrderedEquipmentType('ORDERED_UNIQUE'),
        getOrderedEquipmentType('NOT_ORDERED')
    ];
}