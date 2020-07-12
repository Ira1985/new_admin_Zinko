import React from 'react';
import DefaultLayout from "./components/layouts/DefaultLayout/DefaultLayout";

const Brands = React.lazy(() => import('./components/Brands/Brands'));

export const routes = [
    { path: '/brands', name: 'Бренды', component: Brands },
    { path: '/', name: 'Главная', component: DefaultLayout }
    //{ path: '/manufacturers', name: 'Производители', component: Manufacturers },
    //{ path: '/categories', name: 'Производители', component: Categories },
];
