import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../../core/services/category.service';
import { Category } from '../../../../core/models/category.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css',
})
export class CategoryForm {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private categoryId = Number(this.route.snapshot.paramMap.get('id'));

  categoryForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: [''],
  });

  constructor() {
    if (this.categoryId) {
      const category = this.categoryService.categories().find(
        item => item.id === this.categoryId
      );

      if (category) {
        this.categoryForm.patchValue({
          name: category.name,
          description: category.description,
        });
      }
    }
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const existingCategory = this.categoryService.categories().find(
      item => item.id === this.categoryId
    );

    const now = new Date().toISOString();
    const formValue = this.categoryForm.getRawValue();

    const category: Category = {
      ...formValue,
      id: existingCategory?.id ?? Date.now(),
      createdAt: existingCategory?.createdAt ?? now,
      updatedAt: now,
    };

    if (existingCategory) {
      this.categoryService.updateCategory(category);
    } else {
      this.categoryService.addCategory(
        formValue.name,
        formValue.description
      );
    }

    this.router.navigate(['/categories']);
  }
}