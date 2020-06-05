import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeForDetails } from 'src/app/_models/RecipeForDetails';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';
import { Comment } from 'src/app/_models/comment';
import { RecipeService } from 'src/app/_services/recipe.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe: RecipeForDetails;
  user: User;
  loggedUserId: number;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.recipe = data['recipe'];
      this.user = data['user'];
      this.loggedUserId = this.authService.decodedToken.nameid;
    });
  }

  followUser(id: number) {
    this.userService.followUser(id).subscribe(
      () => {
        this.alertify.success('You have folllowed: ' + this.recipe.displayName);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
}
