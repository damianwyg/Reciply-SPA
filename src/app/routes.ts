import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { MyRecipesListComponent } from './my-recipes-list/my-recipes-list.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'recipes', component: RecipesListComponent },
  { path: 'myrecipes', component: MyRecipesListComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
