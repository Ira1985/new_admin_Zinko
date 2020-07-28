import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import './baseLayout.scss';
import FilterSection from "./FilterSection/FilterSection";
import MainSection from "./MainSection/MainSection";
import PropTypes from "prop-types";
import {brandService} from "../../../service/brand.service";

class BaseLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkedItems: new Map()
        };
    }

    filterLoading = false;

    render() {
        const {t, filterItems, plurals, dopClass,
            breadcrumbs, toolbarButtons, checkedButtons,
            children, apiService, location, gridView, treeView, columns, editComponent, baseSchema, baseModel,
            modelFieldInit, sorterInit, pagingInit, disableEdit, filterInit} = this.props;
        const {checkedItems} = this.state;

        return <>
                <div className={'base-layout'}>
                    <FilterSection filteringData={this.filterLoading} fields={filterItems}></FilterSection>
                    <MainSection breadcrumbs={breadcrumbs}
                                 plurals={plurals}
                                 toolbarButtons={toolbarButtons}
                                 checkedButtons={checkedButtons}
                                 gridView={gridView}
                                 treeView={treeView}
                                 apiService={apiService}
                                 location={location}
                                 columns={columns}
                                 editComponent={editComponent}
                                 baseSchema={baseSchema}
                                 baseModel={baseModel}
                                 initModelField={modelFieldInit}
                                 sorterInit={sorterInit}
                                 pagingInit={pagingInit}
                                 disableEdit={disableEdit}
                                 filterInit={filterInit}
                    >
                        {children}
                    </MainSection>
                </div>
            </>;
    }
}

BaseLayout.propTypes = {
    filterItems: PropTypes.arrayOf(PropTypes.object),
    plurals: PropTypes.arrayOf(PropTypes.string),
    //dopClass: PropTypes.string,
    breadcrumbs: PropTypes.arrayOf(PropTypes.object),
    dopToolbarButtons: PropTypes.arrayOf(PropTypes.object),
    dopCheckedButtons: PropTypes.arrayOf(PropTypes.object),
    showSectionChecked: PropTypes.func,
    gridView: PropTypes.bool,
    treeView: PropTypes.bool,
    apiService: PropTypes.any.isRequired,
    baseModel: PropTypes.object.isRequired,
    baseSchema: PropTypes.object.isRequired,
    location: PropTypes.object,
    columns: PropTypes.arrayOf(PropTypes.object),
    modelFieldInit: PropTypes.object,
    filterInit:PropTypes.object,
    loadOnMount: PropTypes.func,
    // may be needed after
    //loadOnMountBefore: PropTypes.func,
    //loadOnUpdateValue: PropTypes.func,
    //loadOnAddItem: PropTypes.func,
    //loadOnEditItem: PropTypes.func,
    sorterInit: PropTypes.object,
    pagingInit: PropTypes.object,
    disableEdit: PropTypes.bool
};

export default withTranslation()(BaseLayout);
