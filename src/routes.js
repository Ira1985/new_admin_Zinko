import React from 'react';

const Brands = React.lazy(() => import('./components/Brands/Brands'));

export const routes = [
    { path: '/brands', name: 'Бренды', component: Brands },
    //{ path: '/manufacturers', name: 'Производители', component: Manufacturers },
    //{ path: '/categories', name: 'Производители', component: Categories },
];