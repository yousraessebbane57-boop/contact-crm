import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ContactService } from '../../../../core/services/contact.service';
import { CategoryService } from '../../../../core/services/category.service';
import { Contact } from '../../../../core/models/contact.model';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  categories = this.categoryService.categories;

  contactForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    company: [''],
    jobTitle: [''],
    categoryId: [0],
    notes: [''],
  });

  private contactId = Number(this.route.snapshot.paramMap.get('id'));

  constructor() {
    if (this.contactId) {
      const contact = this.contactService
        .contacts()
        .find(item => item.id === this.contactId);

      if (contact) {
        this.contactForm.patchValue({
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          phone: contact.phone,
          company: contact.company,
          jobTitle: contact.jobTitle,
          categoryId: contact.categoryId ?? 0,
          notes: contact.notes,
        });
      }
    }
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const now = new Date().toISOString();
    const formValue = this.contactForm.getRawValue();

    const existingContact = this.contactId
  ? this.contactService.contacts().find(item => item.id === this.contactId)
  : undefined;

const contact: Contact = {
  ...formValue,
  id: existingContact?.id ?? Date.now(),
  categoryId: formValue.categoryId || null,
  favorite: existingContact?.favorite ?? false,
  createdAt: existingContact?.createdAt ?? now,
  updatedAt: now,
};

if (existingContact) {
  this.contactService.updateContact(contact);
} else {
  this.contactService.addContact(contact);
}
    this.router.navigate(['/contacts']);
  }
}
