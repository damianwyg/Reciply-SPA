import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { MyRecipesListComponent } from './recipes/my-recipes-list/my-recipes-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserDetailsResolver } from './_resolvers/user-details.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { RecipesListResolver } from './_resolvers/recipes-list.resolver';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeDetailsResolver } from './_resolvers/recipe-details.resolver';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes';
import { RecipeEditResolver } from './_resolvers/recipe-edit.resolver';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeAddComponent } from './recipes/recipe-add/recipe-add.component';
import { RecipesMyListResolver } from './_resolvers/recipes-mylist.resolver';

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
        path: 'user/edit',
        component: UserEditComponent,
        resolve: { user: UserEditResolver },
        canDeactivate: [PreventUnsavedChanges],
      },
      {
        path: 'recipes',
        component: RecipesListComponent,
        resolve: { recipes: RecipesListResolver },
      },
      {
        path: 'recipes/add',
        component: RecipeAddComponent,
      },
      {
        path: 'recipes/:id',
        component: RecipeDetailsComponent,
        resolve: { recipe: RecipeDetailsResolver, user: UserEditResolver},
      },
      {
        path: 'recipes/edit/:id',
        component: RecipeEditComponent,
        resolve: { recipe: RecipeEditResolver },
      },
      {
        path: 'myrecipes',
        component: MyRecipesListComponent,
        resolve: { recipes: RecipesMyListResolver },
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
