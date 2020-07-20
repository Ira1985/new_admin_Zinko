import React from 'react';
import DefaultLayout from "./components/layouts/DefaultLayout/DefaultLayout";

const Brands = React.lazy(() => import('./components/Brands/Brands'));
const Catalog = React.lazy(() => import('./components/Catalog/Catalog'));
const CatalogPreview = React.lazy(() => import('./components/Catalog/CatalogPreview/CatalogPreview'));
const CatalogEdit = React.lazy(() => import('./components/Catalog/CatalogEdit/CatalogEdit'));

export const routes = [
    { path: '/', name: 'Главная', component: DefaultLayout },
    { path: '/brands', name: 'Бренды', component: Brands },
    { path: '/catalog', exact: true, name: 'Каталог', component: Catalog },
    { path: '/catalog/:id/preview', exact: true, name: 'Просмотр товара', component: CatalogPreview },
    { path: '/catalog/:id/edit', exact: true, name: 'Просмотр товара', component: CatalogEdit },
    //{ path: '/manufacturers', name: 'Производители', component: Manufacturers },
    //{ path: '/categories', name: 'Производители', component: Categories },
];
