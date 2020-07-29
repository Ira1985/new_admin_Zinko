import React, { Component } from 'react';
import {InputText} from "primereact/inputtext";
import './customerTab.scss';
import {withTranslation} from "react-i18next";
import {AutoComplete} from "primereact/autocomplete";
import {InputNumber} from 'primereact/inputnumber';
import {Checkbox} from 'primereact/checkbox';
import {Button} from "primereact/button";
import {customerService} from "../../../../service/customer.service";
import {renderExportResultFormat, getExportResultFormat} from "../../../../models/Customer";

class CustomerEditSetting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disableEditIfDownload: false,
        }

    }

    componentDidMount() {
    }

    gettingKeyApi() {
        let {editedItem} = this.props;
        customerService.getAuthKey(editedItem.id).then(
            res => {
                this.setState({
                    showApiKey: false,
                    key: ''
                });
                if (res && res.success) {
                    if (res.pageItems) {
                        this.setState({
                            key: res.pageItems[0],
                            showApiKey: true
                        });
                    }
                }
            }
        ).catch(error => {
            console.log(error);
            this.setState({
                showApiKey: false,
                key:''
            });
        });
    }

    clearOneContent() {
        const {editedItem, updateValue} = this.props;
        let reader = new FileReader();
        let result = Object.assign({}, editedItem);
        result['watermarkFileLink'] = '';
        result['watermarkFile'] = null;
        result['internalW'] = false;
        result['changedW'] = true;
        this.setState({
            disableEditIfDownload: false
        });
        updateValue({target:{type:'direct',name:'all', value: result}});
        /*let myImg = document.getElementById("productBaseImageForModal");
        myImg.src = getImageIcoByType(item.type);*/
    }

    render() {
        let {t, editedItem, updateValue, formikItem, formikError, formikHandler, filterItems, filter} = this.props;

        return (
            <div className="p-grid p-fluid">
                {editedItem.id &&
                <>
                    <div className="p-col-4" style={{padding: '.75em'}}>
                        <label htmlFor="contact">{t("baseLayout.editCustomer.useApi")}</label>
                    </div>
                    <div className="p-col-8" style={{padding: '.5em'}}>
                        <Button label={t("baseLayout.editCustomer.getKeyAccess")} disabled={!editedItem.useApi || !editedItem.id} className={'button-dop'} onClick={()=>this.gettingKeyApi()}/>
                    </div>
                </>}

                <div className="p-col-6" style={{padding: '.75em'}}>
                    <Checkbox name={'hasWatermark'} onChange={e => updateValue(e)} checked={editedItem.hasWatermark}></Checkbox>
                    {" "}
                    <label htmlFor="hasWatermark">{t("baseLayout.editCustomer.hasWatermark")}</label>
                </div>
                <div className="p-col-6" style={{padding: '.75em'}}>
                    <Checkbox name={'hasMapping'} onChange={e => updateValue(e)} checked={editedItem.hasMapping}></Checkbox>
                    {" "}
                    <label htmlFor="hasMapping">{t("baseLayout.editCustomer.hasMapping")}</label>
                </div>

                <div className="p-col-6" style={{padding: '.75em'}}>
                    <Checkbox name={'hasModel'} onChange={e => updateValue(e)} checked={editedItem.hasModel}></Checkbox>
                    {" "}
                    <label htmlFor="hasModel">{t("baseLayout.editCustomer.hasModel")}</label>
                </div>
                <div className="p-col-6" style={{padding: '.75em'}}>
                    <Checkbox name={'hasLinking'} onChange={e => updateValue(e)} checked={editedItem.hasLinking}></Checkbox>
                    {" "}
                    <label htmlFor="hasLinking">{t("baseLayout.editCustomer.hasLinking")}</label>
                </div>

                <div className="p-col-6" style={{padding: '.75em'}}>
                    <Checkbox name={'hasImages'} onChange={e => updateValue(e)} checked={editedItem.hasImages}></Checkbox>
                    {" "}
                    <label htmlFor="hasImages">{t("baseLayout.editCustomer.hasImages")}</label>
                </div>
                <div className="p-col-6" style={{padding: '.75em'}}>
                    <Checkbox name={'hasInstructions'} onChange={e => updateValue(e)} checked={editedItem.hasInstructions}></Checkbox>
                    {" "}
                    <label htmlFor="hasInstructions">{t("baseLayout.editCustomer.hasInstructions")}</label>
                </div>

                <div className="p-col-6" style={{padding: '.75em'}}>
                    <Checkbox name={'hasVideos'} onChange={e => updateValue(e)} checked={editedItem.hasVideos}></Checkbox>
                    {" "}
                    <label htmlFor="hasVideos">{t("baseLayout.editCustomer.hasVideos")}</label>
                </div>
                <div className="p-col-6" style={{padding: '.75em'}}>
                    <Checkbox name={'hasCertificate'} onChange={e => updateValue(e)} checked={editedItem.hasCertificate}></Checkbox>
                    {" "}
                    <label htmlFor="hasCertificate">{t("baseLayout.editCustomer.hasCertificate")}</label>
                </div>

                <div className="p-col-3" style={{padding: '.75em'}}>
                    <label htmlFor="resultFormat">{t("baseLayout.editCustomer.resultFormat")}</label>
                </div>
                <div className="p-col-9" style={{padding: '.5em'}}>
                    <AutoComplete name="resultFormat"
                                  value={getExportResultFormat(formikItem.resultFormat) || ''}
                                  field='name'
                                  suggestions={filterItems}
                                  completeMethod={(e) => filter(e, null, renderExportResultFormat)}
                                  size={30}
                                  minLength={1}
                                  dropdown={true}
                                  onChange={(e) => {
                                      formikHandler(e);
                                      updateValue(e);
                                      //this.updateProperty('name', e.target.value)
                                  }}  />
                </div>

                <div className="p-col-4" style={{padding: '.75em'}}>
                    <label htmlFor="width">{t("baseLayout.editCustomer.width")}</label>
                </div>
                <div className="p-col-2" style={{padding: '.5em'}}>
                    <InputNumber name="width" onChange={(e) => {
                        formikHandler(e);
                        updateValue(e);
                        //this.updateProperty('name', e.target.value)
                    }} value={formikItem.width || 0} min={-1} step={1} max={100000} />
                </div>
                <div className="p-col-4" style={{padding: '.75em'}}>
                    <label htmlFor="height">{t("baseLayout.editCustomer.height")}</label>
                </div>
                <div className="p-col-2" style={{padding: '.5em'}}>
                    <InputNumber name="height" onChange={(e) => {
                        formikHandler(e);
                        updateValue(e);
                        //this.updateProperty('name', e.target.value)
                    }} value={formikItem.height || 0} min={-1} step={1} max={100000} />
                </div>

                <div className="p-col-3" style={{padding: '.75em'}}>
                    <label htmlFor="watermarkFileLink">{t("baseLayout.editCustomer.watermarkFileLink")}</label>
                </div>
                <div className="p-col-7" style={{padding: '.5em'}}>
                    <div className="p-inputgroup">
                        <InputText name="watermarkFileLink" onChange={(e) => {
                            formikHandler(e);
                            updateValue(e);
                            //this.updateProperty('name', e.target.value)
                        }} value={formikItem.watermarkFileLink || ''} placeholder="Ссылка" />
                        <Button icon="pi pi-times" className="p-button-danger" onClick={(e)=>this.clearOneContent()}/>
                    </div>
                </div>
                <div className="p-col-1">
                    <Button className={'but-customers grid-toolbar-unload'} icon="pi p-empty-button grid-unload-ico" tooltip={t('baseLayout.main.buttons.tooltips.buttonUnload')} tooltipOptions={{position: 'left'}} />
                </div>
                <div className="p-col-1">
                    <Button className={'but-customers grid-toolbar-import'} icon="pi p-empty-button grid-import-ico" tooltip={t('baseLayout.main.buttons.tooltips.buttonImport')} tooltipOptions={{position: 'left'}} />
                </div>
            </div>
        );
    }
}

export default withTranslation()(CustomerEditSetting);