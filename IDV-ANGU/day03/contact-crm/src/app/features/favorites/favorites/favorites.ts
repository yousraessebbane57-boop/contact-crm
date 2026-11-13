import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../../core/services/contact.service';

@Component({
  selector: 'app-favorites',
  imports: [RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  private contactService = inject(ContactService);

  favorites = computed(() =>
    this.contactService.contacts().filter(contact => contact.favorite)
  );

  toggleFavorite(id: number): void {
    this.contactService.toggleFavorite(id);
  }
}