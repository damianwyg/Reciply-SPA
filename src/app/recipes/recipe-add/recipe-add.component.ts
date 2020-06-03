import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Ingredient } from 'src/app/_models/ingredient';
import { Recipe } from 'src/app/_models/recipe';
import { RecipeService } from 'src/app/_services/recipe.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css'],
})
export class RecipeAddComponent implements OnInit {
  recipeForm: FormGroup;
  ingredientsListArray: FormArray;
  recipe: Recipe;

  constructor(private formBuilder: FormBuilder, private recipeService: RecipeService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.recipeForm = this.formBuilder.group({
      name: ['', Validators.required],
      preparation: ['', Validators.required],
      photoUrl: ['', Validators.required],
      ingredients: this.formBuilder.array([
        this.formBuilder.group({
          name: ['', Validators.required],
          quantity: ['', Validators.required],
          unit: ['', Validators.required],
        }),
      ]),
    });

    this.ingredientsListArray = this.recipeForm.get(
      'ingredients'
    ) as FormArray;
  }

  createRecipe() {
    if (this.recipeForm.valid) {
      this.recipe = Object.assign({}, this.recipeForm.value);
      this.recipeService.createRecipe(this.authService.decodedToken.nameid, this.recipe).subscribe(() => {
        this.router.navigate(['/recipes']);
      }, error => {
        console.log(error);
      });
    }
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
