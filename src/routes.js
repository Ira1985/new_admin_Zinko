import React from 'react';
import DefaultLayout from "./components/layouts/DefaultLayout/DefaultLayout";
import i18n from './i18n';


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
const Cat2Attrs = React.lazy(() => import('./components/Categories/Cat2Attrs/Cat2Attrs'));

export const routes = [
    { path: '/', name: i18n.t('baseLayout.main.main'), component: DefaultLayout },
    { path: '/brands', name: i18n.t('brands.breadcrumbs.name'), component: Brands },
    { path: '/manufacturers', name: i18n.t('manufacturers.breadcrumbs.name'), component: Manufacturers },
    { path: '/series', name: i18n.t('series.breadcrumbs.name'), component: Series },
    { path: '/catalog', exact: true, name: i18n.t('catalog.breadcrumbs.name'), component: Catalog },
    { path: '/catalog/:id/preview', exact: true, name: i18n.t('catalogPreview.breadcrumbs.name'), component: CatalogPreview },
    { path: '/catalog/:id/edit', exact: true, name: i18n.t('catalogEdit.breadcrumbs.name'), component: CatalogEdit },
    { path: '/profile', name: i18n.t('profile.breadcrumbs.name'), component: Profile },
    { path: '/categories', exact: true, name: i18n.t('categories.breadcrumbs.name'), component: CategoriesNew},
    { path: '/categories/:id/cat2Attrs', exact: true, name: i18n.t('categories.breadcrumbs.name'), component: Cat2Attrs},
    { path: '/countries', name: i18n.t('countries.breadcrumbs.name'), component:  Countries},
    { path: '/families', name: i18n.t('families.breadcrumbs.name'), component: Families },
    { path: '/models', name: i18n.t('models.breadcrumbs.name'), component: Models },
    { path: '/attrCategories', name: i18n.t('attrCategories.breadcrumbs.name'), component: AttrCategories },
    { path: '/attributes', name: i18n.t('attributes.breadcrumbs.name'), component: Attributes },
    { path: '/subsGroups', exact: true, name: i18n.t('subsGroups.breadcrumbs.name'), component: SubsGroups },
    { path: '/subsGroups/:id/values', exact: true, name: i18n.t('substitutions.breadcrumbs.name'), component: Substitutions },
    { path: '/substitutions', name: i18n.t('substitutions.breadcrumbs.name'), component: Substitutions },
    { path: '/units', name: i18n.t('units.breadcrumbs.name'),  exact: true, component: Units },
    { path: '/units/:id/mapping', exact: true, name: i18n.t('unitMappings.breadcrumbs.name'), component: UnitMappings },
    { path: '/unitMappings', exact: true, name: i18n.t('unitMappings.breadcrumbs.name'), component: UnitMappings },
    { path: '/departments', name: i18n.t('departments.breadcrumbs.name'), component: Departments },
    { path: '/roles', name: i18n.t('roles.breadcrumbs.name'), component: Roles },
    { path: '/users', name: i18n.t('users.breadcrumbs.name'), component: Users },
    { path: '/customers', name: i18n.t('customers.breadcrumbs.name'), component: Customers },
    { path: '/exportTemplates', name: i18n.t('exportTemplates.breadcrumbs.name'), component: ExportTemplates }
];
