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

    render() {
        return (
            <BaseLayout></BaseLayout>
        );
    }
}

export default Brands;
