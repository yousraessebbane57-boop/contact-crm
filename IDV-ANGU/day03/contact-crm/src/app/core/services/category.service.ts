import { Injectable, inject, signal } from '@angular/core';
import { Category } from '../models/category.model';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly storageKey = 'crm_categories';

  private categoriesSignal = signal<Category[]>(this.loadCategories());

  readonly categories = this.categoriesSignal.asReadonly();

  private contactService = inject(ContactService);

  private loadCategories(): Category[] {
    const storedCategories = localStorage.getItem(this.storageKey);

    if (!storedCategories) {
      return [];
    }

    try {
      return JSON.parse(storedCategories) as Category[];
    } catch {
      return [];
    }
  }

  private saveCategories(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.categoriesSignal())
    );
  }

  addCategory(name: string, description: string): void {
    const now = new Date().toISOString();

    const newCategory: Category = {
      id: Date.now(),
      name,
      description,
      createdAt: now,
      updatedAt: now
    };

    this.categoriesSignal.update(categories => [...categories, newCategory]);
    this.saveCategories();
  }

  updateCategory(updatedCategory: Category): void {
    const categoryWithNewDate = {
      ...updatedCategory,
      updatedAt: new Date().toISOString()
    };

    this.categoriesSignal.update(categories =>
      categories.map(category =>
        category.id === updatedCategory.id ? categoryWithNewDate : category
      )
    );

    this.saveCategories();
  }

  deleteCategory(id: number): boolean {
    const hasContacts = this.contactService.contacts().some(
      contact => contact.categoryId === id
    );

    if (hasContacts) {
      return false;
    }

    this.categoriesSignal.update(categories =>
      categories.filter(category => category.id !== id)
    );

    this.saveCategories();
    return true;
  }
}
