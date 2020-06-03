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
}
