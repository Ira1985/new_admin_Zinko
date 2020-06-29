import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import './checkedToolbarSection.scss';
import {Button} from "primereact/button";


class CheckedToolbarSection extends  Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {t, items, buttons, show, baseOnClick} = this.props;

        return <>
            <div className={show?'checked-toolbar show':'checked-toolbar'}>
                <div className='items-count-ico'></div>
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
    baseOnClick: PropTypes.func
}


export default withTranslation()(CheckedToolbarSection);
