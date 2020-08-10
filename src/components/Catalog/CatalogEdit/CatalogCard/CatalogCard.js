import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import "./catalogCard.scss";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {ContextMenu} from 'primereact/contextmenu';


class CatalogCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expandedRows: [],
            selectedRow: null
        };
        this.menu = [
            {label: props.t("baseLayout.editProduct.history"), command: () => console.log(this.state.selectedRow)},
            {label: props.t("baseLayout.editProduct.edit"), command: () => console.log(this.state.selectedRow)},
            {label: props.t("baseLayout.editProduct.comment"), command: () => console.log(this.state.selectedRow)},
            {label: props.t("baseLayout.editProduct.delete"), command: () => console.log(this.state.selectedRow)}
        ];
        this.headerTemplate = this.headerTemplate.bind(this);
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
        const {t, item} = this.props;

        return (
            <div className='grid-card'>
                <ContextMenu model={this.menu} ref={el => this.cm = el} onHide={() => this.setState({selectedRow: null})}/>
                <div className="body-for-main-item">
                    <div className='edit-grid-card'>
                        <div>{t("baseLayout.editProduct.attributes")}: {item.productCards.all} / {item.productCards.fill}</div>
                        <div>{t("baseLayout.editProduct.required")}: {item.productCards.requiredAll} / {item.productCards.requiredFill}</div>
                        <div>{t("baseLayout.editProduct.key")}: {item.productCards.keyAll} / {item.productCards.keyFill}</div>
                    </div>

                    <DataTable value={item.productCards.cards} rowGroupMode="subheader" sortField="groupName" sortOrder={0} groupField="groupName"
                               rowGroupHeaderTemplate={this.headerTemplate} rowGroupFooterTemplate={this.footerTemplate}
                               scrollable={true} scrollHeight='calc(100vh - 255px)'
                               contextMenuSelection={this.state.selectedRow} onContextMenuSelectionChange={e => this.setState({selectedRow: e.value})}
                               onContextMenu={e => this.cm.show(e.originalEvent)}
                               expandableRowGroups={true} expandedRows={this.state.expandedRows} onRowToggle={(e) => this.setState({expandedRows:e.data})}>
                        <Column field="attribute.name" header={t('baseLayout.editProduct.attribute')} />
                        <Column field="value" header={t('baseLayout.editProduct.value')} />
                        <Column field="unit.name" header={t('baseLayout.editProduct.unit')} />
                    </DataTable>
                </div>
            </div>
        )
    }
}

export default withTranslation()(CatalogCard);