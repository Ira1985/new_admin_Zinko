import React, {Component} from "react";

import './loadingButton.scss';
//import {Button, Input, UncontrolledTooltip} from "reactstrap";
import {withTranslation} from "react-i18next";
import {Button} from "primereact/button";
import {ProgressSpinner} from 'primereact/progressspinner';
import PropTypes from "prop-types";

class  LoadingButton extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render(){
        const {t, loading, onClick, color, style, disabled, className, label, tooltip} = this.props;
        return (
            <Button label={t(label)} icon={loading ? 'p-datatable-loading-icon pi-spin pi pi-spinner loading' : ""}
                    iconPos="left" disabled={disabled?"disabled":''}
                    style={style?style:{}} className={className}
                    onClick={onClick}  tooltip={tooltip?tooltip:''}/>
        );
    }
}

LoadingButton.propTypes = {
    loading: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string,
    style: PropTypes.object,
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    tooltip: PropTypes.string
};

export default withTranslation()(LoadingButton);
