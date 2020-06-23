import React, { Component } from 'react';
import logo from "../../../assets/img/Rectangle.png";
import "./navigation-base-menu.scss"
import { withTranslation } from 'react-i18next';
import PropTypes, {instanceOf} from "prop-types";

class NavigationBaseMenu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { t, activeTreeMenu, baseMenuFunc } = this.props;
        return <>
            <div className='navigation-base-menu'>
                <img className='logo-image' src={logo}  alt={''} />
                <hr/>
                <img className='account-logo' src={logo}  alt={''} />
                <hr/>
                <div className='menu-items-block'>
                    <a className='menu-item' onClick={e => {console.log('message')}}>
                        <p className='menu-item-ico messages-img'></p>
                        {/*<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H2V4L10 9L18 4V14ZM10 7L2 2H18L10 7Z" fill="#6D6E77"/>
                                </svg>*/}
                        <p className='menu-item-name'>{t('leftSideMenu.messages')}</p>
                    </a>
                    <a className={activeTreeMenu?'menu-item active-item':'menu-item'} onClick={baseMenuFunc}>
                        <p className='menu-item-ico menu-img'></p>
                        {/*<svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 12H18V9.99997H0V12ZM0 6.99997H18V4.99997H0V6.99997ZM0 -3.05176e-05V1.99997H18V-3.05176e-05H0Z" fill="#C2C2C4"/>
                                </svg>*/}
                        <p className='menu-item-name'>{t('leftSideMenu.menu')}</p>
                    </a>
                    <a className='menu-item'>
                        <p className='menu-item-ico products-img'></p>
                        {/*<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 3.99998H15V1.99998C15 0.889985 14.11 -1.52588e-05 13 -1.52588e-05H7C5.89 -1.52588e-05 5 0.889985 5 1.99998V3.99998H2C0.89 3.99998 0 4.88998 0 5.99998V17C0 18.11 0.89 19 2 19H18C19.11 19 20 18.11 20 17V5.99998C20 4.88998 19.11 3.99998 18 3.99998ZM7 1.99998H13V3.99998H7V1.99998ZM18 17H2V15H18V17ZM18 12H2V5.99998H5V7.99998H7V5.99998H13V7.99998H15V5.99998H18V12Z" fill="#6D6E77"/>
                                </svg>*/}
                        <p className='menu-item-name'>{t('leftSideMenu.products')}</p>
                    </a>
                    <a className='menu-item'>
                        <p className='menu-item-ico properties-img'></p>
                        {/*<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.14 10.924C17.176 10.624 17.2 10.312 17.2 9.988C17.2 9.664 17.176 9.352 17.128 9.052L19.156 7.468C19.336 7.324 19.384 7.06 19.276 6.856L17.356 3.532C17.236 3.316 16.984 3.244 16.768 3.316L14.38 4.276C13.876 3.892 13.348 3.58 12.76 3.34L12.4 0.796C12.364 0.556 12.16 0.388 11.92 0.388H8.07998C7.83998 0.388 7.64799 0.556 7.61199 0.796L7.25199 3.34C6.66398 3.58 6.12399 3.904 5.63199 4.276L3.24398 3.316C3.02798 3.232 2.77598 3.316 2.65598 3.532L0.735985 6.856C0.615985 7.072 0.663985 7.324 0.855985 7.468L2.88398 9.052C2.83598 9.352 2.79998 9.676 2.79998 9.988C2.79998 10.3 2.82398 10.624 2.87198 10.924L0.843984 12.508C0.663984 12.652 0.615985 12.916 0.723985 13.12L2.64398 16.444C2.76398 16.66 3.01598 16.732 3.23198 16.66L5.61998 15.7C6.12398 16.084 6.65198 16.396 7.23998 16.636L7.59999 19.18C7.64798 19.42 7.83998 19.588 8.07998 19.588H11.92C12.16 19.588 12.364 19.42 12.388 19.18L12.748 16.636C13.336 16.396 13.876 16.072 14.368 15.7L16.756 16.66C16.972 16.744 17.224 16.66 17.344 16.444L19.264 13.12C19.384 12.904 19.336 12.652 19.144 12.508L17.14 10.924ZM9.99998 13.588C8.01999 13.588 6.39998 11.968 6.39998 9.988C6.39998 8.008 8.01999 6.388 9.99998 6.388C11.98 6.388 13.6 8.008 13.6 9.988C13.6 11.968 11.98 13.588 9.99998 13.588Z" fill="#6D6E77"/>
                                </svg>*/}
                        <p className='menu-item-name'>{t('leftSideMenu.properties')}</p>
                    </a>
                    <a className='menu-item'>
                        <p className='menu-item-ico helps-img'></p>
                        {/*<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 -2.28882e-05C4.48 -2.28882e-05 0 4.47998 0 9.99998C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 9.99998C20 4.47998 15.52 -2.28882e-05 10 -2.28882e-05ZM11 17H9V15H11V17ZM13.07 9.24998L12.17 10.17C11.45 10.9 11 11.5 11 13H9V12.5C9 11.4 9.45 10.4 10.17 9.66998L11.41 8.40998C11.78 8.04998 12 7.54998 12 6.99998C12 5.89998 11.1 4.99998 10 4.99998C8.9 4.99998 8 5.89998 8 6.99998H6C6 4.78998 7.79 2.99998 10 2.99998C12.21 2.99998 14 4.78998 14 6.99998C14 7.87998 13.64 8.67998 13.07 9.24998Z" fill="#6D6E77"/>
                                </svg>*/}
                        <p className='menu-item-name'>{t('leftSideMenu.helps')}</p>
                    </a>
                </div>
            </div>
            </>
        ;
    }
}

NavigationBaseMenu.propTypes = {
    activeTreeMenu: PropTypes.bool.isRequired,
    baseMenuFunc: PropTypes.func.isRequired
};


export default withTranslation()(NavigationBaseMenu);
