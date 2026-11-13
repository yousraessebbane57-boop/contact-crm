import { Injectable, signal } from '@angular/core';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly storageKey = 'crm_contacts';

  private contactsSignal = signal<Contact[]>(this.loadContacts());

  readonly contacts = this.contactsSignal.asReadonly();

  private loadContacts(): Contact[] {
    const storedContacts = localStorage.getItem(this.storageKey);

    if (!storedContacts) {
      return [];
    }

    try {
      return JSON.parse(storedContacts) as Contact[];
    } catch {
      return [];
    }
  }

  private saveContacts(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.contactsSignal())
    );
  }

  addContact(contact: Contact): void {
    this.contactsSignal.update(contacts => [...contacts, contact]);
    this.saveContacts();
  }

  updateContact(updatedContact: Contact): void {
    this.contactsSignal.update(contacts =>
      contacts.map(contact =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );

    this.saveContacts();
  }

  deleteContact(id: number): void {
    this.contactsSignal.update(contacts =>
      contacts.filter(contact => contact.id !== id)
    );

    this.saveContacts();
  }

  toggleFavorite(id: number): void {
    this.contactsSignal.update(contacts =>
      contacts.map(contact =>
        contact.id === id
          ? { ...contact, favorite: !contact.favorite }
          : contact
      )
    );

    this.saveContacts();
  }
}
