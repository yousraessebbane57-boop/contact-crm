import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../../core/services/contact.service';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private contactService = inject(ContactService);
  private categoryService = inject(CategoryService);

  contacts = this.contactService.contacts;
  categories = this.categoryService.categories;

  totalContacts = computed(() => this.contacts().length);
  totalCategories = computed(() => this.categories().length);

  totalFavorites = computed(
    () => this.contacts().filter(contact => contact.favorite).length
  );

  recentContacts = computed(() =>
    [...this.contacts()]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 5)
  );
}