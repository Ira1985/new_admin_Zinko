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
            children, apiService, location, gridView, treeView, columns, editComponent, baseSchema, baseModel} = this.props;
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
    toolbarButtons: PropTypes.arrayOf(PropTypes.object),
    checkedButtons: PropTypes.arrayOf(PropTypes.object),
    showSectionChecked: PropTypes.func,
    gridView: PropTypes.bool,
    treeView: PropTypes.bool,
    apiService: PropTypes.any,
    location: PropTypes.object,
    columns: PropTypes.arrayOf(PropTypes.object)
};

export default withTranslation()(BaseLayout);
