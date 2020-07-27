import React from 'react';
import DefaultLayout from "./components/layouts/DefaultLayout/DefaultLayout";
const Brands = React.lazy(() => import('./components/Brands/Brands'));
const Manufacturers = React.lazy(() => import('./components/Manufacturers/Manufacturers'));
const Series = React.lazy(() => import('./components/Serieses/Series'));
const Catalog = React.lazy(() => import('./components/Catalog/Catalog'));
const CatalogPreview = React.lazy(() => import('./components/Catalog/CatalogPreview/CatalogPreview'));
const CatalogEdit = React.lazy(() => import('./components/Catalog/CatalogEdit/CatalogEdit'));
const Categories = React.lazy(() => import('./components/Categories/Categories'));
const Countries = React.lazy(() => import('./components/Countries/Countries'));
const Families = React.lazy(() => import('./components/Families/Families'));
const Models = React.lazy(() => import('./components/Models/Models'));
const Profile = React.lazy(() => import('./components/Profile/Profile'));

export const routes = [
    { path: '/', name: 'Главная', component: DefaultLayout },
    { path: '/brands', name: 'Бренды', component: Brands },
    { path: '/manufacturers', name: 'Производители', component: Manufacturers },
    { path: '/series', name: 'Серии', component: Series },
    { path: '/catalog', exact: true, name: 'Каталог', component: Catalog },
    { path: '/catalog/:id/preview', exact: true, name: 'Просмотр товара', component: CatalogPreview },
    { path: '/catalog/:id/edit', exact: true, name: 'Просмотр товара', component: CatalogEdit },
    { path: '/profile', name: 'Профиль', component: Profile },
    { path: '/categories', name: 'Категории', component: Categories },
    { path: '/countries', name: 'Страны мира', component:  Countries},
    { path: '/families', name: 'Семейства', component: Families },
    { path: '/models', name: 'Модели', component: Models }
];
