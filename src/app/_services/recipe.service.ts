import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../_models/recipe';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IngredientName } from '../_models/ingredient-name';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.baseUrl + 'recipes');
  }

  getRecipe(id): Observable<Recipe> {
    return this.http.get<Recipe>(this.baseUrl + 'recipes/' + id);
  }

  getIngredientsNames(): Observable<IngredientName[]> {
    return this.http.get<IngredientName[]>(this.baseUrl + 'recipes/ingredients');
  }
}
