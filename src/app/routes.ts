import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { RecipesListComponent } from './recpies/recipes-list/recipes-list.component';
import { MyRecipesListComponent } from './recpies/my-recipes-list/my-recipes-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserDetailsResolver } from './_resolvers/user-details.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { RecipesListResolver } from './_resolvers/recipes-list.resolver';
import { RecipeDetailsComponent } from './recpies/recipe-details/recipe-details.component';
import { RecipeDetailsResolver } from './_resolvers/recipe-details.resolver';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'users',
        component: UsersListComponent,
        resolve: { users: UserListResolver },
      },
      {
        path: 'users/:id',
        component: UserDetailsComponent,
        resolve: { user: UserDetailsResolver },
      },
      {
        path: 'recipes',
        component: RecipesListComponent,
        resolve: { recipes: RecipesListResolver },
      },
      {
        path: 'recipes/:id',
        component: RecipeDetailsComponent,
        resolve: { recipe: RecipeDetailsResolver },
      },
      {
        path: 'myrecipes',
        component: MyRecipesListComponent,
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
