import React from "react";
import * as Yup from "yup";
import BaseEntity from "./base/BaseEntity";
import FilterItem from "./base/FilterItem";
import GridColumn from "./base/GridColumn";

export const ExportResultFormat = {
    XML: 'XML',
    JSON: 'JSON',
    XLS: 'XLS',
    CSV: 'CSV',
    TSV: 'TSV',
    HTML: 'HTML',
    ZIP: 'ZIP',
    TXT: 'TXT'
};

export default class Customer extends BaseEntity {
    description = ''; //String - основнные
    contact = ''; //String - Контакты
    phone = ''; //String - Контакты
    email = ''; //String - Контакты
    avatar = '';
    avatarFile = null;
    changedAvatar = false;
    link = ''; //String - Контакты
    parent = {}; //text with autocomplit  - основнные
    owner = {}; //text with autocomplit  - основнные
    children = [];
    hasWatermark = false; //checkbox - Настройки
    watermarkFile = null;
    watermarkFileLink;
    hasMapping = false; //checkbox - Настройки
    hasModel = false; //checkbox - Настройки
    hasLinking = false; //checkbox - Настройки
    hasImages = false; //checkbox - Настройки
    hasInstructions = false; //checkbox - Настройки
    hasVideos = false; //checkbox - Настройки
    hasCertificate = false; //checkbox  - Настройки
    hasFilters = false; //checkbox - Настройки
    useUniqueId = false; //checkbox - Настройки
    useMultiLang = false; //checkbox - Настройки
    baseLang = '';
    width = 0; //numberfield  - Настройки
    height = 0; //numberfield  - Настройки
    resultFormat = ExportResultFormat.JSON; //select  - Настройки
    requirementsDesc = '';//String - требования
    requirementsFile = null;//file - требования
    requirementsFileLink = '';
    dopInfos = {};
    apiForUs = {};
    apiForHim = {};
    useApi = false;
    internalW = false;
    internalR = false;
    changedW = false;
    changedR = false;

    build(item){
        super.build(item);
        this.description = (item['description']?item['description']:'');
        this.contact = (item['contact']?item['contact']:'');
        this.phone = (item['phone']?item['phone']:'');
        this.email = (item['email']?item['email']:'');
        this.avatar = (item['avatar']?item['avatar']:'');
        this.link = (item['link']?item['link']:'');
        this.parent = (item['parent']?item['parent']:null);
        this.owner = (item['owner']?item['owner']:null);
        this.children = (item['children']?item['children']:null);
        this.hasWatermark = (item['hasWatermark']?item['hasWatermark']:false);
        this.hasMapping = (item['hasMapping']?item['hasMapping']:false);
        this.hasModel = (item['hasModel']?item['hasModel']:false);
        this.hasLinking = (item['hasLinking']?item['hasLinking']:false);
        this.hasImages = (item['hasImages']?item['hasImages']:false);
        this.hasInstructions = (item['hasInstructions']?item['hasInstructions']:false);
        this.hasVideos = (item['hasVideos']?item['hasVideos']:false);
        this.hasCertificate = (item['hasCertificate']?item['hasCertificate']:false);
        this.hasFilters = (item['hasFilters']?item['hasFilters']:false);
        this.useUniqueId = (item['useUniqueId']?item['useUniqueId']:false);
        this.useMultiLang = (item['useMultiLang']?item['useMultiLang']:false);
        this.baseLang = (item['baseLang']?item['baseLang']:'');
        this.width = (item['width']?item['width']:0);
        this.height = (item['height']?item['height']:0);
        this.resultFormat = (item['resultFormat']?item['resultFormat']:ExportResultFormat.JSON);
        this.dopInfos = (item['dopInfos']?item['dopInfos']:null);
        this.apiForUs = (item['apiForUs']?item['apiForUs']:null);
        this.apiForHim = (item['apiForHim']?item['apiForHim']:null);
        this.requirementsDesc = (item['requirementsDesc']?item['requirementsDesc']:'');
        this.requirementsFileLink = (item['requirementsFileLink']?item['requirementsFileLink']:'');
        //this.watermarkFile = (item['watermarkFile']?item['watermarkFile']:null);
        this.watermarkFileLink = (item['watermarkFileLink']?item['watermarkFileLink']:'');
        this.internalW = (item['internalW']?item['internalW']:false);
        this.internalR = (item['internalR']?item['internalR']:false);
        /*        this.templates = (item['templates']?item['templates']:null);
                this.categories = (item['categories']?item['categories']:null);
                this.cards = (item['cards']?item['cards']:null);*/
        return this;
    }

    static buildFilters() {
        let filters = BaseEntity.buildFilters();
        filters.push(FilterItem.buildText('customers.email','email', false));
        filters.push(FilterItem.buildList('customers.parent','parent', false));
        filters.push(FilterItem.buildList('customers.owner','owner', false));
        filters.push(FilterItem.buildList('customers.description','description', false));
        return filters;

    }

    static buildColumns() {
        let columns = BaseEntity.buildColumns();
        columns.push(new GridColumn().build({field: 'email', header: 'customers.email', style:{}, sortable: false,
            order: 5, default: false, widthCoef:2}));
        columns.push(new GridColumn().build({field: 'parent', header: 'customers.parent', style:{}, sortable: false,
            order: 6, default: false, widthCoef:2, renderer: (rowData, column) => {return <p>{rowData.parent?rowData.parent.name:''}</p>}}));
        columns.push(new GridColumn().build({field: 'owner', header: 'customers.owner', style:{}, sortable: false,
            order: 7, default: false, widthCoef:2, renderer: (rowData, column) => {return <p>{rowData.owner?rowData.owner.name:''}</p>}}));
        columns.push(new GridColumn().build({field: 'description', header: 'customers.description', style:{}, sortable: false,
            order: 8, default: false, widthCoef:2}));
        return  columns;
    }
}

export function getExportResultFormat(type){
    switch (type) {
        case ExportResultFormat.XML: return 'XML';
        case ExportResultFormat.JSON: return 'JSON';
        case ExportResultFormat.XLS: return 'XLS';
        case ExportResultFormat.CSV: return 'CSV';
        case ExportResultFormat.TSV: return 'TSV';
        case ExportResultFormat.HTML: return 'HTML';
        case ExportResultFormat.ZIP: return 'ZIP';
        case ExportResultFormat.TXT: return 'TXT';
        default: return type;
    }
}

export function renderExportResultFormat(){
    return (
        <React.Fragment>
            <option value='XML'>{getExportResultFormat('XML')}</option>
            <option value='JSON'>{getExportResultFormat('JSON')}</option>
            <option value='XLS'>{getExportResultFormat('XLS')}</option>
            <option value='CSV'>{getExportResultFormat('CSV')}</option>
            <option value='TSV'>{getExportResultFormat('TSV')}</option>
            <option value='HTML'>{getExportResultFormat('HTML')}</option>
            <option value='ZIP'>{getExportResultFormat('ZIP')}</option>
            <option value='TXT'>{getExportResultFormat('TXT')}</option>
        </React.Fragment>
    );
}

export const CustomerSchema = Yup.object().shape({
    name: Yup.string()
        .min(2,'baseEntity.errors.min')
        .trim()
        .required('baseEntity.errors.required')
});
