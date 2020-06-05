import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';
import { Recipe } from 'src/app/_models/recipe';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RecipeService } from 'src/app/_services/recipe.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-my-recipes-list',
  templateUrl: './my-recipes-list.component.html',
  styleUrls: ['./my-recipes-list.component.css'],
})
export class MyRecipesListComponent implements OnInit {
  recipes: Recipe[];
  pagination: Pagination;
  recipeParams: any = {};
  myForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private authService: AuthService,
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
      isVegetarian: false
    });

    this.recipeParams.searchQuery = null;
    this.recipeParams.userId = this.authService.decodedToken.nameid;

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
    this.recipeParams.userId = this.authService.decodedToken.nameid;
    this.myForm = this.formBuilder.group({
      isVegan: false,
      isVegetarian: false
    });
    this.loadRecipes();
  }
}
