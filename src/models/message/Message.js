import Endpoint from "./Endpoint";
import FilterItem from "../base/FilterItem";
import BaseEntity from "../base/BaseEntity";
import GridColumn from "../base/GridColumn";
import React from "react";

export default class Message {
    id = null;
    type = null;
    sender = null;
    send = null;
    data = null;
    read = 0;

    static _stompFields() {
        return ['id', 'type', 'sender', 'addressee', 'send', 'payload'];
    }

    static validStompMessage(stompMessage, userId) {
        const fn = Object.hasOwnProperty.bind(stompMessage);
        const fields = this._stompFields();

        if (!fields.every(fn)) {
            return false;
        }

        const addressee = stompMessage.addressee;

        if ('USER' !== addressee.type || (0 < addressee.id && userId !== addressee.id)) {
            return false;
        }

        return true;
    }

    static fromStompMessage(stompMessage, readed) {
        const msg = new this();

        msg.id = stompMessage.type + '-' + stompMessage.id;
        msg.type = stompMessage.type;
        msg.sender = new Endpoint(stompMessage.sender);
        msg.send = stompMessage.send;
        msg.data = stompMessage.payload.data;
        msg.read = readed;

        return msg;
    }

    static isUnread(msg) {
        return 0 === msg.read;
    }

    static setReaded(msg) {
        msg.read = 1;
    }

    same(msg) {
        return this.id === msg.id;
    }

    static buildFilters() {
        let base = [];
        /*base.push(FilterItem.buildList('attributes.fields.attrType','attrType', true));*/
        base.push(FilterItem.buildList('messages.fields.group','group', true));
        base.push(FilterItem.buildText('messages.fields.comment','comment', true));
        base.push(FilterItem.buildDate('messages.fields.dateReceipt','dateReceipt', true));
        return base;
    }

    static buildColumns() {
        let columns =  [];
        columns.push(new GridColumn().build({field: 'send', header: 'messages.fields.send', style: {},
            sortable: true, order: 5, default: true, widthCoef: 1.5, renderer: (rowData, column) => {return <p>{rowData.send?rowData.send:''}</p>}}));
        columns.push(new GridColumn().build({field: 'group', header: 'messages.fields.group', style:{},
            sortable: true, order: 6, default: true, widthCoef: 1.5, renderer: (rowData, column) => {return <p>{rowData.group?rowData.group:''}</p>}}));
        columns.push(new GridColumn().build({field: 'sender', header: 'messages.fields.sender', style:{},
            sortable: true, order: 7, default: true, widthCoef: 1.5, renderer: (rowData, column) => {return <p>{rowData.sender?rowData.sender:''}</p>}}));
        columns.push(new GridColumn().build({field: 'message', header: 'messages.fields.message', style:{},
            sortable: false, order: 8, default: true, widthCoef: 1.5, renderer: (rowData, column) => {return <p>{rowData.message?rowData.message:''}</p>}}));

        return columns;
    }
}
