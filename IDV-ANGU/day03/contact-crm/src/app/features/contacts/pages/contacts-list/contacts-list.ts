import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../../../core/services/contact.service';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-contacts-list',
  imports: [RouterLink],
  templateUrl: './contacts-list.html',
  styleUrl: './contacts-list.css',
})
export class ContactsList {
  private contactService = inject(ContactService);
  private categoryService = inject(CategoryService);

  contacts = this.contactService.contacts;
  categories = this.categoryService.categories;

  searchTerm = signal('');
  selectedCategory = signal<number | null>(null);
  sortBy = signal<'name' | 'newest' | 'oldest'>('name');

  filteredContacts = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();

    let result = this.contacts().filter(contact => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();

      const matchesSearch =
        fullName.includes(search) ||
        contact.email.toLowerCase().includes(search);

      const matchesCategory =
        this.selectedCategory() === null ||
        contact.categoryId === this.selectedCategory();

      return matchesSearch && matchesCategory;
    });

    result = [...result];

    if (this.sortBy() === 'name') {
      result.sort((a, b) =>
        `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`
        )
      );
    } else if (this.sortBy() === 'newest') {
      result.sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt)
      );
    } else {
      result.sort((a, b) =>
        a.createdAt.localeCompare(b.createdAt)
      );
    }

    return result;
  });

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  onCategoryChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedCategory.set(value === '' ? null : Number(value));
  }

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    if (value === 'name' || value === 'newest' || value === 'oldest') {
      this.sortBy.set(value);
    }
  }

  deleteContact(id: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(id);
    }
  }

  toggleFavorite(id: number): void {
    this.contactService.toggleFavorite(id);
  }
}