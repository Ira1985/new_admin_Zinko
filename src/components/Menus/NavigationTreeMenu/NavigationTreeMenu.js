import React, { Component } from 'react';
import "./navigationTreeMenu.scss"
import {Tree} from "primereact/tree";
import {history} from "../../../App";
import {MenuService} from "../../../service/menu.service";
import {ScrollPanel} from "primereact/scrollpanel";
import {Sidebar} from "primereact/sidebar";
import PropTypes, {instanceOf} from "prop-types";

const menuItem = [
    {
        "key": "0",
        "label": "Классификация и Категоризация",
        'leaf': false,
        "children": [{
            "key": "0-0",
            "label": "Категоризация",
            'leaf': true,
            "path":'/categories'
        },
            {
                "key": "0-1",
                "label": "Классификация",
                'leaf': false,
                "children": [
                    { "key": "0-1-0", "label": "Производители", 'leaf': true, "path":'/manufacturers' },
                    { "key": "0-1-1", "label": "Бренды", 'leaf': true, "path":'/brands' },
                    { "key": "0-1-2", "label": "Страны мира", 'leaf': true }
                ]
            },
            {
                "key": "0-2",
                "label": "Дополнительный класификатор",
                'leaf': true
            },]
    },
    {
        "key": "1",
        "label": "Номерклатура",
        'leaf': false,
        "children": [
            { "key": "1-0", "label": "Посмотреть", 'leaf': true, "path":'/catalog' },
            { "key": "1-1", "label": "Создать", 'leaf': true }]
    },
    {
        "key": "2",
        "label": "Информационные модели",
        'leaf': false,
        "children": [
            { "key": "2-0", "label": "Характеристики", 'leaf': true },
            { "key": "2-1", "label": "Список подстановок", 'leaf': true },
            { "key": "2-2", "label": "Единицы измерения", 'leaf': true },
            { "key": "2-3", "label": "Группы атрибутов", 'leaf': true }]
    },
    {
        "key": "3",
        "label": "Заказчики",
        'leaf': false,
        "children": [
            { "key": "3-0", "label": "Посмотреть/Создать", 'leaf': true },
            { "key": "3-1", "label": "Имформационные модели", 'leaf': false, "children": [
                    { "key": "3-1-0", "label": "Категоризация", 'leaf': true },
                    { "key": "3-1-1", "label": "Модели", 'leaf': true }]
            },
            { "key": "3-2", "label": "Каталог/Привязка моделей", 'leaf': true }]
    },
    {
        "key": "4",
        "label": "Экспорт",
        'leaf': false,
        "children": [
            { "key": "4-0", "label": "Экспортные шаблоны", 'leaf': true }]
    },
    {
        "key": "5",
        "label": "Админка",
        'leaf': false,
        "children": [
            { "key": "5-0", "label": "Пользователи", 'leaf': true },
            { "key": "5-1", "label": "Департаменты", 'leaf': true },
            { "key": "5-2", "label": "Роли", 'leaf': true },
            { "key": "5-3", "label": "Допуски", 'leaf': true }]
    },
];

class NavigationTreeMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        //this.setState({nodes: this.menu.getMenu()})
    }

    navigationMenu(e) {
        const {onHide} = this.props;
        if (e.node.leaf) {
            history.push(e.node.path);
            onHide();
        }
    }

    onExpandItem(e) {
        if(e?.originalEvent?.target?.parentElement?.parentElement) {
            e.originalEvent.target.classList.add("nav-tree-item-active");
            e.originalEvent.target.parentElement.parentElement.classList.add("nav-tree-item-active");
        }

    }

    onCollapseItem(e) {
        if(e?.originalEvent?.target?.parentElement?.parentElement) {
            e.originalEvent.target.classList.remove("nav-tree-item-active");
            e.originalEvent.target.parentElement.parentElement.classList.remove("nav-tree-item-active");
        }
    }

    render() {
        const {show, onHide} = this.props;
        return <>
                {/*<div className='navigation-tree-menu'>*/}
            <div className={show?'navigation-tree-menu show':'navigation-tree-menu'}>
                {/*<Sidebar visible={show} position="left" baseZIndex={0} dismissable={false}  showCloseIcon={false} closeOnEscape={false} className='navigation-tree-menu' onHide={onHide}>*/}
                    <ScrollPanel className='scroll-panel'>
                        <Tree className='nav-tree-menu' value={menuItem} selectionMode="single" onExpand={(e) => this.onExpandItem(e)} onCollapse={(e) => this.onCollapseItem(e)} onSelect={e => this.navigationMenu(e)}/>
                    </ScrollPanel>
                {/*</Sidebar>*/}
            </div>
            </>
        ;
    }
}

NavigationTreeMenu.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired
};

export default NavigationTreeMenu;
