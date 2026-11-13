import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-category-detail',
  imports: [RouterLink],
  templateUrl: './category-detail.html',
  styleUrl: './category-detail.css',
})
export class CategoryDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private categoryService = inject(CategoryService);

  private categoryId = Number(this.route.snapshot.paramMap.get('id'));

  category = computed(() =>
    this.categoryService.categories().find(
      item => item.id === this.categoryId
    )
  );

  deleteCategory(): void {
    if (!confirm('Are you sure you want to delete this category?')) {
      return;
    }

    const deleted = this.categoryService.deleteCategory(this.categoryId);

    if (!deleted) {
      alert('This category cannot be deleted because contacts are assigned to it.');
      return;
    }

    this.router.navigate(['/categories']);
  }
}