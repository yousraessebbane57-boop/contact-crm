import { Routes } from '@angular/router';

import { Dashboard } from './features/dashboard/dashboard/dashboard';

import { ContactsList } from './features/contacts/pages/contacts-list/contacts-list';
import { ContactDetail } from './features/contacts/pages/contact-detail/contact-detail';
import { ContactForm } from './features/contacts/pages/contact-form/contact-form';

import { CategoriesList } from './features/categories/pages/categories-list/categories-list';
import { CategoryDetail } from './features/categories/pages/category-detail/category-detail';
import { CategoryForm } from './features/categories/pages/category-form/category-form';

import { Favorites } from './features/favorites/favorites/favorites';

export const routes: Routes = [
  { path: '', component: Dashboard },

  { path: 'contacts/new', component: ContactForm },
  { path: 'contacts/:id/edit', component: ContactForm },
  { path: 'contacts/:id', component: ContactDetail },
  { path: 'contacts', component: ContactsList },

  { path: 'categories/new', component: CategoryForm },
  { path: 'categories/:id/edit', component: CategoryForm },
  { path: 'categories/:id', component: CategoryDetail },
  { path: 'categories', component: CategoriesList },

  { path: 'favorites', component: Favorites },

  { path: '**', redirectTo: '' },
];