import React from 'react';
import DefaultLayout from "./components/layouts/DefaultLayout/DefaultLayout";

const Brands = React.lazy(() => import('./components/Brands/Brands'));
const Catalog = React.lazy(() => import('./components/Catalog/Catalog'));
const CatalogPreview = React.lazy(() => import('./components/Catalog/CatalogPreview/CatalogPreview'));
const CatalogEdit = React.lazy(() => import('./components/Catalog/CatalogEdit/CatalogEdit'));
const Categories = React.lazy(() => import('./components/Categories/Categories'));
const Profile = React.lazy(() => import('./components/Profile/Profile'));

export const routes = [
    { path: '/', name: 'Главная', component: DefaultLayout },
    { path: '/brands', name: 'Бренды', component: Brands },
    { path: '/catalog', exact: true, name: 'Каталог', component: Catalog },
    { path: '/catalog/:id/preview', exact: true, name: 'Просмотр товара', component: CatalogPreview },
    { path: '/catalog/:id/edit', exact: true, name: 'Просмотр товара', component: CatalogEdit },
    { path: '/profile', name: 'Профиль', component: Profile },
    { path: '/categories', name: 'Категории', component: Categories },
];
