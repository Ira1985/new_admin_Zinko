import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import "./catalogMain.scss";
import emptyImg from '../../../../assets/img/EmptyImg.png';
import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import { Galleria } from 'primereact/galleria';
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import { AutoComplete } from 'primereact/autocomplete';
import {Dialog} from "primereact/dialog";
import {ScrollPanel} from "primereact/scrollpanel";
import {manufacturerService} from "../../../../service/manufacturer.service";
import {brandService} from "../../../../service/brand.service";
import {countryService} from "../../../../service/country.service";
import {familyService} from "../../../../service/family.service";
import {categoryService} from "../../../../service/category.service";
import PropTypes from "prop-types";
import {getProductStatus, renderProductStatus} from "../../../../models/Product";


class CatalogMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            filteredItems: null,
            visibleDialog: false,
        };
        this.onItemChange = this.onItemChange.bind(this);
        this.filterItems = this.filterItems.bind(this);
        this.itemTemplate = this.itemTemplate.bind(this);
    }

    imageTemplate(image) {
        let tag;
        if(image.type === 'IMAGE') {
            tag = <img src={'http://185.95.22.17/statics/' + image.link}
                       alt={'test'}/>
        }
        return tag;
    }

    onItemChange(event) {
        this.setState({ activeIndex: event.index });
    }

    deleteTemplate() {
        return <i className="pi pi-times" onClick={(e) => console.log(e)}></i>
    }

    itemTemplate(item) {
        const {t} = this.props;
        const {newName} = this.state;
        let elem = null;
        if(item.name === "Empty object") {
            elem = <Button label={t("baseLayout.main.buttons.buttonAddNew")} className={'button-dop'} onClick={() => this.onEmpty(item)}/>
            item.name = newName
        } else
            elem = (<div className="p-clearfix">
                <div >{item.name}</div>
            </div>)
        return elem;
    }

    onEmpty(item){
        const {onEmptyLink,value} = this.props;
        const {newName} = this.state;
        let textValue = newName?newName:'';
        if(item.emptyLink) {
            let win = window.open(item.emptyLink + '&name='+textValue, '_blank');
            win.focus();
        }

    }

    filterItems(event, api, render) {
        if(api) {
            api.getCombo(event.query).then(res => {
                let data = res.pageItems;
                let results;

                if (event.query.length === 0) {
                    results = [...data];
                } else {
                    results = data.filter((item) => {
                        return item.name.toLowerCase().startsWith(event.query.toLowerCase());
                    });
                }
                if(!results.length)
                    this.itemTemplate({name: ''})
                this.setState({ filterItems: results, newName: event.query });
            })
        } else
            this.setState({ filterItems: render() });
    }

    render() {
        const {t, item, brands, manufacturers, countries, onChangeMethod} = this.props;

        const header = <div className="p-clearfix" style={{'lineHeight':'1.87em'}}>{t("baseLayout.editProduct.categories")} <i
            className="pi pi-plus" style={{'float':'right'}} onClick={() => this.setState({visibleDialog: true})} /></div>;

        // bugfix for show dialog
        const root = document.getElementById('root');

        return (
            <div className='grid-common'>
                <ScrollPanel>
                    <div className='edit-grid'>
                        <div className='edit-grid-main'>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProduct.name")}</label></div>
                                <div className="p-col-10" style={{padding:'.5em'}}>
                                    <InputText id="vin" value={item.description} onChange={(e) => onChangeMethod(e, 'description')} />
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProduct.fullName")}</label></div>
                                <div className="p-col-10" style={{padding:'.5em'}}>
                                    <InputText id="vin" value={item.fullName} onChange={(e) => onChangeMethod(e, 'fullName')}/>
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProduct.englishName")}</label></div>
                                <div className="p-col-10" style={{padding:'.5em'}}>
                                    <InputText id="vin" value={item.nameManufacturerEn} onChange={(e) => onChangeMethod(e, 'nameManufacturerEn')}/>
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.previewProduct.article")}</label></div>
                                <div className="p-col-10" style={{padding:'.5em'}}>
                                    <InputText id="vin" value={item.article} onChange={(e) => onChangeMethod(e, 'article')}/>
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className='p-col-6'>
                                    <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.previewProduct.productId")}</label></div>
                                    <div className="p-col-8" style={{padding:'.5em'}}>
                                        <InputText id="vin" value={item.productId} disabled={true}/>
                                    </div>
                                </div>
                                <div className='p-col-6'>
                                    <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProduct.productStatus")}</label></div>
                                    <div className="p-col-8" style={{padding:'.5em'}}>
                                        <AutoComplete name="status"
                                                      appendTo={root}
                                                      value={getProductStatus(item.status) || ''}
                                                      field='name'
                                                      suggestions={this.state.filterItems}
                                                      completeMethod={(e) => this.filterItems(e, null, renderProductStatus)}
                                                      size={30}
                                                      minLength={1}
                                                      dropdown={true}
                                                      onChange={(e) => onChangeMethod(e, 'status')} />
                                    </div>
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className='p-col-6'>
                                    <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProduct.barcode")}</label></div>
                                    <div className="p-col-8" style={{padding:'.5em'}}>
                                        <InputText id="vin" value={item.fullName} onChange={(e) => onChangeMethod(e, 'fullName')}/>
                                    </div>
                                </div>
                                <div className='p-col-6'>
                                    <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProduct.ean")}</label></div>
                                    <div className="p-col-8" style={{padding:'.5em'}}>
                                        <InputText id="vin" value={item.fullName} onChange={(e) => onChangeMethod(e, 'fullName')}/>
                                    </div>
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className='p-col-6'>
                                    <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProduct.tnved")}</label></div>
                                    <div className="p-col-8" style={{padding:'.5em'}}>
                                        <InputText id="vin" value={item.tnved} onChange={(e) => onChangeMethod(e, 'tnved')}/>
                                    </div>
                                </div>
                                <div className='p-col-6'>
                                    <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProduct.crpt")}</label></div>
                                    <div className="p-col-8" style={{padding:'.5em'}}>
                                        <InputText id="vin" value={item.fullName} onChange={(e) => onChangeMethod(e, 'fullName')}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='edit-grid-image'>
                            {item.contents && item.contents.length?
                                <Galleria value={item.contents.filter(item => item.type === 'IMAGE')} activeIndex={this.state.activeIndex} onItemChange={this.onItemChange}
                                          numVisible={1} previewItemTemplate={this.imageTemplate} />:
                                <img src={item.baseImage ?'http://212.24.48.52/statics/' + item.baseImage : emptyImg}
                                     alt={'test'}/>
                            }
                        </div>
                    </div>
                    <div className='edit-grid'>
                        <div className='edit-grid-category'>
                            <DataTable value={item.categories} header={header}>
                                <Column field='name'/>
                                <Column field={this.deleteTemplate} className='delete-td' />
                            </DataTable>
                        </div>
                        <div className='edit-grid-classcat'>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProduct.manufacturer")}</label></div>
                                <div className="p-col-10" style={{padding:'.5em'}}>

                                    <AutoComplete appendTo={root}
                                                  value={item.manufacturerName}
                                                  suggestions={this.state.filterItems && this.state.filterItems.length ? this.state.filterItems :
                                                      [{
                                                          name: 'Empty object',
                                                          emptyLink: '/manufacturers?id=0'
                                                      }]
                                                  }
                                                  itemTemplate={this.itemTemplate}
                                                  completeMethod={(e) => this.filterItems(e, manufacturerService)}
                                                  size={30}
                                                  minLength={1}
                                                  field='name'
                                                  dropdown={true}
                                                  onChange={(e) => onChangeMethod(e, 'manufacturerName')} />
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.previewProduct.country")}</label></div>
                                <div className="p-col-10" style={{padding:'.5em'}}>
                                    <AutoComplete appendTo={root}
                                                  value={item.countryName}
                                                  suggestions={this.state.filterItems && this.state.filterItems.length ? this.state.filterItems :
                                                      [{
                                                          name: 'Empty object',
                                                          emptyLink: '/countries?id=0'
                                                      }]
                                                  }
                                                  itemTemplate={this.itemTemplate}
                                                  completeMethod={(e) => this.filterItems(e, countryService)}
                                                  size={30}
                                                  minLength={1}
                                                  field='name'
                                                  dropdown={true}
                                                  onChange={(e) => onChangeMethod(e, 'countryName')} />
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.previewProduct.brand")}</label></div>
                                <div className="p-col-10" style={{padding:'.5em'}}>
                                    <AutoComplete appendTo={root}
                                                  value={item.brandName}
                                                  suggestions={this.state.filterItems && this.state.filterItems.length ? this.state.filterItems :
                                                      [{
                                                          name: 'Empty object',
                                                          emptyLink: '/brands?id=0'
                                                      }]
                                                  }
                                                  itemTemplate={this.itemTemplate}
                                                  completeMethod={(e) => this.filterItems(e, brandService)}
                                                  size={30}
                                                  minLength={1}
                                                  field='name'
                                                  dropdown={true}
                                                  onChange={(e) => onChangeMethod(e, 'brandName')} />
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.previewProduct.family")}</label></div>
                                <div className="p-col-10" style={{padding:'.5em'}}>
                                    <AutoComplete appendTo={root}
                                                  value={item.familyName}
                                                  suggestions={this.state.filterItems && this.state.filterItems.length ? this.state.filterItems :
                                                      [{
                                                          name: 'Empty object',
                                                          emptyLink: '/families?id=0'
                                                      }]
                                                  }
                                                  itemTemplate={this.itemTemplate}
                                                  completeMethod={(e) => this.filterItems(e, familyService)}
                                                  size={30}
                                                  minLength={1}
                                                  field='name'
                                                  dropdown={true}
                                                  onChange={(e) => onChangeMethod(e, 'familyName')} />
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.previewProduct.series")}</label></div>
                                <div className="p-col-10" style={{padding:'.5em'}}>
                                    <InputText id="vin" value={item.seriesName} onChange={(e) => onChangeMethod(e, 'seriesName')}/>
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.previewProduct.model")}</label></div>
                                <div className="p-col-10" style={{padding:'.5em'}}>
                                    <InputText id="vin" value={item.modelName} onChange={(e) => onChangeMethod(e, 'modelName')}/>
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProduct.comment")}</label></div>
                                <div className="p-col-10" style={{padding:'.5em'}}>
                                    <InputText id="vin" value={item.comment} onChange={(e) => onChangeMethod(e, 'comment')}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollPanel>

                <Dialog header="???????????????? ??????????????????" footer={<Button label={t('baseLayout.main.buttons.buttonAdd')} className="p-button-success" onClick={this.saveItem} />} visible={this.state.visibleDialog} style={{width: '30vw'}} modal={true} onHide={() => this.setState({visibleDialog: false})}>
                    <AutoComplete appendTo={root}
                                  value={''}
                                  suggestions={this.state.filterItems && this.state.filterItems.length ? this.state.filterItems :
                                      [{
                                          name: 'Empty object',
                                          emptyLink: '/categories?id=0'
                                      }]
                                  }
                                  itemTemplate={this.itemTemplate}
                                  completeMethod={(e) => this.filterItems(e, categoryService)}
                                  size={30}
                                  minLength={1}
                                  field='name'
                                  dropdown={true} onChange={(e) => onChangeMethod(e, 'categories')} />
                </Dialog>
            </div>
        )
    }
}

export default withTranslation()(CatalogMain);
