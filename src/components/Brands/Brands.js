import React, { Component } from 'react';
import BaseLayout from "../layouts/BaseLayout/BaseLayout";

const items = [
    { "label": "Бренды" }
]

class Brands extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    filters = [
        {
            title:'',
            type:'text|number|select|multiSelect|checkbox',
            filterField:'',
            defaultVal:'',
            required:'',
            operations: []
        }
    ];


    render() {
        return (
            <BaseLayout filterItems={}></BaseLayout>
        );
    }
}

export default Brands;
