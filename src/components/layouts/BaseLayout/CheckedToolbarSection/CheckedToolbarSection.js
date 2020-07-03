import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import './checkedToolbarSection.scss';
import {Button} from "primereact/button";
import {Checkbox} from "primereact/checkbox";


class CheckedToolbarSection extends  Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: props.items.size > 0? true: false
        };
    }

    unSelect(e) {
        let {clearChecked} = this.props;
        this.setState({checked: e.checked});
        clearChecked();
    }

    render() {
        const {t, items, buttons, show, baseOnClick} = this.props;
        const {checked} = this.state;
        return <>
            <div className={show?'checked-toolbar show':'checked-toolbar'}>
                <div className='items-count-uncheck'>
                    <Checkbox onChange={e => this.unSelect(e)} checked={checked} tooltip={t('baseLayout.main.other.disableChecked')} tooltipOptions={{position: 'top'}}></Checkbox>
                </div>
                <div className='items-count'>{items.size + '  ' + t('baseLayout.main.other.checkedText')}</div>
                <div className='items-buttons'>
                    {(buttons && buttons.length > 0) &&
                    buttons.map((button, index) =>
                        <Button key={'toolbar_bottom_but_' + index} label={t(button.label)} className={button.className}  onClick={() => baseOnClick(button)} tooltip={button.tooltip} />
                    )}
                </div>
            </div>
        </>;
    }
}

CheckedToolbarSection.propTypes = {
    items: PropTypes.object.isRequired,
    buttons: PropTypes.arrayOf(PropTypes.object),
    show: PropTypes.bool.isRequired,
    baseOnClick: PropTypes.func,
    clearChecked: PropTypes.func.isRequired
}


export default withTranslation()(CheckedToolbarSection);
