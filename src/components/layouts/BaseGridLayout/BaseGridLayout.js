import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import BaseLayout from "../BaseLayout/BaseLayout";
import PropTypes from "prop-types";
import './baseGridLayout.scss';
import DataGridView from "../DataGridView/DataGridView";

class BaseGridLayout extends Component {

    constructor(props){
        super(props);

        this.state = {

        };

    }


    render() {
        const {t, breadcrumbs, filters, plurals, toolbarButtons, checkedButtons, dopClass} = this.props;

        return (
            <>
                <div className={'base_grid_layout ' + (dopClass?dopClass:'')}>
                    <BaseLayout breadcrumbs={breadcrumbs}
                                filterItems={filters}
                                plurals={plurals}
                                toolbarButtons={toolbarButtons}
                                checkedButtons={checkedButtons}>

                        <DataGridView></DataGridView>

                    </BaseLayout>
                </div>
            </>
        );
    }

}

BaseGridLayout.propTypes = {
    filterItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    plurals: PropTypes.arrayOf(PropTypes.string),
    dopClass: PropTypes.string,
    breadcrumbs: PropTypes.arrayOf(PropTypes.object),
    toolbarButtons: PropTypes.arrayOf(PropTypes.object),
    checkedButtons: PropTypes.arrayOf(PropTypes.object)
};

export default withTranslation()(BaseGridLayout);
