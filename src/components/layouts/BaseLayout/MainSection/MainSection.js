import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import './mainSection.scss';
import {BreadCrumb} from "primereact/breadcrumb";
import {Button} from "primereact/button";
import {Toolbar} from "primereact/toolbar";

class MainSection extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {t, breadcrumbs} = this.props;
        return <>
            <div className='main-section'>
                <div className='header'>
                    <Toolbar>
                        <div className="p-toolbar-group-left">
                            <BreadCrumb model={breadcrumbs} home={{label: 'AAA', icon: 'pi pi-home'}} />
                        </div>
                        <div className="p-toolbar-group-right">
                            <Button label='Пакетная обработка' style={{marginRight:'.25em'}} />
                            <Button label='Добавить' className="p-button-success" onClick={() => this.setState({visibleAdd: true})} />
                        </div>
                    </Toolbar>
                </div>
                <hr/>
            </div>
            </>;
    }

}

MainSection.propTypes = {

};


export default withTranslation()(MainSection);