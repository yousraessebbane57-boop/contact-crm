import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContactService } from '../../../../core/services/contact.service';
import { CategoryService } from '../../../../core/services/category.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-contact-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.css',
})
export class ContactDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private contactService = inject(ContactService);
  private categoryService = inject(CategoryService);

  private contactId = Number(this.route.snapshot.paramMap.get('id'));

  contact = computed(() =>
    this.contactService.contacts().find(
      item => item.id === this.contactId
    )
  );

  categoryName(categoryId: number | null): string {
    return this.categoryService.categories().find(
      category => category.id === categoryId
    )?.name ?? 'No category';
  }

  toggleFavorite(): void {
    this.contactService.toggleFavorite(this.contactId);
  }

  deleteContact(): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(this.contactId);
      this.router.navigate(['/contacts']);
    }
  }
}