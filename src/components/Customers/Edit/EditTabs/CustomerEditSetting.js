import React, { Component } from 'react';
import {InputText} from "primereact/inputtext";
import './customerTab.scss';
import {withTranslation} from "react-i18next";
import {AutoComplete} from "primereact/autocomplete";
import {InputNumber} from 'primereact/inputnumber';
import {Checkbox} from 'primereact/checkbox';
import {Button} from "primereact/button";
import {FileUpload} from 'primereact/fileupload';
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
                        <label htmlFor="contact">{t("customers.fields.useApi")}</label>
                    </div>
                    <div className="p-col-8" style={{padding: '.5em'}}>
                        <Button label={t("customers.other.getKeyAccess")} disabled={!editedItem.useApi || !editedItem.id} className={'button-dop'} onClick={()=>this.gettingKeyApi()}/>
                    </div>
                </>}

                <div className="p-col-6" style={{padding: '.75em'}}>
                    <Checkbox
                        name={'hasWatermark'}
                        onChange={(e) => {
                            formikHandler(e);
                            updateValue(e);
                            //this.updateProperty('name', e.target.value)
                        }}
                        checked={formikItem.hasWatermark}
                    ></Checkbox>
                    {" "}
                    <label htmlFor="hasWatermark">{t("customers.fields.hasWatermark")}</label>
                </div>
                <div className="p-col-6" style={{padding: '.75em'}}>
                    <Checkbox
                        name={'hasMapping'}
                        onChange={(e) => {
                            formikHandler(e);
                            updateValue(e);
                            //this.updateProperty('name', e.target.value)
                        }}
                        checked={formikItem.hasMapping}
                    ></Checkbox>
                    {" "}
                    <label htmlFor="hasMapping">{t("customers.fields.hasMapping")}</label>
                </div>

                <div className="p-col-6" style={{padding: '.75em'}}>
                    <Checkbox
                        name={'hasModel'}
                        onChange={(e) => {
                            formikHandler(e);
                            updateValue(e);
                            //this.updateProperty('name', e.target.value)
                        }}
                        checked={formikItem.hasModel}
                    ></Checkbox>
                    {" "}
                    <label htmlFor="hasModel">{t("customers.fields.hasModel")}</label>
                </div>
                <div className="p-col-6" style={{padding: '.75em'}}>
                    <Checkbox
                        name={'hasLinking'}
                        onChange={(e) => {
                            formikHandler(e);
                            updateValue(e);
                            //this.updateProperty('name', e.target.value)
                        }}
                        checked={formikItem.hasLinking}
                    ></Checkbox>
                    {" "}
                    <label htmlFor="hasLinking">{t("customers.fields..hasLinking")}</label>
                </div>

                <div className="p-col-6" style={{padding: '.75em'}}>
                    <Checkbox
                        name={'hasImages'}
                        onChange={(e) => {
                            formikHandler(e);
                            updateValue(e);
                            //this.updateProperty('name', e.target.value)
                        }}
                        checked={formikItem.hasImages}
                    ></Checkbox>
                    {" "}
                    <label htmlFor="hasImages">{t("customers.fields.hasImages")}</label>
                </div>
                <div className="p-col-6" style={{padding: '.75em'}}>
                    <Checkbox
                        name={'hasInstructions'}
                        onChange={(e) => {
                            formikHandler(e);
                            updateValue(e);
                            //this.updateProperty('name', e.target.value)
                        }}
                        checked={formikItem.hasInstructions}
                    ></Checkbox>
                    {" "}
                    <label htmlFor="hasInstructions">{t("customers.fields.hasInstructions")}</label>
                </div>

                <div className="p-col-6" style={{padding: '.75em'}}>
                    <Checkbox
                        name={'hasVideos'}
                        onChange={(e) => {
                            formikHandler(e);
                            updateValue(e);
                            //this.updateProperty('name', e.target.value)
                        }}
                        checked={formikItem.hasVideos}
                    ></Checkbox>
                    {" "}
                    <label htmlFor="hasVideos">{t("customers.fields.hasVideos")}</label>
                </div>
                <div className="p-col-6" style={{padding: '.75em'}}>
                    <Checkbox
                        name={'hasCertificate'}
                        onChange={(e) => {
                            formikHandler(e);
                            updateValue(e);
                            //this.updateProperty('name', e.target.value)
                        }}
                        checked={formikItem.hasCertificate}
                    ></Checkbox>
                    {" "}
                    <label htmlFor="hasCertificate">{t("customers.fields.hasCertificate")}</label>
                </div>

                <div className="p-col-3" style={{padding: '.75em'}}>
                    <label htmlFor="resultFormat">{t("customers.fields.resultFormat")}</label>
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
                    <label htmlFor="width">{t("customers.fields.width")}</label>
                </div>
                <div className="p-col-2" style={{padding: '.5em'}}>
                    <InputNumber name="width" onChange={(e) => {
                        formikHandler(e);
                        updateValue(e);
                        //this.updateProperty('name', e.target.value)
                    }} value={formikItem.width || 0} min={-1} step={1} max={100000} />
                </div>
                <div className="p-col-4" style={{padding: '.75em'}}>
                    <label htmlFor="height">{t("customers.fields.height")}</label>
                </div>
                <div className="p-col-2" style={{padding: '.5em'}}>
                    <InputNumber name="height" onChange={(e) => {
                        formikHandler(e);
                        updateValue(e);
                        //this.updateProperty('name', e.target.value)
                    }} value={formikItem.height || 0} min={-1} step={1} max={100000} />
                </div>


                <div className="p-col-3" style={{padding: '.75em'}}>
                    <label htmlFor="watermarkFileLink">{t("customers.fields.watermarkFileLink")}</label>
                </div>
                <div className="p-col-9">
                    <FileUpload
                                //mode="basic"
                                accept="image/jpeg,image/jpeg,image/png,image/x-icon,image/gif,image/svg+xml,image/bmp"
                                maxFileSize={1000000}
                                onUpload={this.onUpload}
                                chooseLabel=''
                                uploadLabel=''
                                cancelLabel=''
                                customUpload={true}
                    />
                </div>
            </div>
        );
    }
}

export default withTranslation()(CustomerEditSetting);