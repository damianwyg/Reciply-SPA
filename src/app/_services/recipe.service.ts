import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../_models/recipe';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecipeForDetails } from '../_models/recipeForDetails';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<RecipeForDetails[]> {
    return this.http.get<RecipeForDetails[]>(this.baseUrl + 'recipes');
  }

  getRecipe(id): Observable<Recipe> {
    return this.http.get<Recipe>(this.baseUrl + 'recipes/' + id);
  }

  createRecipe(id: number, recipe: Recipe) {
    return this.http.post(this.baseUrl + 'recipes/users/' + id, recipe);
  }

  updateRecipe(userId: number, recipeId: number, recipe: Recipe) {
    return this.http.put(
      this.baseUrl + 'recipes/users/' + userId + '/' + recipeId,
      recipe
    );
  }

  deleteRecipe(userId: number, recipeId: number) {
    return this.http.delete(
      this.baseUrl + 'recipes/users/' + userId + '/' + recipeId
    );
  }
}
