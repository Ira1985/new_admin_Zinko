import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import "./catalogContent.scss";
import {Button} from 'primereact/button';
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {TabView,TabPanel} from 'primereact/tabview';
import PropTypes from "prop-types";


class CatalogContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        };
        this.tableTemplateBody = this.tableTemplateBody.bind(this);
    }

    imageTemplateBody(rowData) {
        return <div style={{width: '88px', height: '88px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img src={'http://212.24.48.52/statics/' + rowData.link}
                 alt={'test'} style={{maxWidth: '100%', maxHeight: '100%'}}/>
        </div>
    }
    otherTemplateBody(rowData) {
        return <a>Скачать</a>
    }

    tableTemplateBody(func, type) {
        const {t, item} = this.props;

        return <DataTable value={item.contents.filter(item => item.type === type)} scrollable={true} scrollHeight='calc(100% - 200px)' >
            <Column field="name" header={t("baseLayout.editProduct.name")} sortable />
            <Column field="fullName" header={t("baseLayout.editProduct.fullName")} sortable />
            <Column field="type" header={t("baseLayout.editProduct.type")} />
            <Column header={t("baseLayout.editProduct.view")} body={func} />
        </DataTable>
    }

    render() {
        const {t} = this.props;

        return (
            <div className='grid-content'>
                <Button label={t('baseLayout.main.buttons.buttonAdd')} className={'button-success'} style={{marginRight:'.25em', marginLeft:'2.5em'}} />
                <Button label={t('baseLayout.main.buttons.buttonDel')} className={'button-delete-cancel'}  />
                <TabView activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({activeIndex: e.index})}>
                    <TabPanel header={t("baseLayout.editProduct.image")}>
                        {this.tableTemplateBody(this.imageTemplateBody, 'IMAGE')}
                    </TabPanel>
                    <TabPanel header={t("baseLayout.editProduct.marketingImage")}>
                        {this.tableTemplateBody(this.imageTemplateBody, 'MARKETING_IMAGE')}
                    </TabPanel>
                    <TabPanel header={t("baseLayout.editProduct.certificate")}>
                        {this.tableTemplateBody(this.otherTemplateBody, 'CERTIFICATE')}
                    </TabPanel>
                    <TabPanel header={t("baseLayout.editProduct.instruction")}>
                        {this.tableTemplateBody(this.otherTemplateBody, 'INSTRUCTION')}
                    </TabPanel>
                    <TabPanel header={t("baseLayout.editProduct.video")}>
                        {this.tableTemplateBody(this.imageTemplateBody, 'VIDEO')}
                    </TabPanel>
                    <TabPanel header={t("baseLayout.editProduct.view360")}>
                        {this.tableTemplateBody(this.imageTemplateBody, 'VIEW360')}
                    </TabPanel>
                    <TabPanel header={t("baseLayout.editProduct.htmlContent")}>
                        {this.tableTemplateBody(this.otherTemplateBody, 'HTML_CONTENT')}
                    </TabPanel>
                    <TabPanel header={t("baseLayout.editProduct.pictogram")}>
                        {this.tableTemplateBody(this.otherTemplateBody, 'PICTOGRAM')}
                    </TabPanel>
                </TabView>
            </div>
        )
    }
}

export default withTranslation()(CatalogContent);