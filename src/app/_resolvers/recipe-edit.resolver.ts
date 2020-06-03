import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RecipeService } from '../_services/recipe.service';
import { RecipeForDetails } from '../_models/recipeForDetails';

@Injectable()
export class RecipeEditResolver implements Resolve<RecipeForDetails> {
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<RecipeForDetails> {
    return this.recipeService.getRecipe(route.params['id']).pipe(
      catchError((error) => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/users']);
        return of(null);
      })
    );
  }
}
