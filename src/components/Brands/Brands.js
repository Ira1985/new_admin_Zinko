import React, { Component } from 'react';
import BaseLayout from "../layouts/BaseLayout/BaseLayout";
import './brands.scss';
import Brand from "../../models/Brand";

const breadcrumbs = [
    { "label": "Бренды" }
]

const plurals = ['брендов', 'бренд', 'бренда'];

const filters =  Brand.buildFilters();

class Brands extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <BaseLayout breadcrumbs={breadcrumbs} filterItems={filters} plurals={plurals} dopClass={'brands_main'}></BaseLayout>
        );
    }
}

export default Brands;
