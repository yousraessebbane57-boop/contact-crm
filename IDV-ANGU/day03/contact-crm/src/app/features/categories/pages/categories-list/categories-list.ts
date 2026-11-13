import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-categories-list',
  imports: [RouterLink],
  templateUrl: './categories-list.html',
  styleUrl: './categories-list.css',
})
export class CategoriesList {
  private categoryService = inject(CategoryService);

  categories = this.categoryService.categories;

  deleteCategory(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this category?');

    if (!confirmed) {
      return;
    }

    const deleted = this.categoryService.deleteCategory(id);

    if (!deleted) {
      alert('This category cannot be deleted because contacts are assigned to it.');
    }
  }
}