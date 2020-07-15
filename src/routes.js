import React from 'react';
import DefaultLayout from "./components/layouts/DefaultLayout/DefaultLayout";

const Brands = React.lazy(() => import('./components/Brands/Brands'));
const Catalog = React.lazy(() => import('./components/Catalog/Catalog'));
const CatalogPreview = React.lazy(() => import('./components/Catalog/CatalogPreview/CatalogPreview'));

export const routes = [
    { path: '/', name: 'Главная', component: DefaultLayout },
    { path: '/brands', name: 'Бренды', component: Brands },
    { path: '/catalog', exact: true, name: 'Каталог', component: Catalog },
    { path: '/catalog/:id/preview', exact: true, name: 'Просмотр товара', component: CatalogPreview },
    //{ path: '/manufacturers', name: 'Производители', component: Manufacturers },
    //{ path: '/categories', name: 'Производители', component: Categories },
];
