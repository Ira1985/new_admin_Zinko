import React, { Component } from 'react';
import "./navigation-tree-menu.scss"
import {Tree} from "primereact/tree";
import {history} from "../../../App";
import {MenuService} from "../../../service/menu.service";

class NavigationTreeMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: null
        };
        this.menu = new MenuService();
    }
    componentDidMount() {
        this.setState({nodes: this.menu.getMenu()})
    }

    navigationMenu(e) {
        if (e.node.leaf) {
            history.push(e.node.path);
        }
    }

    render() {
        return <>
                <div className='navigation-tree-menu'>
                    <Tree value={this.state.nodes} selectionMode="single" onSelect={e => this.navigationMenu(e)}/>
                </div>
            </>
        ;
    }
}

export default NavigationTreeMenu;