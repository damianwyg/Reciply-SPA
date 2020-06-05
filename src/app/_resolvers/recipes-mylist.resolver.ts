import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recipe } from '../_models/recipe';
import { RecipeService } from '../_services/recipe.service';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class RecipesMyListResolver implements Resolve<Recipe[]> {
  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Recipe[]> {
    return this.recipeService.getRecipesForCurrentUser().pipe(
      catchError((error) => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
