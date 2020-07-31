import React from 'react';
import DefaultLayout from "./components/layouts/DefaultLayout/DefaultLayout";
const Brands = React.lazy(() => import('./components/Brands/Brands'));
const Manufacturers = React.lazy(() => import('./components/Manufacturers/Manufacturers'));
const Series = React.lazy(() => import('./components/Serieses/Series'));
const Catalog = React.lazy(() => import('./components/Catalog/Catalog'));
const CatalogPreview = React.lazy(() => import('./components/Catalog/CatalogPreview/CatalogPreview'));
const CatalogEdit = React.lazy(() => import('./components/Catalog/CatalogEdit/CatalogEdit'));
const Categories = React.lazy(() => import('./components/Categories/Categories'));
const CategoriesNew = React.lazy(() => import('./components/Categories/CategoriesNew'));
const Countries = React.lazy(() => import('./components/Countries/Countries'));
const Families = React.lazy(() => import('./components/Families/Families'));
const Models = React.lazy(() => import('./components/Models/Models'));
const AttrCategories = React.lazy(() => import('./components/AttrCategories/AttrCategories'));
const Attributes = React.lazy(() => import('./components/Attributes/Attributes'));
const Profile = React.lazy(() => import('./components/Profile/Profile'));
const SubsGroups = React.lazy(() => import('./components/SubsGroups/SubsGroups'));
const Substitutions = React.lazy(() => import('./components/Substitutions/Substitutions'));
const Units = React.lazy(() => import('./components/Units/Units'));
const UnitMappings = React.lazy(() => import('./components/UnitMappings/UnitMappings'));
const Departments = React.lazy(() => import('./components/Departments/Departments'));
const Roles = React.lazy(() => import('./components/Roles/Roles'));
const Users = React.lazy(() => import('./components/Users/Users'));
const Customers = React.lazy(() => import('./components/Customers/Customers'));
const ExportTemplates = React.lazy(() => import('./components/ExportTemplates/ExportTemplates'));

export const routes = [
    { path: '/', name: 'Главная', component: DefaultLayout },
    { path: '/brands', name: 'Бренды', component: Brands },
    { path: '/manufacturers', name: 'Производители', component: Manufacturers },
    { path: '/series', name: 'Серии', component: Series },
    { path: '/catalog', exact: true, name: 'Каталог', component: Catalog },
    { path: '/catalog/:id/preview', exact: true, name: 'Просмотр товара', component: CatalogPreview },
    { path: '/catalog/:id/edit', exact: true, name: 'Просмотр товара', component: CatalogEdit },
    { path: '/profile', name: 'Профиль', component: Profile },
    { path: '/categories', name: 'Категории', component: CategoriesNew},
    { path: '/countries', name: 'Страны мира', component:  Countries},
    { path: '/families', name: 'Семейства', component: Families },
    { path: '/models', name: 'Модели', component: Models },
    { path: '/attrCategories', name: 'Группы атрибутов', component: AttrCategories },
    { path: '/attributes', name: 'Атрибуты', component: Attributes },
    { path: '/subsGroups', exact: true, name: 'Группы значений', component: SubsGroups },
    { path: '/subsGroups/:id/values', exact: true, name: 'Подстановки', component: Substitutions },
    { path: '/substitutions', name: 'Подстановки', component: Substitutions },
    { path: '/units', name: 'Юниты',  exact: true, component: Units },
    { path: '/units/:id/mapping', exact: true, name: 'Юнит маппинг', component: UnitMappings },
    { path: '/unitMappings', exact: true, name: 'Юнит маппинг', component: UnitMappings },
    { path: '/departments', name: 'Департаменты', component: Departments },
    { path: '/roles', name: 'Роли', component: Roles },
    { path: '/users', name: 'Пользователи', component: Users },
    { path: '/customers', name: 'Заказчики', component: Customers },
    { path: '/exportTemplates', name: 'Экспортные шаблоны', component: ExportTemplates }
];
