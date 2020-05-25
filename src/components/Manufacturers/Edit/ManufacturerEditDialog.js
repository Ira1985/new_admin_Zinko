import React, { Component } from 'react';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from 'primereact/inputtextarea';

export class ManufacturerEditDialog extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {editedItem} = this.props;

        return (
            <div className="p-grid p-fluid">
                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="vin">Наименование</label></div>
                <div className="p-col-8" style={{padding:'.5em'}}>
                    <InputText id="vin" onChange={(e) => {this.updateProperty('vin', e.target.value)}} value={editedItem.name}/>
                </div>

                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="year">Комментарий</label></div>
                <div className="p-col-8" style={{padding:'.5em'}}>
                    <InputTextarea id="year" onChange={(e) => {this.updateProperty('year', e.target.value)}} value={editedItem.comment}/>
                </div>

                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Описание</label></div>
                <div className="p-col-8" style={{padding:'.5em'}}>
                    <InputTextarea id="brand" onChange={(e) => {this.updateProperty('brand', e.target.value)}} value={editedItem.description}/>
                </div>

                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="color">Код</label></div>
                <div className="p-col-8" style={{padding:'.5em'}}>
                    <InputText id="color" onChange={(e) => {this.updateProperty('color', e.target.value)}} value={editedItem.code} disabled={true}/>
                </div>
            </div>
        );
    }

}