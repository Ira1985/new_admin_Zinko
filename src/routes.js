import {Brands} from "./components/Brands/Brands";
import {Manufacturers} from "./components/Manufacturers/Manufacturers";
import {Categories} from "./components/Categories/Categories";

export const routes = [
    { path: '/brands', name: 'Бренды', component: Brands },
    { path: '/manufacturers', name: 'Производители', component: Manufacturers },
    { path: '/categories', name: 'Производители', component: Categories },
];