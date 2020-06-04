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
    return this.http.get<RecipeForDetails[]>(this.baseUrl + 'users/recipes');
  }

  getRecipe(id): Observable<Recipe> {
    return this.http.get<Recipe>(this.baseUrl + 'users/recipes/' + id);
  }

  createRecipe(recipe: Recipe) {
    return this.http.post(this.baseUrl + 'users/recipes/', recipe);
  }

  updateRecipe(recipeId: number, recipe: Recipe) {
    return this.http.put(this.baseUrl + 'users/recipes/' + recipeId, recipe);
  }

  deleteRecipe(recipeId: number) {
    return this.http.delete(this.baseUrl + 'users/recipes/' + recipeId);
  }

  addComment(id: number, comment: Comment) {
    return this.http.post(
      this.baseUrl + 'users/recipes/' + id + '/comments',
      comment
    );
  }

  getCommentsForRecipe(id: number) {
    return this.http.get(this.baseUrl + 'users/recipes/' + id + '/comments');
  }
}
