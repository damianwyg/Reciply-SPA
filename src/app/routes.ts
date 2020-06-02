import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { MyRecipesListComponent } from './my-recipes-list/my-recipes-list.component';
import { AuthGuard } from './_guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'users', component: UsersListComponent },
      {
        path: 'recipes',
        component: RecipesListComponent,
      },
      {
        path: 'myrecipes',
        component: MyRecipesListComponent,
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
