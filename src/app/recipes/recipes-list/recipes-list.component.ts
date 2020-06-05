import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/_models/recipe';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { RecipeService } from 'src/app/_services/recipe.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[];
  pagination: Pagination;
  recipeParams: any = {};
  myForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private alertify: AlertifyService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.recipes = data['recipes'].result;
      this.pagination = data['recipes'].pagination;
    });

    this.myForm = this.formBuilder.group({
      isVegan: false,
      isVegetarian: false,
    });

    this.recipeParams.searchQuery = null;
    this.recipeParams.userId = 0;
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipeParams.isVegan = this.myForm.value.isVegan;
    this.recipeParams.isVegetarian = this.myForm.value.isVegetarian;
    this.recipeService
      .getRecipes(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.recipeParams
      )
      .subscribe(
        (res: PaginatedResult<Recipe[]>) => {
          this.recipes = res.result;
          this.pagination = res.pagination;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  resetFilters() {
    this.recipeParams.searchQuery = null;
    this.recipeParams.userId = 0;
    this.myForm = this.formBuilder.group({
      isVegan: false,
      isVegetarian: false,
    });
    this.loadRecipes();
  }
}
