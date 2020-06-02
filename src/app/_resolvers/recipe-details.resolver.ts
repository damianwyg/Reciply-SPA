import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recipe } from '../_models/recipe';
import { RecipeService } from '../_services/recipe.service';

@Injectable()
export class RecipeDetailsResolver implements Resolve<Recipe> {
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Recipe> {
    return this.recipeService.getRecipe(route.params['id']).pipe(
      catchError((error) => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/users']);
        return of(null);
      })
    );
  }
}
