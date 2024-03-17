import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'category/:id',
    loadComponent: () =>
      import('./pages/category/category.component').then(
        component => component.CategoryComponent
      ),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./pages/product/product.component').then(
        component => component.ProductComponent
      ),
  },
  {
    path: 'page-not-found',
    loadComponent: () =>
      import('./pages/page-not-found/page-not-found.component').then(
        component => component.PageNotFoundComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/page-not-found',
  },
];
