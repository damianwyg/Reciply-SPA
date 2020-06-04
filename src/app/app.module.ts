import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { UsersListComponent } from './users/users-list/users-list.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { MyRecipesListComponent } from './recipes/my-recipes-list/my-recipes-list.component';
import { routes } from './routes';
import { UserCardComponent } from './users/user-card/user-card.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeCardComponent } from './recipes/recipe-card/recipe-card.component';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { RecipesListResolver } from './_resolvers/recipes-list.resolver';
import { UserDetailsResolver } from './_resolvers/user-details.resolver';
import { RecipeDetailsResolver } from './_resolvers/recipe-details.resolver';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes';
import { MyrecipeCardComponent } from './recipes/myrecipe-card/myrecipe-card.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeEditResolver } from './_resolvers/recipe-edit.resolver';
import { RecipeAddComponent } from './recipes/recipe-add/recipe-add.component';
import { RecipeCommentsComponent } from './recipes/recipe-comments/recipe-comments.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    UsersListComponent,
    RecipesListComponent,
    MyRecipesListComponent,
    UserCardComponent,
    UserDetailsComponent,
    RecipeDetailsComponent,
    RecipeCardComponent,
    UserEditComponent,
    MyrecipeCardComponent,
    RecipeEditComponent,
    RecipeAddComponent,
    RecipeCommentsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(routes),
    TooltipModule.forRoot(),
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth'],
      },
    }),
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    PreventUnsavedChanges,
    UserListResolver,
    UserDetailsResolver,
    UserEditResolver,
    RecipesListResolver,
    RecipeDetailsResolver,
    RecipeEditResolver
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
