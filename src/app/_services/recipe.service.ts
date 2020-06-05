import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../_models/recipe';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecipeForDetails } from '../_models/recipeForDetails';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRecipes(page?, itemsPerPage?, recipeParams?): Observable<PaginatedResult<Recipe[]>> {
    const paginatedResult: PaginatedResult<Recipe[]> = new PaginatedResult<
      Recipe[]
    >();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (recipeParams != null) {
      params = params.append('searchQuery', recipeParams.searchQuery);
      params = params.append('isVegan', recipeParams.isVegan);
      params = params.append('isVegetarian', recipeParams.isVegetarian);
    }

    return this.http
      .get<Recipe[]>(this.baseUrl + 'users/recipes', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
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
