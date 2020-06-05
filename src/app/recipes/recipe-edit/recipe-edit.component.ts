import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Recipe } from 'src/app/_models/recipe';
import {
  NgForm,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { RecipeService } from 'src/app/_services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  recipeId: number;
  recipeForm: FormGroup;
  ingredientsListArray: FormArray;

  constructor(
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.recipe = data['recipe'];
      this.recipeId = this.recipe.recipeId;
      this.buildForm();
    });
  }
  buildForm() {
    this.recipeForm = this.formBuilder.group({
      name: [this.recipe.name, Validators.required],
      preparation: [this.recipe.preparation, Validators.required],
      isVegan: [this.recipe.isVegan],
      isVegetarian: [this.recipe.isVegetarian],
      photoUrl: [this.recipe.photoUrl, Validators.required],
      ingredients: this.formBuilder.array(
        this.recipe.ingredients.map((ingredient) =>
          this.createIngredient(ingredient)
        )
      ),
    });

    this.ingredientsListArray = this.recipeForm.get('ingredients') as FormArray;
  }

  updateRecipe() {
    if (this.recipeForm.valid) {
      this.recipe = Object.assign({}, this.recipeForm.value);
      if (this.recipe.isVegan === true && this.recipe.isVegetarian === false) {
        this.recipe.isVegetarian = true;
      }
      this.recipeService.updateRecipe(this.recipeId, this.recipe).subscribe(
        () => {
          this.router.navigate(['/myrecipes']);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
    }
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeId).subscribe(
      () => {
        this.router.navigate(['/myrecipes']);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  createIngredient(ingredient): FormGroup {
    return this.formBuilder.group({
      name: [ingredient.name],
      quantity: [ingredient.quantity],
      unit: [ingredient.unit],
    });
  }

  addIngredientsListItem() {
    let formGroup: FormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      unit: ['', Validators.required],
    });

    this.ingredientsListArray.push(formGroup);
  }
}
